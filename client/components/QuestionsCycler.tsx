// components/useQuestionCycler.ts
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { setQuestions, Question } from "../app/services/questionsSlice";

export const useQuestionCycler = (
  totalTime = 15,
  onQuestionChange?: (q: Question) => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const timerRef = useRef<number | null>(null);

  // Fetch questions once
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:3001/questions");
        if (!res.ok) {
          const text = await res.text();
          console.error("Failed to fetch questions:", text);
          return;
        }
        const data: Question[] = await res.json();
        dispatch(setQuestions(data));
        if (data.length > 0 && onQuestionChange) onQuestionChange(data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    if (questions.length === 0) fetchQuestions();
  }, [dispatch, questions.length]);

  // Timer
  useEffect(() => {
    if (questions.length === 0) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          nextQuestion();
          return totalTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [questions, currentIndex]);

  const nextQuestion = () => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % questions.length;
      if (onQuestionChange) onQuestionChange(questions[nextIndex]);
      return nextIndex;
    });
    setTimeLeft(totalTime);
  };

  return {
    currentQuestion: questions[currentIndex],
    timeLeft,
    nextQuestion,
    setTimeLeft,
  };
};
