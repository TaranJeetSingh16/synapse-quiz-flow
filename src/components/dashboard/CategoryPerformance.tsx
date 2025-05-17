
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CategoryData {
  category: string;
  accuracy: number;
  questions: number;
  icon: string;
}

// Sample category performance data
const categoryData: CategoryData[] = [
  { category: 'Science', accuracy: 82, questions: 45, icon: '🔬' },
  { category: 'Programming', accuracy: 76, questions: 32, icon: '💻' },
  { category: 'Geography', accuracy: 65, questions: 28, icon: '🌍' },
  { category: 'History', accuracy: 58, questions: 20, icon: '🏛️' },
  { category: 'Art', accuracy: 45, questions: 15, icon: '🎨' },
];

const getAccuracyColor = (accuracy: number): string => {
  if (accuracy >= 80) return 'bg-success';
  if (accuracy >= 60) return 'bg-quiz-accent';
  return 'bg-destructive';
};

const CategoryPerformance = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Category Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryData.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{category.icon}</span>
                  <span className="font-medium">{category.category}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {category.questions} questions
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Progress 
                  value={category.accuracy} 
                  className={`h-2 flex-grow ${getAccuracyColor(category.accuracy)}`} 
                />
                <span className="text-sm font-medium w-12 text-end">
                  {category.accuracy}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPerformance;
