
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/sonner';
import { Share2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';

const CustomQuizCreator = () => {
  const navigate = useNavigate();
  const { startQuiz } = useQuiz();
  const [quizName, setQuizName] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Science']);
  const [difficulty, setDifficulty] = useState(2);
  
  const categories = [
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'history', name: 'History', icon: '🏛️' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'geography', name: 'Geography', icon: '🌍' },
    { id: 'art', name: 'Art', icon: '🎨' },
  ];
  
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const handleCreateQuiz = () => {
    if (!quizName.trim()) {
      toast.error("Please enter a quiz name");
      return;
    }
    
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }
    
    // Generate a shareable link (in a real app, this would store the quiz configuration)
    const quizId = Math.random().toString(36).substring(2, 8);
    const shareableLink = `${window.location.origin}/quiz?id=${quizId}&name=${encodeURIComponent(quizName)}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast.success("Shareable link copied to clipboard!");
      
      // In a real implementation, we would save the quiz configuration
      // For now, we'll just start a quiz with the first selected category
      startQuiz(selectedCategories[0]);
    });
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Custom Quiz</CardTitle>
        <CardDescription>Select categories, difficulty level, and number of questions</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quiz Name */}
        <div className="space-y-2">
          <Label htmlFor="quiz-name">Quiz Name</Label>
          <Input
            id="quiz-name"
            placeholder="Enter a name for your quiz"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>
        
        {/* Categories */}
        <div className="space-y-2">
          <Label>Categories</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`flex items-center gap-2 p-3 rounded-md cursor-pointer border transition-all ${
                  selectedCategories.includes(category.name)
                    ? 'border-primary bg-primary/10'
                    : 'border-muted-foreground/20'
                }`}
                onClick={() => handleCategoryToggle(category.name)}
              >
                <Checkbox 
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => handleCategoryToggle(category.name)}
                />
                <span className="mr-2">{category.icon}</span>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Number of Questions */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Number of Questions</Label>
            <span className="text-sm font-medium">{questionCount}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setQuestionCount(Math.max(3, questionCount - 1))}
              disabled={questionCount <= 3}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Slider
              value={[questionCount]}
              onValueChange={(value) => setQuestionCount(value[0])}
              min={3}
              max={15}
              step={1}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setQuestionCount(Math.min(15, questionCount + 1))}
              disabled={questionCount >= 15}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Difficulty */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Difficulty Level</Label>
            <span className="text-sm font-medium">
              {difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Medium' : 'Hard'}
            </span>
          </div>
          <Slider
            value={[difficulty]}
            onValueChange={(value) => setDifficulty(value[0])}
            min={1}
            max={3}
            step={1}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Easy</span>
            <span>Medium</span>
            <span>Hard</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/quiz')}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleCreateQuiz} 
          className="w-full sm:w-auto bg-quiz-primary hover:bg-quiz-primary-light"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Create & Share Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomQuizCreator;
