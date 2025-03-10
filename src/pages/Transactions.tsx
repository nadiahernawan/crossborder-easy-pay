
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Upload, Download, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import TransactionItem from '@/components/TransactionItem';
import Layout from '@/components/Layout';

const Transactions = () => {
  const [tab, setTab] = useState('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
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
    },
    {
      type: 'send',
      amount: 8.75,
      date: '5 days ago, 2:20 PM',
      recipient: '0x5A92a38a04f17ad651f1Ed3099cB3E9858cb6b1c',
      status: 'failed',
      txId: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6'
    }
  ];
  
  const documents = [
    {
      id: '1',
      name: 'Invoice_July2023.pdf',
      type: 'invoice',
      uploadDate: '2023-07-05T14:30:00',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Receipt_00123.pdf',
      type: 'receipt',
      uploadDate: '2023-06-28T09:15:00',
      status: 'pending'
    },
    {
      id: '3',
      name: 'ID_Verification.jpg',
      type: 'identification',
      uploadDate: '2023-06-10T16:45:00',
      status: 'rejected'
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.txId.includes(searchQuery) || 
    (tx.type === 'send' && tx.recipient?.includes(searchQuery)) ||
    (tx.type === 'receive' && tx.sender?.includes(searchQuery))
  );
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container px-4 pt-8 pb-20">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-display font-semibold">Transactions & Documents</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            View and manage your transaction history and documents
          </p>
        </motion.div>

        <Tabs defaultValue="transactions" value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <div className="mb-6 flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={tab === 'transactions' ? 'Search by ID or address...' : 'Search documents...'}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <TabsContent value="transactions" className="mt-0">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
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
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No transactions found</p>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">My Documents</h3>
                <Button size="sm" className="etn-gradient">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              
              {filteredDocuments.length > 0 ? (
                <div className="space-y-3">
                  {filteredDocuments.map((doc, index) => (
                    <motion.div 
                      key={doc.id}
                      className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`flex items-center gap-1 ${
                            doc.status === 'verified' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : doc.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {getStatusIcon(doc.status)}
                          <span className="capitalize">{doc.status}</span>
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No documents found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Transactions;
