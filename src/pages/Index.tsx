
import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        
        <section className="py-16 bg-quiz-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Knowledge?</h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners who have accelerated their growth with our AI-powered adaptive quizzes
            </p>
            
            <Link to="/quiz">
              <Button size="lg" className="bg-quiz-primary hover:bg-quiz-primary-light text-white px-8 py-6 text-lg rounded-xl">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
