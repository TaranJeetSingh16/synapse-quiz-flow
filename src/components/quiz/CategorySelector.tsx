
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const categories = [
  {
    id: 'all',
    name: 'All Categories',
    icon: '📚',
    description: 'Questions from all available topics',
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Physics, Chemistry, Biology and more',
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'World events and important dates',
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: '💻',
    description: 'Coding concepts and languages',
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Countries, capitals, and landmarks',
  },
  {
    id: 'art',
    name: 'Art',
    icon: '🎨',
    description: 'Paintings, artists, and movements',
  },
];

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({ onSelectCategory }: CategorySelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold flex items-center justify-center gap-2">
          Choose a Category
          <Sparkles className="h-4 md:h-5 w-4 md:w-5 text-quiz-primary" />
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-2">Select a topic to start your adaptive quiz</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="cursor-pointer hover:shadow-md hover:border-quiz-primary/50 transition-all group"
            onClick={() => onSelectCategory(category.name)}
          >
            <CardHeader className="pb-2 md:pb-3">
              <div className="flex justify-between items-center">
                <div className="text-2xl md:text-3xl group-hover:scale-110 transition-transform">{category.icon}</div>
                <div className="text-xs font-medium bg-secondary/50 px-2 py-1 rounded">
                  5-10 questions
                </div>
              </div>
              <CardTitle className="mt-2 text-base md:text-lg">{category.name}</CardTitle>
              <CardDescription className="text-xs md:text-sm">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-quiz-primary text-quiz-primary hover:bg-quiz-primary/10 group-hover:bg-quiz-primary group-hover:text-white transition-colors"
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
