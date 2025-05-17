
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import CategorySelector from '@/components/quiz/CategorySelector';
import QuizInterface from '@/components/quiz/QuizInterface';
import QuizResult from '@/components/quiz/QuizResult';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Quiz = () => {
  const { quizStarted, quizFinished, startQuiz } = useQuiz();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        {!quizStarted && !quizFinished && (
          <CategorySelector onSelectCategory={startQuiz} />
        )}
        
        {quizStarted && !quizFinished && (
          <QuizInterface />
        )}
        
        {quizFinished && (
          <QuizResult />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
