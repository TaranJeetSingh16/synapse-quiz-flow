
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  questionCount: number;
}

const categories: Category[] = [
  {
    id: 'all',
    name: 'All Categories',
    icon: '📚',
    description: 'Questions from all available topics',
    questionCount: 50,
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Physics, Chemistry, Biology and more',
    questionCount: 50,
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'World events and important dates',
    questionCount: 50,
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: '💻',
    description: 'Coding concepts and languages',
    questionCount: 50,
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Countries, capitals, and landmarks',
    questionCount: 50,
  },
  {
    id: 'art',
    name: 'Art',
    icon: '🎨',
    description: 'Paintings, artists, and movements',
    questionCount: 50,
  },
];

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Choose a Category</h2>
        <p className="text-muted-foreground mt-2">Select a topic to start your adaptive quiz</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer hover:shadow-md hover:border-quiz-primary/50 transition-all"
            onClick={() => onSelectCategory(category.name)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="text-3xl">{category.icon}</div>
                <div className="text-xs font-medium bg-secondary/50 px-2 py-1 rounded">
                  {category.questionCount} questions
                </div>
              </div>
              <CardTitle className="mt-2">{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-quiz-primary text-quiz-primary hover:bg-quiz-primary/10"
                onClick={() => onSelectCategory(category.name)}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
