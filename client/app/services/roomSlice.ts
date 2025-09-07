import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoomState {
  roomCode: string | null;
}

const initialState: RoomState = {
  roomCode: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomCode: (state, action: PayloadAction<string>) => {
      state.roomCode = action.payload;
    },
    clearRoom: (state) => {
      state.roomCode = null;
    },
  },
});

export const { setRoomCode, clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
