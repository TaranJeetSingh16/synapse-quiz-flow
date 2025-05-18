
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomQuizCreator from '@/components/quiz/CustomQuizCreator';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

const CreateQuiz = () => {
  const { user } = useUser();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {!user.isLoggedIn ? (
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Login Required</h1>
              <p className="text-muted-foreground mb-8">
                Please log in or sign up to create custom quizzes
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
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Create Your Own Quiz</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                  Design a custom quiz by selecting categories, difficulty level, and number of questions. 
                  Share it with friends or use it for your own learning!
                </p>
              </div>
              
              <CustomQuizCreator />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateQuiz;
