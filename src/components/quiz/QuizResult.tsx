
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ChevronRight, RotateCw } from 'lucide-react';
import QuizAnalytics from './QuizAnalytics';

const QuizResult = () => {
  const { correctAnswers, answeredQuestions, xpPoints, selectedCategory, resetQuiz, startQuiz, streak } = useQuiz();
  const { updateUserStats } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Update user stats based on quiz results
    updateUserStats({
      correct: correctAnswers,
      total: answeredQuestions,
      category: selectedCategory,
      xp: xpPoints,
    });
  }, []);

  const score = Math.round((correctAnswers / answeredQuestions) * 100) || 0;
  
  const getScoreMessage = () => {
    if (score >= 90) return 'Excellent!';
    if (score >= 70) return 'Great job!';
    if (score >= 50) return 'Good effort!';
    return 'Keep practicing!';
  };
  
  const getFeedbackMessage = () => {
    if (score >= 90) {
      return "You've mastered this topic! Try a more challenging category next.";
    }
    if (score >= 70) {
      return "That's a solid performance! A bit more practice and you'll be an expert.";
    }
    if (score >= 50) {
      return "You're making good progress. Review the explanations to improve further.";
    }
    return "Don't worry! Learning takes time. Review the material and try again.";
  };
  
  const handleRetryQuiz = () => {
    resetQuiz();
    startQuiz(selectedCategory);
  };
  
  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const handleNewCategory = () => {
    resetQuiz();
    navigate('/quiz');
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8">
        <Card className="shadow-lg border-primary/10">
          <CardHeader className="text-center border-b pb-6">
            <div className="text-5xl mb-2">
              {score >= 80 ? '🏆' : score >= 60 ? '🎯' : '📝'}
            </div>
            <CardTitle className="text-2xl font-bold mb-1">{getScoreMessage()}</CardTitle>
            <p className="text-muted-foreground">{getFeedbackMessage()}</p>
            
            {/* Streak badge */}
            {streak >= 3 && (
              <div className="mt-4">
                <Badge className="bg-quiz-accent text-white px-3 py-1 text-sm">
                  🔥 Streak: {streak} Correct Answers in a Row!
                </Badge>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Score Display */}
              <div>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Your Score</span>
                  <span>{score}%</span>
                </div>
                <div className="h-4 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${score}%`,
                      background: `linear-gradient(90deg, ${score < 50 ? '#F44336' : score < 70 ? '#FFC107' : '#4CAF50'}, ${score < 50 ? '#FF9800' : score < 70 ? '#8BC34A' : '#2196F3'})` 
                    }}
                  />
                </div>
              </div>
              
              {/* Results Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-xl border">
                  <div className="text-xs text-muted-foreground">Correct Answers</div>
                  <div className="text-2xl font-bold text-primary">{correctAnswers}/{answeredQuestions}</div>
                  <Progress value={(correctAnswers / answeredQuestions) * 100} className="h-1 mt-2" />
                </div>
                
                <div className="bg-card p-4 rounded-xl border">
                  <div className="text-xs text-muted-foreground">XP Earned</div>
                  <div className="text-2xl font-bold text-quiz-accent">{xpPoints} XP</div>
                  <div className="text-xs text-muted-foreground mt-2">Category: {selectedCategory}</div>
                </div>
                
                <div className="bg-card p-4 rounded-xl border">
                  <div className="text-xs text-muted-foreground">Time Saved</div>
                  <div className="text-2xl font-bold text-green-500">+5 min</div>
                  <div className="text-xs text-muted-foreground mt-2">Compared to traditional</div>
                </div>
                
                <div className="bg-card p-4 rounded-xl border">
                  <div className="text-xs text-muted-foreground">Learning Efficiency</div>
                  <div className="text-2xl font-bold text-blue-500">{score >= 80 ? 'High' : score >= 60 ? 'Medium' : 'Developing'}</div>
                  <Progress value={score} className="h-1 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button 
              onClick={handleRetryQuiz}
              variant="outline" 
              className="w-full sm:w-auto"
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            
            <Button
              onClick={handleNewCategory}
              variant="outline"
              className="w-full sm:w-auto"
            >
              New Category
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              onClick={handleViewDashboard}
              className="w-full sm:w-auto bg-quiz-primary hover:bg-quiz-primary-light"
            >
              View Dashboard
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Analytics Panel */}
        <QuizAnalytics />
      </div>
    </div>
  );
};

export default QuizResult;
