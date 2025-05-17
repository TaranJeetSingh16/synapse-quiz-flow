
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="space-y-8 max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-quiz-primary via-quiz-primary-light to-quiz-accent bg-clip-text text-transparent">
          Master Any Subject with Adaptive AI Learning
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Our AI-driven platform adapts in real-time to your performance and engagement, making learning more effective and enjoyable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            onClick={() => navigate('/quiz')} 
            size="lg" 
            className="bg-quiz-primary hover:bg-quiz-primary-light text-white px-8 py-6 text-lg rounded-xl"
          >
            Start Learning Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            onClick={() => navigate('/how-it-works')} 
            variant="outline" 
            size="lg" 
            className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary/5 px-6 py-6 text-lg rounded-xl"
          >
            How It Works
          </Button>
        </div>
      </div>
      
      <div className="mt-16 flex justify-center">
        <div className="w-3/4 max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🧠" 
            title="Brain-Adaptive"
            description="Questions adjust based on your focus and stress levels"
          />
          <FeatureCard 
            icon="📊" 
            title="Smart Analytics"
            description="Track your progress with detailed performance insights"
          />
          <FeatureCard 
            icon="🏆" 
            title="Social Learning"
            description="Challenge friends and compare your progress"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 flex flex-col items-center hover-scale">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-quiz-primary">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
};

export default Hero;
