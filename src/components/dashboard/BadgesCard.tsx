
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Earned Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {stats.badges.map((badge) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl text-center hover:bg-secondary/50 transition-colors cursor-help",
                      !badge.earned && "opacity-40"
                    )}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="text-xs font-medium text-primary">{badge.name}</div>
                    {badge.earned && (
                      <div className="text-xs text-muted-foreground mt-1">
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
        
        <div className="mt-4 text-xs text-muted-foreground flex items-center">
          <InfoIcon className="h-3 w-3 mr-1" />
          Complete specific achievements to earn badges
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgesCard;
