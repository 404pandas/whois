// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, set this to your app's domain
    methods: ["GET", "POST"],
  },
});

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
      console.log(`Player ${socket.id} joined room ${roomCode}`); // <-- Added log

      io.to(roomCode).emit("player_joined", { playerId: socket.id });
      socket.emit("join_success");
    } else {
      console.log(
        `Player ${socket.id} tried to join non-existent room ${roomCode}`
      ); // Optional

      socket.emit("join_error", { error: "Room not found" });
    }
  });

  socket.on("send_question", ({ roomCode, question }) => {
    io.to(roomCode).emit("new_question", { question });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
