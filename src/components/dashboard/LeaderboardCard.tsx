
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LeaderboardCard = () => {
  const { leaderboard, user } = useUser();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((person, index) => (
            <div 
              key={person.id} 
              className={`flex items-center justify-between p-3 rounded-lg ${
                person.id === user.id ? 'bg-primary/10' : index < 3 ? 'bg-secondary/30' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  index === 0 ? 'bg-yellow-400/80' : 
                  index === 1 ? 'bg-slate-300/80' : 
                  index === 2 ? 'bg-amber-700/80' : 'bg-secondary'
                } text-xs font-bold`}>
                  {index + 1}
                </div>
                
                <div className="flex items-center">
                  <div className="text-2xl mr-2">{person.avatar}</div>
                  <div>
                    <div className="font-medium text-sm flex items-center">
                      {person.name}
                      {person.id === user.id && (
                        <Badge className="ml-2 text-xs bg-primary/20 text-primary border-none hover:bg-primary/30">You</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">Level {person.level}</div>
                  </div>
                </div>
              </div>
              
              <div className="font-semibold text-sm">
                {person.xp} XP
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center text-sm">
          <span className="text-quiz-primary hover:text-quiz-primary-light cursor-pointer">
            View Full Leaderboard
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
