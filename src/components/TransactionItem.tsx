
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';

interface TransactionItemProps {
  type: 'send' | 'receive';
  amount: number;
  date: string;
  recipient?: string;
  sender?: string;
  status: 'completed' | 'pending' | 'failed';
  txId: string;
  index: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  amount,
  date,
  recipient,
  sender,
  status,
  txId,
  index
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <motion.div 
      className="glass-card card-hover rounded-xl p-4 mb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${
            type === 'send' 
              ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
              : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {type === 'send' ? (
              <ArrowUpRight className="h-5 w-5" />
            ) : (
              <ArrowDownLeft className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-base">
              {type === 'send' ? 'Sent ETN' : 'Received ETN'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {type === 'send' 
                ? `To: ${recipient?.substring(0, 8)}...${recipient?.substring(recipient.length - 4)}` 
                : `From: ${sender?.substring(0, 8)}...${sender?.substring(sender.length - 4)}`
              }
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className={`font-semibold ${
            type === 'send' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
          }`}>
            {type === 'send' ? '-' : '+'}{amount} ETN
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        
        <a 
          href={`https://blockexplorer.electroneum.com/tx/${txId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs flex items-center text-gray-500 hover:text-etn transition-colors"
        >
          <span className="mr-1">View</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
};

export default TransactionItem;
