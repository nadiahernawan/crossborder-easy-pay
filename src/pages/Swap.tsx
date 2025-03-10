
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SwapCard from '@/components/SwapCard';
import Layout from '@/components/Layout';

const Swap = () => {
  const [showHistory, setShowHistory] = useState(false);
  
  // Mock data
  const currencies = [
    { code: 'USD', name: 'US Dollar', rate: 0.005 },
    { code: 'EUR', name: 'Euro', rate: 0.0045 },
    { code: 'GBP', name: 'British Pound', rate: 0.004 },
    { code: 'JPY', name: 'Japanese Yen', rate: 0.7 },
  ];
  
  const swapHistory = [
    { 
      id: '1',
      fromCurrency: 'ETN', 
      toCurrency: 'USD', 
      fromAmount: 50, 
      toAmount: 0.25, 
      date: '2023-07-01T14:23:00',
      fee: 0.3
    },
    { 
      id: '2',
      fromCurrency: 'USD', 
      toCurrency: 'ETN', 
      fromAmount: 1, 
      toAmount: 200, 
      date: '2023-06-28T09:45:00',
      fee: 0.6
    },
    { 
      id: '3',
      fromCurrency: 'ETN', 
      toCurrency: 'EUR', 
      fromAmount: 100, 
      toAmount: 0.45, 
      date: '2023-06-25T16:30:00',
      fee: 0.6
    }
  ];

  return (
    <Layout>
      <div className="container px-4 pt-8 pb-20">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-semibold">Swap Currencies</h1>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  Back to Swap
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" />
                  History
                </>
              )}
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Convert between ETN and other currencies at competitive rates
          </p>
        </motion.div>

        {!showHistory ? (
          <SwapCard currencies={currencies} />
        ) : (
          <motion.div
            className="glass-card rounded-2xl p-6 max-w-md w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-display font-semibold mb-4">Swap History</h3>
            <div className="space-y-4">
              {swapHistory.map((swap, index) => (
                <motion.div 
                  key={swap.id}
                  className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">
                      {swap.fromAmount} {swap.fromCurrency} <ArrowRight className="inline h-3 w-3" /> {swap.toAmount} {swap.toCurrency}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(swap.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Fee: {swap.fee} ETN</span>
                    <span>Rate: {(swap.toAmount / swap.fromAmount).toFixed(4)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Swap;
