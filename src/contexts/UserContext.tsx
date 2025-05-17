
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

interface UserStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  averageScore: number;
  topCategory: string;
  weakestCategory: string;
  longestStreak: number;
  totalXp: number;
  level: number;
  rank: string;
  badges: Badge[];
  completedChallenges: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  isOnline: boolean;
}

interface UserContextType {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isLoggedIn: boolean;
  };
  stats: UserStats;
  friends: Friend[];
  leaderboard: Friend[];
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserStats: (quizResults: { correct: number; total: number; category: string; xp: number }) => void;
  earnBadge: (badgeId: string) => void;
}

// Mock data
const mockBadges: Badge[] = [
  {
    id: 'first-quiz',
    name: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🌱',
    earned: true,
    earnedAt: new Date('2023-01-15')
  },
  {
    id: 'streak-3',
    name: 'On Fire',
    description: 'Get a 3-answer streak',
    icon: '🔥',
    earned: true,
    earnedAt: new Date('2023-01-17')
  },
  {
    id: 'perfect-quiz',
    name: 'Perfectionist',
    description: 'Score 100% on a quiz',
    icon: '🏆',
    earned: false
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Answer 10 questions in under 1 minute',
    icon: '⚡',
    earned: false
  },
  {
    id: 'brain-master',
    name: 'Brain Master',
    description: 'Maintain high attention for a full quiz',
    icon: '🧠',
    earned: false
  }
];

const mockFriends: Friend[] = [
  { id: '1', name: 'Alex Johnson', avatar: '👨‍💼', level: 8, xp: 4200, isOnline: true },
  { id: '2', name: 'Sarah Williams', avatar: '👩‍🔬', level: 10, xp: 5100, isOnline: false },
  { id: '3', name: 'Miguel Reyes', avatar: '👨‍🎓', level: 6, xp: 3100, isOnline: true },
  { id: '4', name: 'Aisha Patel', avatar: '👩‍💻', level: 12, xp: 6700, isOnline: false },
  { id: '5', name: 'Tom Wilson', avatar: '👨‍🚀', level: 4, xp: 2300, isOnline: true }
];

const mockLeaderboard = [
  { id: '7', name: 'Emma Chen', avatar: '👸', level: 15, xp: 8200, isOnline: true },
  { id: '8', name: 'David Miller', avatar: '🧔', level: 14, xp: 7900, isOnline: false },
  ...mockFriends.sort((a, b) => b.xp - a.xp).slice(0, 3)
];

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({
    id: '12345',
    name: 'Learner',
    email: 'learner@example.com',
    avatar: '🧑‍🎓',
    isLoggedIn: true, // Auto-logged in for demo
  });
  
  const [stats, setStats] = useState<UserStats>({
    totalQuizzes: 5,
    totalCorrect: 27,
    totalQuestions: 40,
    averageScore: 67.5,
    topCategory: 'Science',
    weakestCategory: 'Art',
    longestStreak: 6,
    totalXp: 1250,
    level: 5,
    rank: 'Knowledge Seeker',
    badges: mockBadges,
    completedChallenges: 2,
  });
  
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [leaderboard, setLeaderboard] = useState<Friend[]>(mockLeaderboard);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Normally would be an API call
    if (email && password) {
      setUser({
        ...user,
        isLoggedIn: true,
      });
      
      if (email === 'admin@example.com') {
        setIsAdmin(true);
      }
      
      toast.success(`Welcome back, ${user.name}!`);
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    setUser({
      ...user,
      isLoggedIn: false,
    });
    setIsAdmin(false);
    toast.success('Logged out successfully');
  };

  const calculateLevel = (xp: number): number => {
    // Simple level calculation: each level needs more XP
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  };

  const getRank = (level: number): string => {
    if (level < 3) return 'Novice';
    if (level < 5) return 'Knowledge Seeker';
    if (level < 8) return 'Quiz Adept';
    if (level < 12) return 'Wisdom Keeper';
    if (level < 16) return 'Master Mind';
    return 'Quiz Legend';
  };

  const updateUserStats = (quizResults: { correct: number; total: number; category: string; xp: number }) => {
    setStats(prev => {
      const newTotalXp = prev.totalXp + quizResults.xp;
      const newLevel = calculateLevel(newTotalXp);
      const leveledUp = newLevel > prev.level;
      
      const newStats = {
        ...prev,
        totalQuizzes: prev.totalQuizzes + 1,
        totalCorrect: prev.totalCorrect + quizResults.correct,
        totalQuestions: prev.totalQuestions + quizResults.total,
        averageScore: Math.round(((prev.totalCorrect + quizResults.correct) / (prev.totalQuestions + quizResults.total)) * 100),
        totalXp: newTotalXp,
        level: newLevel,
        rank: getRank(newLevel),
      };
      
      // Check if this is a perfect score for a badge
      if (quizResults.correct === quizResults.total && quizResults.total >= 5) {
        earnBadge('perfect-quiz');
      }
      
      if (leveledUp) {
        toast.success(`🎉 Congrats! You reached level ${newLevel}!`);
      }
      
      return newStats;
    });
  };

  const earnBadge = (badgeId: string) => {
    // Check if badge not already earned
    if (!stats.badges.find(b => b.id === badgeId)?.earned) {
      setStats(prev => ({
        ...prev,
        badges: prev.badges.map(badge => 
          badge.id === badgeId 
            ? { ...badge, earned: true, earnedAt: new Date() } 
            : badge
        )
      }));
      
      const badge = stats.badges.find(b => b.id === badgeId);
      if (badge) {
        toast.success(`🏆 New badge earned: ${badge.name}!`);
      }
    }
  };

  return (
    <UserContext.Provider 
      value={{
        user,
        stats,
        friends,
        leaderboard,
        isAdmin,
        login,
        logout,
        updateUserStats,
        earnBadge,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
