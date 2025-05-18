
import React, { useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, HelpCircleIcon, ChevronRight, BrainIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const QuizInterface = () => {
  const { 
    currentQuestion, 
    answeredQuestions, 
    quizFinished,
    selectedAnswer, 
    timeLeft, 
    streak,
    brainwaveData,
    answerQuestion,
    nextQuestion,
    useHint,
    totalQuestions,
  } = useQuiz();
  
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState<string | undefined>();
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleUseHint = () => {
    const hintText = useHint();
    setHint(hintText);
    setShowHint(!!hintText);
  };
  
  const getDifficultyColor = (difficulty: number): string => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-orange-500';
      case 5: return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };
  
  const handleNextQuestion = () => {
    setShowExplanation(false);
    nextQuestion();
  };
  
  if (!currentQuestion) return null;
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <Badge variant="outline" className="mr-2 bg-primary/10 text-primary border-primary/20">
            Question {answeredQuestions + 1}/{totalQuestions}
          </Badge>
          
          <Badge variant="outline" className={`${getDifficultyColor(currentQuestion.difficulty)} text-white border-0`}>
            Level {currentQuestion.difficulty}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-lg font-medium text-quiz-accent">🔥 {streak}</span>
            <span className="ml-1 text-xs text-muted-foreground">streak</span>
          </div>
          
          <div className="flex items-center">
            <span className={`text-lg font-medium ${timeLeft < 10 ? 'text-destructive' : 'text-primary'}`}>⏱️ {timeLeft}</span>
            <span className="ml-1 text-xs text-muted-foreground">sec</span>
          </div>
        </div>
      </div>
      
      {/* Brainwave Simulation UI */}
      <div className="mb-6 bg-card p-3 rounded-lg border relative">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
          <span className="flex items-center gap-1">
            <BrainIcon className="h-3 w-3" />
            AI Adaptation
          </span>
          <span>{Math.round(brainwaveData.attention)}% focus</span>
        </div>
        
        <div className="flex gap-1 h-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="brain-wave flex-1"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                backgroundColor: `hsl(${256 - brainwaveData.stress * 2.56}, 45%, 50%)`,
                height: `${(brainwaveData.attention / 100) * 8 + 2}px`
              }}
            />
          ))}
        </div>
        
        <div className="absolute right-3 top-2 text-xs text-muted-foreground">
          <span className="bg-primary/10 rounded-full px-2 py-0.5 text-xs">
            Adaptive
          </span>
        </div>
      </div>
      
      {/* Question Card */}
      <Card className="mb-6 shadow-md border-primary/10">
        <CardHeader>
          <div className="flex justify-between">
            <h3 className="text-xl font-medium leading-tight">
              {currentQuestion.text}
            </h3>
            <Badge className="bg-secondary text-secondary-foreground">
              {currentQuestion.category}
            </Badge>
          </div>
        </CardHeader>
        
        {currentQuestion.imageUrl && (
          <CardContent>
            <img 
              src={currentQuestion.imageUrl} 
              alt="Question visual" 
              className="rounded-md w-full max-h-64 object-cover"
            />
          </CardContent>
        )}
        
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant={
                  selectedAnswer 
                    ? option.isCorrect 
                      ? 'default' 
                      : selectedAnswer === option.id 
                        ? 'destructive' 
                        : 'outline'
                    : 'outline'
                }
                className={`justify-start text-left h-auto py-4 px-4 font-normal ${
                  !selectedAnswer ? 'hover:bg-primary/10 hover:text-primary' : ''
                } ${
                  selectedAnswer && option.isCorrect ? 'bg-success/90 hover:bg-success/90 text-white' : ''
                } ${
                  selectedAnswer === null ? 'group' : ''
                }`}
                disabled={!!selectedAnswer}
                onClick={() => answerQuestion(option.id)}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors ${
                  selectedAnswer === option.id ? 'bg-white text-destructive' : ''
                } ${
                  selectedAnswer && option.isCorrect ? 'bg-white text-success' : ''
                }`}>
                  {option.id}
                </span>
                {option.text}
              </Button>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={!currentQuestion.hint || !!selectedAnswer}
            onClick={handleUseHint}
            className={`text-muted-foreground ${currentQuestion.hint && !selectedAnswer ? 'hover:text-primary' : ''}`}
          >
            <HelpCircleIcon className="w-4 h-4 mr-1" />
            Use Hint
          </Button>
          
          {selectedAnswer && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-primary"
                onClick={() => setShowExplanation(true)}
              >
                <InfoIcon className="w-4 h-4 mr-1" />
                Explanation
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                className="bg-quiz-primary hover:bg-quiz-primary-light text-white"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      
      {/* Progress bar */}
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span>Quiz Progress</span>
        <span>{answeredQuestions}/{totalQuestions} questions</span>
      </div>
      <Progress value={(answeredQuestions / totalQuestions) * 100} className="h-2" />
      
      {/* Hint Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hint</DialogTitle>
            <DialogDescription>
              Using a hint will cost 5 XP points
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 p-4 rounded-md">
            {hint}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Explanation Dialog */}
      <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Explanation</DialogTitle>
          </DialogHeader>
          <div className="bg-secondary/50 p-4 rounded-md">
            {currentQuestion.explanation}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowExplanation(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizInterface;
