
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestionManager from './QuestionManager';
import UserStats from './UserStats';
import EngagementInsights from './EngagementInsights';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage questions, track learner progress, and view engagement data</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Active Users"
          value="1,248"
          change="+12.3%"
          description="Last 7 days"
          positive={true}
        />
        <MetricCard
          title="Questions Answered"
          value="24,587"
          change="+8.7%"
          description="Last 7 days"
          positive={true}
        />
        <MetricCard
          title="Average Quiz Score"
          value="72.5%"
          change="-2.1%"
          description="Last 7 days"
          positive={false}
        />
      </div>
      
      <Tabs defaultValue="questions" className="mb-8">
        <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <QuestionManager />
        </TabsContent>
        <TabsContent value="users">
          <UserStats />
        </TabsContent>
        <TabsContent value="insights">
          <EngagementInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  positive: boolean;
}

const MetricCard = ({ title, value, change, description, positive }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span className={`text-sm ${positive ? 'text-success' : 'text-destructive'}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
