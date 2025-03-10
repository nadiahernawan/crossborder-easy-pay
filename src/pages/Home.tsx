
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Bell, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionItem from '@/components/TransactionItem';
import Layout from '@/components/Layout';
import SendReceiveModal from '@/components/SendReceiveModal';

const Home = () => {
  const [sendReceiveModalOpen, setSendReceiveModalOpen] = useState(false);
  
  // Mock data
  const balance = 231.45;
  const transactions = [
    {
      type: 'receive',
      amount: 24.5,
      date: 'Today, 10:23 AM',
      sender: '0x7F42a78904f87ad658f1Ed3099cB3E9858cb6b1c',
      status: 'completed',
      txId: 'f7a12c8e9b3d4a5c8b7a1c2d3e4f5a6b'
    },
    {
      type: 'send',
      amount: 12.25,
      date: 'Yesterday, 3:45 PM',
      recipient: '0x1F92a38a04f17ad651f1Ed3099cB3E9858cb453d',
      status: 'completed',
      txId: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'
    },
    {
      type: 'send',
      amount: 5.0,
      date: '2 days ago, 11:30 AM',
      recipient: '0x3E92a38a04f17ad651f1Ed3099cB3E9858cb6b1c',
      status: 'pending',
      txId: 'e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6'
    },
    {
      type: 'receive',
      amount: 50.0,
      date: '3 days ago, 9:15 AM',
      sender: '0x9F42a45604f87ad658f1Ed3099cB3E9858cb6b1c',
      status: 'completed',
      txId: 'c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6'
    }
  ];

  const notifications = [
    { id: 1, message: 'New update available for CrossBorderPay', unread: true },
    { id: 2, message: 'Your transfer of 24.5 ETN has been confirmed', unread: false }
  ];

  const openSendReceiveModal = () => {
    setSendReceiveModalOpen(true);
  };

  const closeSendReceiveModal = () => {
    setSendReceiveModalOpen(false);
  };

  return (
    <Layout>
      <div className="container px-4 pt-8 pb-20">
        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardDescription>Your Balance</CardDescription>
              <CardTitle className="text-4xl font-display">
                {balance} <span className="text-etn">ETN</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mt-4">
                <Button 
                  className="flex-1 mr-2 bg-etn hover:bg-etn-dark"
                  onClick={openSendReceiveModal}
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button 
                  className="flex-1 ml-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800"
                  onClick={openSendReceiveModal}
                >
                  <ArrowDownLeft className="mr-2 h-4 w-4" />
                  Receive
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col">
              <WalletCards className="h-5 w-5 mb-1" />
              <span className="text-xs">View Card</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Bell className="h-5 w-5 mb-1" />
              <span className="text-xs">Alerts</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <ArrowUpRight className="h-5 w-5 mb-1" />
              <span className="text-xs">Send Max</span>
            </Button>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display font-semibold">Recent Transactions</h2>
            <Button variant="link" className="text-etn p-0">
              View All
            </Button>
          </div>
          {transactions.map((transaction, index) => (
            <TransactionItem
              key={transaction.txId}
              type={transaction.type as 'send' | 'receive'}
              amount={transaction.amount}
              date={transaction.date}
              recipient={transaction.recipient}
              sender={transaction.sender}
              status={transaction.status as 'completed' | 'pending' | 'failed'}
              txId={transaction.txId}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Send & Receive Modal */}
      <SendReceiveModal 
        isOpen={sendReceiveModalOpen} 
        onClose={closeSendReceiveModal}
        currentBalance={balance}
      />
    </Layout>
  );
};

export default Home;
