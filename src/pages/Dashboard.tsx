
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatsCards from '@/components/dashboard/StatsCards';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import CategoryPerformance from '@/components/dashboard/CategoryPerformance';
import RecommendedTopics from '@/components/dashboard/RecommendedTopics';
import BadgesCard from '@/components/dashboard/BadgesCard';
import { useUser } from '@/contexts/UserContext';

const Dashboard = () => {
  const { user } = useUser();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Here's your learning progress.
            </p>
          </div>
          
          <div className="space-y-8">
            <StatsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PerformanceChart />
              <CategoryPerformance />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecommendedTopics />
              </div>
              <div>
                <BadgesCard />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
