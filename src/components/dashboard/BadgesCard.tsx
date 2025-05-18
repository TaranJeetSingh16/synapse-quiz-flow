
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const BadgesCard = () => {
  const { stats } = useUser();
  
  // Get only the earned badges and up to 3 unearned badges to show progress
  const earnedBadges = stats.badges.filter(badge => badge.earned);
  const unearnedBadges = stats.badges.filter(badge => !badge.earned).slice(0, 3);
  const displayBadges = [...earnedBadges, ...unearnedBadges];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Earned Badges</CardTitle>
          <span className="text-xs text-muted-foreground">
            {earnedBadges.length}/{stats.badges.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {displayBadges.map((badge) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-xl text-center hover:bg-secondary/50 transition-colors cursor-help",
                      !badge.earned && "opacity-40"
                    )}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium text-primary truncate w-full">
                      {badge.name}
                    </div>
                    {badge.earned && (
                      <div className="text-[10px] text-muted-foreground mt-1">
                        {format(new Date(badge.earnedAt!), 'MMM d')}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="space-y-2 p-1">
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {badge.earned ? (
                      <p className="text-xs text-success">Earned on {format(new Date(badge.earnedAt!), 'MMM d, yyyy')}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Not yet earned</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        {earnedBadges.length > 0 && (
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              className="text-xs text-quiz-primary hover:text-quiz-primary-light p-0"
            >
              View all badges
            </Button>
          </div>
        )}
        
        {earnedBadges.length === 0 && (
          <div className="mt-4 text-xs text-muted-foreground flex items-center justify-center">
            <InfoIcon className="h-3 w-3 mr-1" />
            Complete achievements to earn badges
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgesCard;
