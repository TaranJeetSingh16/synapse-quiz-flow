
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';

interface RecommendedTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  estimatedTime: string;
}

const topicMapping: Record<string, RecommendedTopic> = {
  'Programming': {
    id: 'prog-101',
    title: 'Programming Basics',
    description: 'Strengthen your knowledge of fundamental programming concepts',
    icon: '💻',
    difficulty: 'Medium',
    estimatedTime: '15 min',
  },
  'Physics': {
    id: 'phys-adv',
    title: 'Advanced Physics',
    description: 'Deepen your understanding of quantum physics principles',
    icon: '⚛️',
    difficulty: 'Hard',
    estimatedTime: '20 min',
  },
  'Biology': {
    id: 'bio-eco',
    title: 'Ecosystem Studies',
    description: 'Explore how organisms interact with their environment',
    icon: '🌱',
    difficulty: 'Medium',
    estimatedTime: '12 min',
  },
  'Geography': {
    id: 'geo-world',
    title: 'World Geography',
    description: 'Test your knowledge of countries, capitals and landmarks',
    icon: '🌍',
    difficulty: 'Easy',
    estimatedTime: '10 min',
  },
  'History': {
    id: 'hist-world',
    title: 'World History',
    description: 'Important events that shaped our world',
    icon: '🏛️',
    difficulty: 'Medium',
    estimatedTime: '15 min',
  },
};

const RecommendedTopics = () => {
  const { getRecommendedTopics, startQuiz } = useQuiz();
  const navigate = useNavigate();
  
  const recommendedTopicNames = getRecommendedTopics();
  const recommendedTopics = recommendedTopicNames.map(name => topicMapping[name]).filter(Boolean);

  const handleStartQuiz = (topic: string) => {
    startQuiz(topic);
    navigate('/quiz/session');
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Recommended Next Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedTopics.map((topic) => (
            <Card key={topic.id} className="border border-primary/10">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="text-3xl">{topic.icon}</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs font-medium bg-secondary/50 px-2 py-1 rounded">
                      {topic.difficulty}
                    </div>
                    <div className="text-xs font-medium bg-secondary/50 px-2 py-1 rounded">
                      {topic.estimatedTime}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-base mt-2">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground pb-2">
                {topic.description}
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-quiz-primary text-quiz-primary hover:bg-quiz-primary/10"
                  onClick={() => handleStartQuiz(topic.title.split(' ')[0])}
                >
                  Start Topic
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedTopics;
