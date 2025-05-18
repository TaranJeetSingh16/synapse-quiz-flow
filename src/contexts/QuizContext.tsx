
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'image' | 'game';
  difficulty: 1 | 2 | 3 | 4 | 5;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  hint?: string;
  category: string;
  imageUrl?: string;
}

interface BrainwaveData {
  attention: number;
  relaxation: number;
  stress: number;
}

interface QuizContextType {
  currentQuestion: Question | null;
  questions: Question[];
  answeredQuestions: number;
  correctAnswers: number;
  quizStarted: boolean;
  quizFinished: boolean;
  selectedAnswer: string | null;
  timeLeft: number;
  xpPoints: number;
  streak: number;
  brainwaveData: BrainwaveData;
  selectedCategory: string;
  difficultyLevel: number;
  totalQuestions: number;
  startQuiz: (category: string) => void;
  endQuiz: () => void;
  answerQuestion: (answerId: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  useHint: () => string | undefined;
  getRecommendedTopics: () => string[];
}

const defaultBrainwave: BrainwaveData = {
  attention: 70,
  relaxation: 60,
  stress: 30,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Mock data for questions
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'Which of the following is a primary color?',
    type: 'text',
    difficulty: 1,
    options: [
      { id: 'a', text: 'Green', isCorrect: false },
      { id: 'b', text: 'Red', isCorrect: true },
      { id: 'c', text: 'Orange', isCorrect: false },
      { id: 'd', text: 'Purple', isCorrect: false },
    ],
    explanation: 'Red, blue, and yellow are the three primary colors.',
    hint: 'Think about colors that cannot be created by mixing other colors.',
    category: 'Art',
  },
  {
    id: '2',
    text: 'Which planet is known as the Red Planet?',
    type: 'text',
    difficulty: 1,
    options: [
      { id: 'a', text: 'Jupiter', isCorrect: false },
      { id: 'b', text: 'Venus', isCorrect: false },
      { id: 'c', text: 'Mars', isCorrect: true },
      { id: 'd', text: 'Mercury', isCorrect: false },
    ],
    explanation: 'Mars appears red because its surface contains iron oxide, or rust.',
    category: 'Science',
  },
  {
    id: '3',
    text: 'What is the capital of Japan?',
    type: 'text',
    difficulty: 2,
    options: [
      { id: 'a', text: 'Beijing', isCorrect: false },
      { id: 'b', text: 'Seoul', isCorrect: false },
      { id: 'c', text: 'Tokyo', isCorrect: true },
      { id: 'd', text: 'Bangkok', isCorrect: false },
    ],
    explanation: 'Tokyo has been the capital of Japan since 1868.',
    category: 'Geography',
  },
  {
    id: '4',
    text: 'Which of these data structures uses LIFO (Last In, First Out) principle?',
    type: 'text',
    difficulty: 3,
    options: [
      { id: 'a', text: 'Queue', isCorrect: false },
      { id: 'b', text: 'Stack', isCorrect: true },
      { id: 'c', text: 'Linked List', isCorrect: false },
      { id: 'd', text: 'Tree', isCorrect: false },
    ],
    explanation: 'A stack follows LIFO principle where the last element added is the first one to be removed.',
    hint: 'Think about a stack of plates.',
    category: 'Programming',
  },
  {
    id: '5',
    text: 'Which of the following is not a mammal?',
    type: 'image',
    difficulty: 2,
    options: [
      { id: 'a', text: 'Dolphin', isCorrect: false },
      { id: 'b', text: 'Bat', isCorrect: false },
      { id: 'c', text: 'Crocodile', isCorrect: true },
      { id: 'd', text: 'Elephant', isCorrect: false },
    ],
    explanation: 'Crocodiles are reptiles, while dolphins, bats, and elephants are all mammals.',
    category: 'Biology',
    imageUrl: 'https://images.unsplash.com/photo-1580367100546-a521a7eb55bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '6',
    text: 'Which programming language is known for its use in AI and data science?',
    type: 'text',
    difficulty: 3,
    options: [
      { id: 'a', text: 'JavaScript', isCorrect: false },
      { id: 'b', text: 'C#', isCorrect: false },
      { id: 'c', text: 'Python', isCorrect: true },
      { id: 'd', text: 'Ruby', isCorrect: false },
    ],
    explanation: 'Python has become the go-to language for AI, machine learning, and data science due to its rich ecosystem of libraries like NumPy, TensorFlow, and PyTorch.',
    category: 'Programming',
  },
  {
    id: '7',
    text: 'What year was the first iPhone released?',
    type: 'text',
    difficulty: 2,
    options: [
      { id: 'a', text: '2005', isCorrect: false },
      { id: 'b', text: '2007', isCorrect: true },
      { id: 'c', text: '2009', isCorrect: false },
      { id: 'd', text: '2010', isCorrect: false },
    ],
    explanation: 'The first iPhone was released by Apple in 2007, revolutionizing the smartphone industry.',
    category: 'Technology',
  },
  {
    id: '8',
    text: 'Which of these is a quantum physics principle?',
    type: 'text',
    difficulty: 5,
    options: [
      { id: 'a', text: 'Theory of Relativity', isCorrect: false },
      { id: 'b', text: 'Heisenberg Uncertainty Principle', isCorrect: true },
      { id: 'c', text: 'Laws of Thermodynamics', isCorrect: false },
      { id: 'd', text: 'Archimedes Principle', isCorrect: false },
    ],
    explanation: 'The Heisenberg Uncertainty Principle states that we cannot simultaneously know the exact position and momentum of a particle.',
    hint: 'This principle involves limitations on what we can know about particles.',
    category: 'Physics',
  },
  {
    id: '9',
    text: 'Who painted the Mona Lisa?',
    type: 'text',
    difficulty: 1,
    options: [
      { id: 'a', text: 'Vincent van Gogh', isCorrect: false },
      { id: 'b', text: 'Pablo Picasso', isCorrect: false },
      { id: 'c', text: 'Leonardo da Vinci', isCorrect: true },
      { id: 'd', text: 'Michelangelo', isCorrect: false },
    ],
    explanation: 'The Mona Lisa was painted by Leonardo da Vinci between 1503 and 1519.',
    category: 'Art',
  },
  {
    id: '10',
    text: 'Which ancient civilization built Machu Picchu?',
    type: 'text',
    difficulty: 3,
    options: [
      { id: 'a', text: 'Mayans', isCorrect: false },
      { id: 'b', text: 'Incas', isCorrect: true },
      { id: 'c', text: 'Aztecs', isCorrect: false },
      { id: 'd', text: 'Egyptians', isCorrect: false },
    ],
    explanation: 'Machu Picchu was built by the Incas in the 15th century.',
    category: 'History',
  },
  {
    id: '11',
    text: 'What is the largest ocean on Earth?',
    type: 'text',
    difficulty: 1,
    options: [
      { id: 'a', text: 'Atlantic Ocean', isCorrect: false },
      { id: 'b', text: 'Indian Ocean', isCorrect: false },
      { id: 'c', text: 'Arctic Ocean', isCorrect: false },
      { id: 'd', text: 'Pacific Ocean', isCorrect: true },
    ],
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth\'s surface.',
    category: 'Geography',
  },
  {
    id: '12',
    text: 'What is the chemical symbol for gold?',
    type: 'text',
    difficulty: 2,
    options: [
      { id: 'a', text: 'Go', isCorrect: false },
      { id: 'b', text: 'Gd', isCorrect: false },
      { id: 'c', text: 'Au', isCorrect: true },
      { id: 'd', text: 'Ag', isCorrect: false },
    ],
    explanation: 'Au is the chemical symbol for gold, derived from the Latin word "aurum".',
    category: 'Science',
  },
  {
    id: '13',
    text: 'Which programming concept is based on the principle of "objects containing data and methods"?',
    type: 'text',
    difficulty: 3,
    options: [
      { id: 'a', text: 'Functional Programming', isCorrect: false },
      { id: 'b', text: 'Object-Oriented Programming', isCorrect: true },
      { id: 'c', text: 'Procedural Programming', isCorrect: false },
      { id: 'd', text: 'Event-Driven Programming', isCorrect: false },
    ],
    explanation: 'Object-Oriented Programming (OOP) is based on the concept of objects containing data and code that operates on that data.',
    hint: 'Think about programming that focuses on creating reusable "things" with properties and behaviors.',
    category: 'Programming',
  },
];

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [xpPoints, setXpPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [brainwaveData, setBrainwaveData] = useState<BrainwaveData>(defaultBrainwave);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState(2);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Simulate brainwave data updates
  useEffect(() => {
    if (!quizStarted) return;

    const interval = setInterval(() => {
      setBrainwaveData({
        attention: Math.min(100, Math.max(30, defaultBrainwave.attention + Math.random() * 20 - 10)),
        relaxation: Math.min(100, Math.max(20, defaultBrainwave.relaxation + Math.random() * 20 - 10)),
        stress: Math.min(100, Math.max(10, defaultBrainwave.stress + Math.random() * 20 - 10)),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [quizStarted]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || quizFinished || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit if time runs out
          if (!selectedAnswer) {
            setStreak(0);
            nextQuestion();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, currentQuestion, selectedAnswer]);

  // Adjust difficulty based on performance and brainwave
  useEffect(() => {
    if (answeredQuestions > 0 && answeredQuestions % 3 === 0) {
      // Calculate new difficulty based on:
      // 1. Current performance (correctAnswers/answeredQuestions)
      // 2. Simulated brainwave data 
      const performanceRatio = correctAnswers / answeredQuestions;
      const attentionFactor = brainwaveData.attention / 100; // Higher attention allows for higher difficulty
      const stressFactor = brainwaveData.stress / 100; // Higher stress suggests lowering difficulty

      let newDifficulty;
      if (performanceRatio > 0.8 && attentionFactor > 0.7) {
        newDifficulty = Math.min(5, difficultyLevel + 1);
      } else if (performanceRatio < 0.5 || stressFactor > 0.8) {
        newDifficulty = Math.max(1, difficultyLevel - 1);
      } else {
        newDifficulty = difficultyLevel;
      }

      if (newDifficulty !== difficultyLevel) {
        setDifficultyLevel(newDifficulty);
        toast(`Difficulty adjusted to: ${getDifficultyLabel(newDifficulty)}`);
      }
    }
  }, [answeredQuestions, correctAnswers, brainwaveData]);

  const getDifficultyLabel = (level: number): string => {
    const labels = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];
    return labels[level - 1] || 'Medium';
  };
  
  const startQuiz = (category: string) => {
    setSelectedCategory(category);
    
    // Filter questions by category if specified
    const filtered = category === 'All Categories' 
      ? questions 
      : questions.filter(q => q.category === category);
    
    // Randomly select between 5-10 questions for this quiz
    const quizQuestionCount = Math.floor(Math.random() * 6) + 5; // Random number between 5-10
    const shuffledQuestions = [...filtered].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, quizQuestionCount);
    
    setFilteredQuestions(selectedQuestions);
    setTotalQuestions(quizQuestionCount);
    
    if (selectedQuestions.length > 0) {
      // Start with an appropriate difficulty question
      const easyQuestions = selectedQuestions.filter(q => q.difficulty <= 2);
      setCurrentQuestion(easyQuestions.length > 0 ? easyQuestions[0] : selectedQuestions[0]);
      setQuizStarted(true);
      setQuizFinished(false);
      setAnsweredQuestions(0);
      setCorrectAnswers(0);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setStreak(0);
    } else {
      toast.error("No questions available for this category");
    }
  };

  const endQuiz = () => {
    setQuizFinished(true);
    setQuizStarted(false);
  };

  const answerQuestion = (answerId: string) => {
    if (!currentQuestion || selectedAnswer) return;
    
    setSelectedAnswer(answerId);
    
    const isCorrect = currentQuestion.options.find(opt => opt.id === answerId)?.isCorrect || false;
    
    if (isCorrect) {
      const difficultyBonus = currentQuestion.difficulty;
      const timeBonus = Math.floor(timeLeft / 5);
      const pointsEarned = 10 + difficultyBonus * 5 + timeBonus;
      
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
      setXpPoints(prev => prev + pointsEarned);
      
      toast.success(`Correct! +${pointsEarned} XP`);
      
      if (streak > 0 && streak % 3 === 0) {
        toast.success(`${streak} streak! Extra XP bonus!`);
        setXpPoints(prev => prev + streak * 5);
      }
    } else {
      toast.error("Incorrect answer");
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setAnsweredQuestions(prev => prev + 1);
    
    if (answeredQuestions >= totalQuestions - 1) {
      endQuiz();
      return;
    }
    
    setSelectedAnswer(null);
    setTimeLeft(30);
    
    // Select next question based on difficulty and performance
    const availableQuestions = filteredQuestions.filter(q => 
      q.id !== currentQuestion?.id && 
      Math.abs(q.difficulty - difficultyLevel) <= 1
    );
    
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      setCurrentQuestion(availableQuestions[randomIndex]);
    } else {
      // If no questions match current difficulty, just pick a random one
      const remainingQuestions = filteredQuestions.filter(q => q.id !== currentQuestion?.id);
      if (remainingQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        setCurrentQuestion(remainingQuestions[randomIndex]);
      } else {
        endQuiz(); // If somehow we run out of questions
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setAnsweredQuestions(0);
    setCorrectAnswers(0);
    setTimeLeft(30);
    setDifficultyLevel(2);
    setBrainwaveData(defaultBrainwave);
  };
  
  const useHint = () => {
    if (currentQuestion?.hint) {
      setXpPoints(prev => Math.max(0, prev - 5));
      toast("Used a hint (-5 XP)");
      return currentQuestion.hint;
    }
    toast.error("No hint available for this question");
    return undefined;
  };

  const getRecommendedTopics = (): string[] => {
    // This would normally be based on user performance data
    // For now, return a static list based on categories with lowest correct ratio
    return ['Programming', 'Physics', 'Biology'];
  };

  return (
    <QuizContext.Provider 
      value={{
        currentQuestion,
        questions,
        answeredQuestions,
        correctAnswers,
        quizStarted,
        quizFinished,
        selectedAnswer,
        timeLeft,
        xpPoints,
        streak,
        brainwaveData,
        selectedCategory,
        difficultyLevel,
        totalQuestions,
        startQuiz,
        endQuiz,
        answerQuestion,
        nextQuestion,
        resetQuiz,
        useHint,
        getRecommendedTopics,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
