
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { useUser } from '@/contexts/UserContext';
import CategorySelector from '@/components/quiz/CategorySelector';
import QuizInterface from '@/components/quiz/QuizInterface';
import QuizResult from '@/components/quiz/QuizResult';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Quiz = () => {
  const { quizStarted, quizFinished, startQuiz } = useQuiz();
  const { user } = useUser();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        {!user.isLoggedIn ? (
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Login Required</h1>
            <p className="text-muted-foreground mb-8">
              Please log in or sign up to access quizzes
            </p>
          </div>
        ) : (
          <>
            {!quizStarted && !quizFinished && (
              <CategorySelector onSelectCategory={startQuiz} />
            )}
            
            {quizStarted && !quizFinished && (
              <QuizInterface />
            )}
            
            {quizFinished && (
              <QuizResult />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
