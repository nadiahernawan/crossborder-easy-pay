
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecretPhraseGrid from '@/components/SecretPhraseGrid';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');
  
  const handleLogin = (phrase: string[]) => {
    console.log('Login with phrase:', phrase);
    navigate('/home');
  };
  
  const handleSignup = (phrase: string[]) => {
    console.log('Signup with phrase:', phrase);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-display font-bold text-etn mb-2">CrossBorderPay</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Simple blockchain-based payments with Electroneum (ETN)
        </p>
      </motion.div>
      
      <motion.div 
        className="w-full max-w-md mx-auto glass-card rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <SecretPhraseGrid 
              mode="verify" 
              onComplete={handleLogin} 
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SecretPhraseGrid 
              mode="create" 
              onComplete={handleSignup} 
            />
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>
          CrossBorderPay uses blockchain technology for secure, low-fee international payments.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
