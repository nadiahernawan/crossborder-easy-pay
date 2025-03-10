
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode, 
  Copy, 
  Check,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface SendReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
}

const SendReceiveModal: React.FC<SendReceiveModalProps> = ({ 
  isOpen, 
  onClose,
  currentBalance 
}) => {
  const [activeTab, setActiveTab] = useState<string>('send');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [sendAmount, setSendAmount] = useState<string>('');
  const [requestAmount, setRequestAmount] = useState<string>('');
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Mock data
  const myWalletAddress = '0x8F12a90C04f87ad658f1Ed3099cB3E9858cb6b1c';
  const fiatRate = 0.0043; // 1 ETN = $0.0043 USD
  const txFee = 0.001; // 0.001 ETN fee
  
  const pastReceivedTransactions = [
    { 
      amount: 24.5, 
      from: '0x7F42a78904f87ad658f1Ed3099cB3E9858cb6b1c', 
      date: 'Today, 10:23 AM' 
    },
    { 
      amount: 50.0, 
      from: '0x9F42a45604f87ad658f1Ed3099cB3E9858cb6b1c', 
      date: '3 days ago, 9:15 AM' 
    }
  ];

  const handleSendReview = () => {
    if (!recipientAddress || !sendAmount) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const amountNum = parseFloat(sendAmount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    if (amountNum + txFee > currentBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough ETN for this transaction.",
        variant: "destructive",
      });
      return;
    }
    
    setReviewMode(true);
  };

  const handleSendConfirm = () => {
    // Simulate transaction processing
    setTimeout(() => {
      toast({
        title: "Transaction successful",
        description: `You've sent ${sendAmount} ETN to ${recipientAddress.substring(0, 8)}...${recipientAddress.substring(recipientAddress.length - 4)}`,
      });
      
      // Reset form and close modal
      setRecipientAddress('');
      setSendAmount('');
      setReviewMode(false);
      onClose();
    }, 1500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(myWalletAddress);
    setCopied(true);
    
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 3000);
  };

  const handleScanQR = () => {
    toast({
      title: "QR Scanner",
      description: "QR code scanner would open here",
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setReviewMode(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <Card className="border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-display">
                {activeTab === 'send' 
                  ? (reviewMode ? 'Review Transaction' : 'Send ETN') 
                  : 'Receive ETN'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'send' 
                  ? (reviewMode ? 'Verify details before sending' : 'Send ETN to another wallet') 
                  : 'Receive ETN to your wallet'}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {!reviewMode && (
              <Tabs 
                defaultValue="send" 
                value={activeTab} 
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="send">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Send
                  </TabsTrigger>
                  <TabsTrigger value="receive">
                    <ArrowDownLeft className="mr-2 h-4 w-4" />
                    Receive
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="send">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="recipient" 
                          placeholder="Enter wallet address"
                          value={recipientAddress}
                          onChange={(e) => setRecipientAddress(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleScanQR}
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (ETN)</Label>
                      <Input 
                        id="amount" 
                        type="number"
                        min="0.001"
                        step="0.001"
                        placeholder="0.00"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                      />
                      {sendAmount && !isNaN(parseFloat(sendAmount)) && (
                        <p className="text-sm text-gray-500">
                          ≈ ${(parseFloat(sendAmount) * fiatRate).toFixed(2)} USD
                        </p>
                      )}
                    </div>
                    
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 text-sm">
                      <div className="flex justify-between">
                        <span>Transaction Fee:</span>
                        <span>{txFee} ETN</span>
                      </div>
                      {sendAmount && !isNaN(parseFloat(sendAmount)) && (
                        <div className="flex justify-between mt-1 font-medium">
                          <span>Total Amount:</span>
                          <span>{(parseFloat(sendAmount) + txFee).toFixed(3)} ETN</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-etn hover:bg-etn-dark"
                      onClick={handleSendReview}
                    >
                      Review & Confirm
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="receive">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Your Wallet Address</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          value={myWalletAddress} 
                          readOnly
                          className="flex-1 font-mono text-xs"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleCopyAddress}
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-white p-4 rounded-lg">
                        {/* This would be a real QR code in production */}
                        <div className="h-48 w-48 bg-gray-800 rounded-md flex items-center justify-center">
                          <QrCode className="h-24 w-24 text-white" />
                        </div>
                      </div>
                      <p className="text-sm text-center mt-2 text-gray-500">
                        Scan to send ETN to this wallet
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="requestAmount">Request Specific Amount (Optional)</Label>
                      <Input 
                        id="requestAmount" 
                        type="number"
                        min="0.001"
                        step="0.001"
                        placeholder="0.00"
                        value={requestAmount}
                        onChange={(e) => setRequestAmount(e.target.value)}
                      />
                      {requestAmount && !isNaN(parseFloat(requestAmount)) && (
                        <p className="text-sm text-gray-500">
                          ≈ ${(parseFloat(requestAmount) * fiatRate).toFixed(2)} USD
                        </p>
                      )}
                    </div>
                    
                    {pastReceivedTransactions.length > 0 && (
                      <div className="space-y-2">
                        <Label>Recent Received Transactions</Label>
                        <div className="space-y-2">
                          {pastReceivedTransactions.map((tx, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm">
                              <div>
                                <p className="font-medium">{tx.amount} ETN</p>
                                <p className="text-xs text-gray-500">From: {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}</p>
                              </div>
                              <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
            
            {/* Review Mode */}
            {reviewMode && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Sending:</span>
                      <span className="font-semibold">{sendAmount} ETN</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">To:</span>
                      <span className="font-mono">{recipientAddress.substring(0, 8)}...{recipientAddress.substring(recipientAddress.length - 4)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Fee:</span>
                      <span>{txFee} ETN</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{(parseFloat(sendAmount) + txFee).toFixed(3)} ETN</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setReviewMode(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-etn hover:bg-etn-dark"
                    onClick={handleSendConfirm}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Confirm
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SendReceiveModal;
