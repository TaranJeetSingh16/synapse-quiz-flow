
import React from 'react';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Adaptive Difficulty',
    description: 'Our AI automatically adjusts question difficulty based on your performance.',
    icon: '📈',
  },
  {
    id: 2,
    title: 'Brainwave Monitoring',
    description: 'We simulate brainwave feedback to optimize your learning experience.',
    icon: '📊',
  },
  {
    id: 3,
    title: 'Multiple Content Types',
    description: 'Learn through text, images, and interactive games based on your engagement.',
    icon: '🎮',
  },
  {
    id: 4,
    title: 'Real-time Feedback',
    description: 'Get immediate explanations and hints to enhance understanding.',
    icon: '⚡',
  },
  {
    id: 5,
    title: 'Personalized Insights',
    description: 'View detailed analytics about your learning patterns and progress.',
    icon: '📋',
  },
  {
    id: 6,
    title: 'Social Learning',
    description: 'Challenge friends and participate in community leaderboards.',
    icon: '👨‍👩‍👧‍👦',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-secondary/30 dark:to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven learning science to help you master any subject.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="quiz-card hover:shadow-lg transition-all hover:translate-y-[-5px]"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-quiz-primary">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
