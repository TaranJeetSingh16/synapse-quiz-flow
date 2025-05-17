
import React, { useState } from 'react';
import { useQuiz, Question } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const QuestionManager = () => {
  const { questions } = useQuiz();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  
  // Get unique categories from questions
  const categories = ['All', ...Array.from(new Set(questions.map(q => q.category)))];
  
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = searchQuery.trim() === '' || 
      question.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || question.category === filterCategory;
    
    const matchesDifficulty = filterDifficulty === 'All' || 
      question.difficulty === parseInt(filterDifficulty);
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleAddQuestion = () => {
    toast.success("This would open a form to add a new question");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center w-full md:w-auto space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Levels</SelectItem>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
              <SelectItem value="4">Level 4</SelectItem>
              <SelectItem value="5">Level 5</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleAddQuestion} className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="border rounded-md">
            <div className="grid grid-cols-8 bg-muted p-3 rounded-t-md">
              <div className="col-span-3 font-medium">Question</div>
              <div className="font-medium">Category</div>
              <div className="font-medium">Type</div>
              <div className="font-medium">Difficulty</div>
              <div className="font-medium">Options</div>
              <div className="font-medium text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              {filteredQuestions.map(question => (
                <div key={question.id} className="grid grid-cols-8 p-3 items-center">
                  <div className="col-span-3 truncate pr-4">{question.text}</div>
                  <div>{question.category}</div>
                  <div className="capitalize">{question.type}</div>
                  <div>Level {question.difficulty}</div>
                  <div>{question.options.length}</div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredQuestions.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No questions match your search criteria.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.map(question => (
              <Card key={question.id} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge variant="outline" className={`
                      ${question.difficulty > 3 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        question.difficulty > 1 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                        'bg-green-500/10 text-green-500 border-green-500/20'}
                    `}>
                      Level {question.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground capitalize">
                      {question.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-base mt-2">{question.text}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-muted-foreground mb-2">
                    Category: <span className="font-medium text-foreground">{question.category}</span>
                  </div>
                  {question.options.map((option, index) => (
                    <div key={option.id} className={`text-sm flex items-center mb-1 ${option.isCorrect ? 'text-success' : ''}`}>
                      <span className="w-6">{option.id}.</span>
                      <span>{option.text}</span>
                      {option.isCorrect && <span className="ml-1">(✓)</span>}
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionManager;
