// services/questionsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  id: number;
  question: string;
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    clearQuestions: (state) => {
      state.questions = [];
    },
  },
});

export const { setQuestions, clearQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
