
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { useUser } from '@/contexts/UserContext';
import CategorySelector from '@/components/quiz/CategorySelector';
import QuizInterface from '@/components/quiz/QuizInterface';
import QuizResult from '@/components/quiz/QuizResult';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Quiz = () => {
  const { quizStarted, quizFinished, startQuiz } = useQuiz();
  const { user } = useUser();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-4 md:py-8">
        {!user.isLoggedIn ? (
          <div className="container mx-auto px-4 text-center py-8 md:py-16">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Login Required</h1>
            <p className="text-muted-foreground mb-8">
              Please log in or sign up to access quizzes
            </p>
            <Button 
              className="bg-quiz-primary hover:bg-quiz-primary-light"
              onClick={() => window.location.href = '/auth'}
            >
              Login or Sign up
            </Button>
          </div>
        ) : (
          <>
            {!quizStarted && !quizFinished && (
              <div>
                <div className="container mx-auto px-4 mb-8 text-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1 text-sm font-medium text-primary mb-4">
                    <Sparkles className="h-4 w-4" />
                    Powered by AI
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">QuizIQ</h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                    Adaptive AI-powered quizzes that adjust to your skill level in real-time. The questions evolve as you learn!
                  </p>
                </div>
                <CategorySelector onSelectCategory={startQuiz} />
              </div>
            )}
            
            {quizStarted && !quizFinished && (
              <div className="px-2 md:px-0">
                <QuizInterface />
              </div>
            )}
            
            {quizFinished && (
              <div className="px-2 md:px-0">
                <QuizResult />
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
