
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';

const Profile = () => {
  const { user, stats } = useUser();
  
  // Profile state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [friendActivity, setFriendActivity] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate profile update
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsChangingPassword(true);
    
    // Simulate password change
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password changed successfully');
    }, 1000);
  };
  
  const handleNotificationPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate saving notification preferences
    setTimeout(() => {
      toast.success('Notification preferences updated');
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">Level {stats.level}</div>
              </div>
              <Badge className="ml-2">{stats.rank}</Badge>
            </div>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TabsContent value="account">
                  <Card>
                    <form onSubmit={handleProfileUpdate}>
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                          Update your account details and profile information
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="avatar">Avatar</Label>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="text-xl">{user.avatar}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" type="button">
                              Change Avatar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          type="submit" 
                          className="bg-quiz-primary hover:bg-quiz-primary-light"
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <form onSubmit={handlePasswordChange}>
                      <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>
                          Update your password to keep your account secure
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          type="submit" 
                          className="bg-quiz-primary hover:bg-quiz-primary-light"
                          disabled={isChangingPassword}
                        >
                          {isChangingPassword ? "Updating..." : "Update Password"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <form onSubmit={handleNotificationPreferences}>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Manage how and when you receive notifications
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                          </div>
                          <input 
                            type="checkbox" 
                            className="toggle toggle-primary" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Quiz Reminders</p>
                            <p className="text-sm text-muted-foreground">Get reminded about your daily quizzes</p>
                          </div>
                          <input 
                            type="checkbox" 
                            className="toggle toggle-primary" 
                            checked={quizReminders}
                            onChange={() => setQuizReminders(!quizReminders)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Friend Activity</p>
                            <p className="text-sm text-muted-foreground">Notifications about your friends' progress</p>
                          </div>
                          <input 
                            type="checkbox" 
                            className="toggle toggle-primary" 
                            checked={friendActivity}
                            onChange={() => setFriendActivity(!friendActivity)}
                          />
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button type="submit" className="bg-quiz-primary hover:bg-quiz-primary-light">
                          Save Preferences
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Stats</CardTitle>
                    <CardDescription>
                      Your learning journey statistics
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-muted-foreground">January 15, 2023</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Total Quizzes</p>
                      <p className="text-muted-foreground">{stats.totalQuizzes}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Correct Answers</p>
                      <p className="text-muted-foreground">{stats.totalCorrect} of {stats.totalQuestions}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Average Score</p>
                      <p className="text-muted-foreground">{stats.averageScore}%</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Total XP</p>
                      <p className="text-muted-foreground">{stats.totalXp} XP</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Rank</p>
                      <p className="text-muted-foreground">{stats.rank}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
