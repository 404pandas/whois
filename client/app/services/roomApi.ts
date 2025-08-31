// services/roomApi.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  reconnectionAttempts: 3,
  timeout: 5000,
});

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fakeBaseQuery(), // no real HTTP requests
  endpoints: (builder) => ({
    createRoom: builder.mutation<{ roomCode: string }, void>({
      queryFn: () =>
        new Promise((resolve) => {
          socket.emit("create_room", (data: { roomCode: string }) => {
            if (data?.roomCode) {
              resolve({ data });
            } else {
              resolve({
                error: {
                  status: "CUSTOM_ERROR",
                  error: "Failed to create room",
                },
              });
            }
          });
        }),
    }),
  }),
});

export const { useCreateRoomMutation } = roomApi;
