
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-quiz-primary via-quiz-primary-light to-quiz-accent bg-clip-text text-transparent">
            How BrainWave Quiz Works
          </h1>

          <div className="max-w-3xl mx-auto space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-quiz-primary/10 text-quiz-primary text-4xl font-bold shrink-0">
                1
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Choose a Category</h2>
                <p className="text-muted-foreground">
                  Start by selecting a quiz category that interests you. We offer a wide range of topics from Science and History to Programming and Art. Each category contains carefully curated questions to test and expand your knowledge.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-quiz-primary/10 text-quiz-primary text-4xl font-bold shrink-0">
                2
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Take the Adaptive Quiz</h2>
                <p className="text-muted-foreground">
                  Our AI-powered system adapts questions based on your performance in real-time. As you answer correctly, questions become more challenging. If you struggle, the difficulty adjusts to ensure you're always learning at the optimal level.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-quiz-primary/10 text-quiz-primary text-4xl font-bold shrink-0">
                3
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Learn from Results</h2>
                <p className="text-muted-foreground">
                  After completing a quiz, review your results with detailed explanations for each question. Our system identifies your knowledge gaps and provides personalized recommendations for improvement.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-quiz-primary/10 text-quiz-primary text-4xl font-bold shrink-0">
                4
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Track Your Progress</h2>
                <p className="text-muted-foreground">
                  Visit your personalized dashboard to monitor your learning journey. View performance analytics across different categories, track XP earned, unlock achievements, and compare your rankings with other learners.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <Link to="/auth">
                <Button variant="outline" size="lg" className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary/5">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" className="bg-quiz-primary hover:bg-quiz-primary-light text-white">
                  Try a Quiz Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
