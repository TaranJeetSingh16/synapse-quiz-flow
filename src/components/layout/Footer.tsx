
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-card shadow-sm border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-quiz-primary to-quiz-primary-light bg-clip-text text-transparent">BrainWave</span>
              <span className="text-lg ml-1">Quiz</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              AI-powered adaptive learning platform that revolutionizes how you acquire knowledge.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">
                  Start Quiz
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Contact & Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: support@brainwavequiz.com</li>
              <li className="text-muted-foreground">Phone: (555) 123-4567</li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between">
          <div>© 2025 BrainWave Quiz. All rights reserved.</div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
