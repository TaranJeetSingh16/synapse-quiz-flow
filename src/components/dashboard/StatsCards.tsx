
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatsCards = () => {
  const { stats } = useUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total XP"
        value={stats.totalXp}
        description={`Level ${stats.level}`}
        trend="+125 this week"
        trendUp={true}
        icon="✨"
      />
      
      <StatsCard
        title="Accuracy"
        value={`${stats.averageScore}%`}
        description={`${stats.totalCorrect}/${stats.totalQuestions} correct`}
        trend="+2.5% from last week"
        trendUp={true}
        icon="🎯"
      />
      
      <StatsCard
        title="Quizzes Taken"
        value={stats.totalQuizzes}
        description={`${Math.round(stats.totalQuizzes / 7)} per week`}
        trend="3 more than last week"
        trendUp={true}
        icon="📝"
      />
      
      <StatsCard
        title="Longest Streak"
        value={stats.longestStreak}
        description="Consecutive correct answers"
        trend="Same as last week"
        trendUp={false}
        icon="🔥"
      />
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}

const StatsCard = ({ title, value, description, trend, trendUp, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-xl p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <div className={`text-xs mt-2 ${trendUp ? 'text-success' : 'text-muted-foreground'}`}>
          {trend}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCards;
