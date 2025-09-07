import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import io from "socket.io-client";
import { setRoomCode } from "./roomSlice";

const socket = io("http://localhost:3001", {
  reconnectionAttempts: 3,
  timeout: 5000,
});

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createRoom: builder.mutation<{ roomCode: string }, void>({
      queryFn: (_arg, { dispatch }) =>
        new Promise((resolve) => {
          socket.emit("create_room");

          socket.once("room_created", ({ roomCode }) => {
            dispatch(setRoomCode(roomCode));
            resolve({ data: { roomCode } });
          });

          socket.once("error", () => {
            resolve({
              error: {
                status: "CUSTOM_ERROR",
                error: "Failed to create room",
              },
            });
          });
        }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomApi;
