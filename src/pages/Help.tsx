
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, HelpCircle, FileText, MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const helpCategories = [
  {
    id: 'cat-1',
    title: 'Getting Started',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Learn the basics of BrainWave Quiz',
    topics: [
      'Creating your account',
      'Quiz navigation',
      'Understanding your dashboard',
      'Mobile app installation'
    ]
  },
  {
    id: 'cat-2',
    title: 'Quiz Features',
    icon: <HelpCircle className="h-5 w-5" />,
    description: 'Learn about quiz types and features',
    topics: [
      'Adaptive difficulty system',
      'Using hints and explanations',
      'Time management',
      'Different question formats'
    ]
  },
  {
    id: 'cat-3',
    title: 'Account & Settings',
    icon: <FileText className="h-5 w-5" />,
    description: 'Manage your account settings',
    topics: [
      'Profile customization',
      'Notification preferences',
      'Privacy settings',
      'Subscription management'
    ]
  }
];

const commonQuestions = [
  'How do I reset my password?',
  'Can I change my username?',
  'How do I cancel my subscription?',
  'Where can I see my quiz history?',
  'How do I report a bug?',
  'Can I use BrainWave Quiz offline?'
];

const Help = () => {
  const handleContactSupport = () => {
    // Create a mailto link with pre-filled content
    const subject = encodeURIComponent("BrainWave Quiz Support Request");
    const body = encodeURIComponent(
      "Hello BrainWave Quiz Support Team,\n\nI need assistance with the following issue:\n\n[Please describe your issue here]\n\nUser Details:\nName: [Your Name]\nEmail: [Your Email]\n\nThank you!"
    );
    window.location.href = `mailto:support@brainwavequiz.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
  };

  const handleSubmitTicket = () => {
    toast.success("Ticket submitted successfully! Our support team will contact you within 24 hours.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold">Help Center</h1>
            <p className="mt-2 text-muted-foreground">
              Get help with any aspect of BrainWave Quiz
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-lg mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help topics..." 
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {helpCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{category.description}</p>
                  <ul className="space-y-1 mb-3">
                    {category.topics.map((topic, index) => (
                      <li key={index} className="text-sm">
                        <Link to="#" className="text-primary hover:underline">
                          {topic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="text-sm p-0">
                    View all articles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Common Questions */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {commonQuestions.map((question, index) => (
                  <Link 
                    key={index} 
                    to="/faq" 
                    className="flex items-center gap-1 py-2 text-primary hover:underline"
                  >
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{question}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Support */}
          <Card className="max-w-lg mx-auto text-center">
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our support team is here to help you with any questions or issues you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleContactSupport}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={handleSubmitTicket}>
                  Submit a Ticket
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Support hours: Monday-Friday, 9am-5pm EST
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
