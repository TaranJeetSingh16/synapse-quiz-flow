
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowUpRight, Clock, Target, Award } from 'lucide-react';

const QuizAnalytics = () => {
  const { correctAnswers, answeredQuestions, xpPoints, selectedCategory, totalQuestions } = useQuiz();
  
  // Calculate performance metrics
  const accuracy = (correctAnswers / answeredQuestions) * 100 || 0;
  const avgTimePerQuestion = answeredQuestions > 0 ? 25 : 0; // Assuming average time, would be dynamic in a real app
  const score = Math.round(accuracy);
  
  // Mock data for category breakdown
  const categoryData = [
    { name: 'Correct', value: correctAnswers, color: '#4CAF50' },
    { name: 'Incorrect', value: answeredQuestions - correctAnswers, color: '#F44336' },
  ];
  
  // Mock data for question difficulty breakdown
  const difficultyData = [
    { name: 'Easy', correct: Math.floor(correctAnswers * 0.4), total: Math.floor(answeredQuestions * 0.3) },
    { name: 'Medium', correct: Math.floor(correctAnswers * 0.3), total: Math.floor(answeredQuestions * 0.4) },
    { name: 'Hard', correct: correctAnswers - Math.floor(correctAnswers * 0.7), total: answeredQuestions - Math.floor(answeredQuestions * 0.7) },
  ];
  
  // Format data for difficulty chart
  const formattedDifficultyData = difficultyData.map(item => ({
    name: item.name,
    Correct: item.correct,
    Total: item.total,
  }));
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quiz Performance Analytics</h2>
      
      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">{score}%</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Target size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">XP Earned</p>
                <p className="text-2xl font-bold">+{xpPoints}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Award size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Time</p>
                <p className="text-2xl font-bold">{avgTimePerQuestion}s</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <ArrowUpRight size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart for Correct/Incorrect */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Bar Chart for Difficulty Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formattedDifficultyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Correct" fill="#4CAF50" />
                  <Bar dataKey="Total" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Strengths</h4>
              <p className="text-muted-foreground">
                {score >= 80 
                  ? `You show excellent understanding in ${selectedCategory}. Consider challenging yourself with harder questions.` 
                  : score >= 60 
                    ? `You're doing well in ${selectedCategory}. Keep practicing to improve further.`
                    : `You're making progress in ${selectedCategory}. Focus on building your fundamentals.`}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">Areas for Improvement</h4>
              <p className="text-muted-foreground">
                {score >= 80 
                  ? "Try answering questions faster to improve your speed while maintaining accuracy."
                  : score >= 60 
                    ? "Review the explanations for questions you missed to strengthen your knowledge."
                    : "Consider revisiting basic concepts and trying another quiz with a focus on accuracy."}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">Next Steps</h4>
              <p className="text-muted-foreground">
                {score >= 80 
                  ? "Try a different category to broaden your knowledge, or increase the difficulty."
                  : score >= 60 
                    ? "Continue practicing in this category, focusing on areas where you made mistakes."
                    : "Retake this quiz after reviewing the key concepts to improve your score."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizAnalytics;
