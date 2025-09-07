// components/useQuestionCycler.ts
import { useEffect, useState, useRef } from "react";

export interface Question {
  id: number;
  text: string;
}

export const useQuestionCycler = (
  totalTime = 15,
  onQuestionChange?: (q: Question) => void
) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalTime);

  // Fix: use number | null for React Native / browser
  const timerRef = useRef<number | null>(null);

  // Fetch questions
  // Fetch questions
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
        console.log(data);
        setQuestions(data);
        if (data.length > 0 && onQuestionChange) onQuestionChange(data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

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
