
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  User, Shield, Globe, HelpCircle, FileText, ArrowRight, 
  LockKeyhole, AlertTriangle, ChevronDown, Languages, Smartphone, Moon
} from 'lucide-react';
import Layout from '@/components/Layout';

const Profile = () => {
  const [tab, setTab] = useState('account');
  
  // Mock user data
  const user = {
    id: '0x7F42a78904f87ad658f1Ed3099cB3E9858cb6b1c',
    username: 'user123',
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    joined: 'January 2023',
    twoFactorEnabled: true
  };

  return (
    <Layout>
      <div className="container px-4 pt-8 pb-20">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-display font-semibold">Profile & Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Manage your account, security, and preferences
          </p>
        </motion.div>

        <Tabs defaultValue="account" value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Globe className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
              <span className="hidden md:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="help">
              <HelpCircle className="h-4 w-4 mr-2 md:mr-0 md:hidden" />
              <span className="hidden md:inline">Help</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-0">
            <Card className="glass-card mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Account Information</CardTitle>
                <CardDescription>View and update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={user.username} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={user.phone} />
                </div>
                <div className="pt-2">
                  <Button className="etn-gradient">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Wallet Address</CardTitle>
                <CardDescription>Your blockchain identity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-secondary rounded-lg text-sm font-mono break-all">
                  {user.id}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Member since {user.joined}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <Card className="glass-card mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Secret Phrase</CardTitle>
                <CardDescription>Access and backup your wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 rounded-lg flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      Never share your secret phrase with anyone. Anyone with your secret phrase can access your wallet and funds.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Secret Phrase
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Enable 2FA</Label>
                    <p className="text-sm text-gray-500">
                      Protect your account with two-factor authentication
                    </p>
                  </div>
                  <Switch id="2fa" checked={user.twoFactorEnabled} />
                </div>
                
                <Separator className="my-4" />
                
                <Button variant="outline" className="w-full">
                  <LockKeyhole className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-0">
            <Card className="glass-card mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Language & Region</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <div className="relative">
                    <select 
                      id="language" 
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md appearance-none"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency Display</Label>
                  <div className="relative">
                    <select 
                      id="currency" 
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md appearance-none"
                    >
                      <option value="usd">USD (United States Dollar)</option>
                      <option value="eur">EUR (Euro)</option>
                      <option value="gbp">GBP (British Pound)</option>
                      <option value="jpy">JPY (Japanese Yen)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>App Settings</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      <Label htmlFor="notifications">Push Notifications</Label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Get notified about transactions and updates
                    </p>
                  </div>
                  <Switch id="notifications" checked={true} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Moon className="h-4 w-4 mr-2" />
                      <Label htmlFor="darkMode">Dark Mode</Label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Switch between light and dark theme
                    </p>
                  </div>
                  <Switch id="darkMode" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Languages className="h-4 w-4 mr-2" />
                      <Label htmlFor="advanced">Advanced Mode</Label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Show additional features and options
                    </p>
                  </div>
                  <Switch id="advanced" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="mt-0">
            <Card className="glass-card mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Help Center</CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {['How to send ETN', 'How to receive ETN', 'Security best practices', 'Transaction fees explained'].map((topic, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-between"
                    >
                      {topic}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Button className="w-full">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle>Legal Information</CardTitle>
                <CardDescription>Terms, privacy, and licenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Terms of Service', 'Privacy Policy', 'Licenses'].map((doc, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="w-full justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {doc}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>CrossBorderPay v1.0.0</p>
                  <p className="mt-1">© 2023 All rights reserved</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
