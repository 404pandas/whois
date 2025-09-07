import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import io from "socket.io-client";
import { setRoomCode } from "./roomSlice";
import type { RootState } from "../store"; // import RootState

const socket = io("http://localhost:3001", {
  reconnectionAttempts: 3,
  timeout: 5000,
});

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createRoom: builder.mutation<{ roomCode: string }, void>({
      queryFn: (_arg, { dispatch, getState }) =>
        new Promise((resolve) => {
          // Cast getState() to RootState
          const state = getState() as RootState;
          const prevRoom = state.room.roomCode;

          // Leave previous room if exists
          if (prevRoom) {
            socket.emit("leave_room", { roomCode: prevRoom });
            console.log("Left previous room:", prevRoom);
          }

          socket.emit("create_room");
          console.log("create_room emitted");

          const handleCreated = ({ roomCode }: { roomCode: string }) => {
            dispatch(setRoomCode(roomCode));
            resolve({ data: { roomCode } });
            socket.off("room_created", handleCreated);
            socket.off("error", handleError);
          };

          const handleError = () => {
            resolve({
              error: {
                status: "CUSTOM_ERROR",
                error: "Failed to create room",
              },
            });
            socket.off("room_created", handleCreated);
            socket.off("error", handleError);
          };

          socket.on("room_created", handleCreated);
          socket.on("error", handleError);
        }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomApi;
