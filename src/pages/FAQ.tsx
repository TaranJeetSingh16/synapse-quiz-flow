
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent 
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    id: 'faq-1',
    question: 'How does BrainWave Quiz adapt to my learning style?',
    answer: 'BrainWave Quiz uses AI algorithms to analyze your response patterns, time spent on questions, and accuracy to dynamically adjust difficulty and question types. The platform simulates brainwave feedback to detect engagement levels and adapts content presentation accordingly. This creates a personalized learning experience that evolves as you progress.'
  },
  {
    id: 'faq-2',
    question: 'What are XP points and how do I earn them?',
    answer: 'XP (Experience Points) are earned by completing quizzes, maintaining answer streaks, logging in daily, and earning achievement badges. The more challenging the quiz and the higher your accuracy, the more XP you earn. These points determine your level and position on the leaderboard.'
  },
  {
    id: 'faq-3',
    question: 'Can I use BrainWave Quiz on my mobile device?',
    answer: 'Yes, BrainWave Quiz is fully responsive and works on smartphones, tablets, and desktop computers. The interface automatically adapts to your screen size for an optimal learning experience on any device.'
  },
  {
    id: 'faq-4',
    question: 'How do I track my progress over time?',
    answer: 'Your Dashboard shows comprehensive performance metrics including growth charts, accuracy rates, category strengths/weaknesses, and improvement trends. You can also export your data in CSV format for personal analysis or review.'
  },
  {
    id: 'faq-5',
    question: 'Are there different subscription plans available?',
    answer: 'BrainWave Quiz offers a free tier with limited features and several premium subscription options. Premium plans include advanced analytics, unlimited quizzes, ad-free experience, and access to exclusive content categories.'
  },
  {
    id: 'faq-6',
    question: 'How do I challenge friends to a quiz?',
    answer: 'Navigate to any quiz and click the "Challenge" button to generate a unique link that you can share via email, social media, or messaging apps. Your friends can click the link to take the same quiz, and results will be compared on a mini-leaderboard.'
  },
  {
    id: 'faq-7',
    question: 'Can I create my own quizzes?',
    answer: 'Premium users can create custom quizzes by accessing the "Create Quiz" section from the dashboard. You can add various question types, set difficulty levels, add multimedia elements, and share your quizzes with the community or keep them private.'
  },
  {
    id: 'faq-8',
    question: 'How does the leaderboard ranking work?',
    answer: 'Leaderboard rankings are determined by total XP points accumulated. Points are weighted based on quiz difficulty, accuracy, and consistency. Rankings update every 24 hours, and you can filter leaderboards by global, friends-only, or specific topic categories.'
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            <p className="mt-2 text-muted-foreground">
              Find answers to common questions about BrainWave Quiz
            </p>
          </div>
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqItems.map((item) => (
                <Collapsible 
                  key={item.id} 
                  open={openItems[item.id]} 
                  onOpenChange={() => toggleItem(item.id)}
                  className="border rounded-md"
                >
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-medium text-left hover:bg-muted/50 transition-colors">
                    <span>{item.question}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${openItems[item.id] ? 'transform rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 pt-1 text-muted-foreground">
                    <p>{item.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
          
          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Contact our support team for personalized assistance.
            </p>
            <div className="flex justify-center gap-4">
              <a href="mailto:support@brainwavequiz.com" className="text-primary hover:underline">
                Email Support
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/help" className="text-primary hover:underline">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
