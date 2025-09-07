import express from "express";
import http from "http";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Serve sorted questions
app.get("/questions", (req, res) => {
  const filePath = path.join(__dirname, "seeds/booksQuestions.json");
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const questions = JSON.parse(rawData);
    res.json(questions);
  } catch (err) {
    console.error("Error reading questions:", err);
    res.status(500).json({ error: "Failed to load questions" });
  }
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("create_room", () => {
    const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    socket.join(roomCode);
    console.log(`Room created: ${roomCode}`);
    socket.emit("room_created", { roomCode });
  });

  socket.on("join_room", ({ roomCode }) => {
    const room = io.sockets.adapter.rooms.get(roomCode);
    if (room) {
      socket.join(roomCode);
      console.log(`Player ${socket.id} joined room ${roomCode}`);
      io.to(roomCode).emit("player_joined", { playerId: socket.id });
      socket.emit("join_success");
    } else {
      socket.emit("join_error", { error: "Room not found" });
    }
  });

  socket.on("send_question", ({ roomCode, question }) => {
    io.to(roomCode).emit("new_question", { question });
  });

  socket.on("leave_room", ({ roomCode }) => {
    socket.leave(roomCode);
    console.log(`Left room: ${roomCode}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
