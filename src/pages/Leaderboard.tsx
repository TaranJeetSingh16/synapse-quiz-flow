
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useUser } from '@/contexts/UserContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Trophy, Medal, Award } from 'lucide-react';

// Extended leaderboard with more users for the full page
const extendedLeaderboardData = [
  { id: '7', name: 'Emma Chen', avatar: '👸', level: 15, xp: 8200, isOnline: true },
  { id: '8', name: 'David Miller', avatar: '🧔', level: 14, xp: 7900, isOnline: false },
  { id: '1', name: 'Alex Johnson', avatar: '👨‍💼', level: 8, xp: 4200, isOnline: true },
  { id: '4', name: 'Aisha Patel', avatar: '👩‍💻', level: 12, xp: 6700, isOnline: false },
  { id: '2', name: 'Sarah Williams', avatar: '👩‍🔬', level: 10, xp: 5100, isOnline: false },
  { id: '3', name: 'Miguel Reyes', avatar: '👨‍🎓', level: 6, xp: 3100, isOnline: true },
  { id: '5', name: 'Tom Wilson', avatar: '👨‍🚀', level: 4, xp: 2300, isOnline: true },
  { id: '9', name: 'Jessica Rodriguez', avatar: '👩‍🎨', level: 9, xp: 4600, isOnline: false },
  { id: '10', name: 'Ryan Thompson', avatar: '👨‍🍳', level: 11, xp: 5900, isOnline: true },
  { id: '11', name: 'Lily Zhang', avatar: '👩‍🏫', level: 7, xp: 3800, isOnline: false },
  { id: '12', name: 'Marcus Johnson', avatar: '👨‍⚕️', level: 5, xp: 2700, isOnline: true },
  { id: '13', name: 'Olivia Parker', avatar: '👩‍🔧', level: 13, xp: 7100, isOnline: false },
  { id: '14', name: 'Noah Davis', avatar: '👨‍💻', level: 3, xp: 1900, isOnline: true },
  { id: '15', name: 'Sophia Kim', avatar: '👩‍🚀', level: 8, xp: 4400, isOnline: false }
];

const Leaderboard = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter leaderboard based on search query
  const filteredLeaderboard = extendedLeaderboardData
    .filter(person => 
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.xp - a.xp);
  
  // Get rank icons based on position
  const getRankIcon = (index: number) => {
    switch(index) {
      case 0: return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 1: return <Medal className="h-5 w-5 text-slate-300" />;
      case 2: return <Award className="h-5 w-5 text-amber-700" />;
      default: return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-muted-foreground">
              See how you rank among other learners in BrainWave Quiz!
            </p>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Global Rankings</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaderboard.map((person, index) => (
                    <TableRow 
                      key={person.id} 
                      className={person.id === user.id ? "bg-primary/10" : ""}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center justify-center">
                          {getRankIcon(index) || <span className="text-sm">{index + 1}</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="text-2xl mr-2">{person.avatar}</div>
                          <div>
                            <div className="font-medium flex items-center">
                              {person.name}
                              {person.id === user.id && (
                                <Badge className="ml-2 text-xs bg-primary/20 text-primary border-none hover:bg-primary/30">You</Badge>
                              )}
                              {person.isOnline && (
                                <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="bg-secondary/30 text-xs font-medium px-2 py-1 rounded">Lvl {person.level}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{person.xp.toLocaleString()} XP</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Rankings update every 24 hours. Keep learning to climb the leaderboard!
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>How Rankings Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Your position on the leaderboard is determined by your total XP points. Earn XP by:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Completing quizzes (10-50 XP per quiz)</li>
                  <li>Maintaining answer streaks (bonus XP)</li>
                  <li>Daily login bonuses (25 XP)</li>
                  <li>Earning achievement badges (50-100 XP)</li>
                </ul>
                <p className="text-sm text-muted-foreground">Keep learning consistently to maximize your XP and climb the ranks!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
