
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const { user, updateNotificationSettings } = useUser();
  const navigate = useNavigate();
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [friendActivity, setFriendActivity] = useState(false);
  const [isUpdatingNotifications, setIsUpdatingNotifications] = useState(false);
  
  // Themes
  const [selectedTheme, setSelectedTheme] = useState('system');
  
  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [shareActivity, setShareActivity] = useState(true);
  const [isUpdatingPrivacy, setIsUpdatingPrivacy] = useState(false);
  
  // Accessibility
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [isUpdatingAccessibility, setIsUpdatingAccessibility] = useState(false);
  
  const handleNotificationSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingNotifications(true);
    
    try {
      await updateNotificationSettings({
        emailNotifications,
        quizReminders,
        friendActivity
      });
    } catch (error) {
      toast.error("Failed to update notification settings");
    } finally {
      setIsUpdatingNotifications(false);
    }
  };
  
  const handlePrivacySettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPrivacy(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("Privacy settings updated successfully");
    } catch (error) {
      toast.error("Failed to update privacy settings");
    } finally {
      setIsUpdatingPrivacy(false);
    }
  };
  
  const handleAccessibilitySettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingAccessibility(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // Apply changes
      document.documentElement.classList.toggle('high-contrast', highContrast);
      document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
      document.documentElement.classList.add(`text-${fontSize}`);
      toast.success("Accessibility settings updated successfully");
    } catch (error) {
      toast.error("Failed to update accessibility settings");
    } finally {
      setIsUpdatingAccessibility(false);
    }
  };
  
  const handleDeleteAccount = () => {
    // In a real app, we would show a confirmation dialog here
    toast.error("Account deletion is disabled in this demo");
  };
  
  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    
    // Apply theme change
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    toast.success(`Theme changed to ${theme}`);
  };

  if (!user.isLoggedIn) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>
          
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <div className="max-w-2xl mx-auto">
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <form onSubmit={handleNotificationSettingsUpdate}>
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
                        <Switch 
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Quiz Reminders</p>
                          <p className="text-sm text-muted-foreground">Get reminded about your daily quizzes</p>
                        </div>
                        <Switch 
                          checked={quizReminders}
                          onCheckedChange={setQuizReminders}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Friend Activity</p>
                          <p className="text-sm text-muted-foreground">Notifications about your friends' progress</p>
                        </div>
                        <Switch 
                          checked={friendActivity}
                          onCheckedChange={setFriendActivity}
                        />
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="bg-quiz-primary hover:bg-quiz-primary-light"
                        disabled={isUpdatingNotifications}
                      >
                        {isUpdatingNotifications ? "Saving..." : "Save Preferences"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize how BrainWave Quiz looks
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          type="button"
                          variant={selectedTheme === 'light' ? "default" : "outline"} 
                          className={`flex flex-col items-center justify-center h-20 ${selectedTheme === 'light' ? 'border-primary' : ''}`}
                          onClick={() => handleThemeChange('light')}
                        >
                          <div className="rounded-full bg-background border h-6 w-6 mb-2"></div>
                          <span>Light</span>
                        </Button>
                        
                        <Button
                          type="button"
                          variant={selectedTheme === 'dark' ? "default" : "outline"} 
                          className={`flex flex-col items-center justify-center h-20 ${selectedTheme === 'dark' ? 'border-primary' : ''}`}
                          onClick={() => handleThemeChange('dark')}
                        >
                          <div className="rounded-full bg-black border h-6 w-6 mb-2"></div>
                          <span>Dark</span>
                        </Button>
                        
                        <Button
                          type="button"
                          variant={selectedTheme === 'system' ? "default" : "outline"} 
                          className={`flex flex-col items-center justify-center h-20 ${selectedTheme === 'system' ? 'border-primary' : ''}`}
                          onClick={() => handleThemeChange('system')}
                        >
                          <div className="flex gap-1 mb-2">
                            <div className="rounded-full bg-background border h-6 w-3"></div>
                            <div className="rounded-full bg-black border h-6 w-3"></div>
                          </div>
                          <span>System</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Privacy Tab */}
              <TabsContent value="privacy">
                <Card>
                  <form onSubmit={handlePrivacySettingsUpdate}>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>
                        Control your data and privacy options
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Profile Visibility</Label>
                        <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select who can see your profile" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Anyone</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                            <SelectItem value="private">Private - Only Me</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Share Activity</p>
                          <p className="text-sm text-muted-foreground">Show your quiz activity on leaderboards</p>
                        </div>
                        <Switch 
                          checked={shareActivity}
                          onCheckedChange={setShareActivity}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <h3 className="text-sm font-medium text-destructive mb-1">Danger Zone</h3>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-destructive text-destructive hover:bg-destructive/10"
                          onClick={handleDeleteAccount}
                        >
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="bg-quiz-primary hover:bg-quiz-primary-light"
                        disabled={isUpdatingPrivacy}
                      >
                        {isUpdatingPrivacy ? "Saving..." : "Save Privacy Settings"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              {/* Accessibility Tab */}
              <TabsContent value="accessibility">
                <Card>
                  <form onSubmit={handleAccessibilitySettingsUpdate}>
                    <CardHeader>
                      <CardTitle>Accessibility Settings</CardTitle>
                      <CardDescription>
                        Customize your experience to make it more accessible
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Select value={fontSize} onValueChange={setFontSize}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select font size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium (Default)</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">High Contrast Mode</p>
                          <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                        </div>
                        <Switch 
                          checked={highContrast}
                          onCheckedChange={setHighContrast}
                        />
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="bg-quiz-primary hover:bg-quiz-primary-light"
                        disabled={isUpdatingAccessibility}
                      >
                        {isUpdatingAccessibility ? "Saving..." : "Save Accessibility Settings"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
