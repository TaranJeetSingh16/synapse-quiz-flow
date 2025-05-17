
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search } from 'lucide-react';

// Mock user data for display
const users = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: '👩‍⚕️',
    level: 12,
    xp: 4580,
    quizzes: 32,
    accuracy: 78,
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    avatar: '👨‍💻',
    level: 9,
    xp: 2845,
    quizzes: 24,
    accuracy: 85,
    lastActive: '1 day ago',
  },
  {
    id: '3',
    name: 'Aisha Patel',
    email: 'aisha.p@example.com',
    avatar: '👩‍🏫',
    level: 15,
    xp: 6120,
    quizzes: 45,
    accuracy: 92,
    lastActive: '5 minutes ago',
  },
  {
    id: '4',
    name: 'David Rodriguez',
    email: 'd.rodriguez@example.com',
    avatar: '👨‍🔬',
    level: 6,
    xp: 1250,
    quizzes: 14,
    accuracy: 65,
    lastActive: '3 days ago',
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    avatar: '👩‍💼',
    level: 8,
    xp: 2100,
    quizzes: 19,
    accuracy: 72,
    lastActive: '12 hours ago',
  },
];

const UserStats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Button>Export Data</Button>
      </div>
      
      <div className="space-y-4">
        {filteredUsers.map(user => (
          <Card key={user.id}>
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{user.avatar}</div>
                  <div>
                    <CardTitle className="text-base mb-1">{user.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last active {user.lastActive}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">{user.level}</span>
                  </div>
                  <Progress value={70} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">XP</span>
                    <span className="font-medium">{user.xp}</span>
                  </div>
                  <Progress value={(user.xp % 1000) / 10} className="h-1 bg-quiz-primary" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quizzes Taken</span>
                    <span className="font-medium">{user.quizzes}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium">{user.accuracy}%</span>
                  </div>
                  <Progress 
                    value={user.accuracy} 
                    className={`h-1 ${
                      user.accuracy >= 80 ? 'bg-success' : 
                      user.accuracy >= 60 ? 'bg-quiz-accent' : 'bg-destructive'
                    }`} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="default" size="sm">Send Message</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
