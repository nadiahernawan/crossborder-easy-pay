
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode, 
  Copy, 
  Check,
  X,
  Share2,
  Scan,
  RefreshCw,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [recipientMethod, setRecipientMethod] = useState<'manual' | 'scan'>('manual');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [sendAmount, setSendAmount] = useState<string>('');
  const [requestAmount, setRequestAmount] = useState<string>('');
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  
  // Mock data
  const myWalletAddress = '0x8F12a90C04f87ad658f1Ed3099cB3E9858cb6b1c';
  const fiatRate = 0.0043; // 1 ETN = $0.0043 USD
  const txFee = 0.001; // 0.001 ETN fee
  
  const pastReceivedTransactions = [
    { 
      amount: 24.5, 
      from: '0x7F42a78904f87ad658f1Ed3099cB3E9858cb6b1c', 
      date: 'Today, 10:23 AM',
      status: 'completed'
    },
    { 
      amount: 50.0, 
      from: '0x9F42a45604f87ad658f1Ed3099cB3E9858cb6b1c', 
      date: '3 days ago, 9:15 AM',
      status: 'completed'
    },
    { 
      amount: 12.75, 
      from: '0x5E23b67904f87ad658f1Ed3099cB3E9858cb6b1c', 
      date: '5 days ago, 2:45 PM',
      status: 'pending'
    }
  ];

  // Generate QR code with amount if specified
  const getQRValue = () => {
    if (requestAmount && !isNaN(parseFloat(requestAmount)) && parseFloat(requestAmount) > 0) {
      return `etn:${myWalletAddress}?amount=${requestAmount}`;
    }
    return `etn:${myWalletAddress}`;
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setTimeout(() => {
        setReviewMode(false);
        setShowSuccessDialog(false);
        setRecipientMethod('manual');
        setRecipientAddress('');
        setSendAmount('');
        setRequestAmount('');
        setIsProcessing(false);
      }, 300); // Delay to allow close animation
    }
  }, [isOpen]);

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
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessDialog(true);
      
      toast({
        title: "Transaction sent",
        description: `You've sent ${sendAmount} ETN to ${recipientAddress.substring(0, 8)}...${recipientAddress.substring(recipientAddress.length - 4)}`,
      });
    }, 2000);
  };

  const handleTransactionComplete = () => {
    // Reset form and close modal
    setRecipientAddress('');
    setSendAmount('');
    setReviewMode(false);
    setShowSuccessDialog(false);
    onClose();
  };

  const handleScanQR = () => {
    setRecipientMethod('scan');
    toast({
      title: "QR Scanner",
      description: "QR code scanner would open here on a real device",
    });
    
    // Simulate scanning a QR code after 2 seconds
    setTimeout(() => {
      setRecipientAddress('0x3F42a78904f87ad658f1Ed3099cB3E9858cb6b1c');
      setRecipientMethod('manual');
    }, 2000);
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

  const handleShareAddress = (method: string) => {
    setShareOpen(false);
    
    let shareText = `My ETN wallet address: ${myWalletAddress}`;
    if (requestAmount && !isNaN(parseFloat(requestAmount))) {
      shareText += ` - Please send ${requestAmount} ETN.`;
    }
    
    toast({
      title: "Share via " + method,
      description: `Sharing "${shareText}" would open ${method} app here`,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setReviewMode(false);
    setShowSuccessDialog(false);
  };

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
                disabled={isProcessing}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {!reviewMode && !showSuccessDialog && (
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
                    <AnimatePresence mode="wait">
                      <motion.div 
                        className="space-y-4"
                        key="send-form"
                        {...fadeIn}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="recipient">Recipient Address</Label>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-xs"
                              onClick={() => setRecipientMethod(recipientMethod === 'manual' ? 'scan' : 'manual')}
                            >
                              {recipientMethod === 'manual' ? 
                                <><Scan className="h-3 w-3 mr-1" /> Scan QR</> : 
                                <><ArrowRight className="h-3 w-3 mr-1" /> Manual Entry</>
                              }
                            </Button>
                          </div>
                          
                          {recipientMethod === 'manual' ? (
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
                          ) : (
                            <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <div className="animate-pulse flex flex-col items-center">
                                <Scan className="h-12 w-12 text-muted-foreground mb-3" />
                                <p className="text-sm text-center text-muted-foreground">
                                  Scanning for QR code...
                                </p>
                                <p className="text-xs mt-1 text-center text-muted-foreground">
                                  Please point your camera at a valid ETN QR code
                                </p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-4"
                                onClick={() => setRecipientMethod('manual')}
                              >
                                Cancel Scan
                              </Button>
                            </div>
                          )}
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
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Equivalent:</span>
                              <span className="font-medium">
                                ${(parseFloat(sendAmount) * fiatRate).toFixed(2)} USD
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 text-sm">
                          <div className="flex justify-between">
                            <span>Network Fee:</span>
                            <span>{txFee} ETN</span>
                          </div>
                          {sendAmount && !isNaN(parseFloat(sendAmount)) && (
                            <>
                              <div className="flex justify-between mt-1">
                                <span>Amount:</span>
                                <span>{parseFloat(sendAmount).toFixed(3)} ETN</span>
                              </div>
                              <div className="flex justify-between mt-1 pt-1 border-t border-gray-200 dark:border-gray-700 font-medium">
                                <span>Total:</span>
                                <span>{(parseFloat(sendAmount) + txFee).toFixed(3)} ETN</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="pt-2">
                          <Button 
                            className="w-full bg-etn hover:bg-etn-dark"
                            onClick={handleSendReview}
                            disabled={!recipientAddress || !sendAmount}
                          >
                            Review & Confirm
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                  
                  <TabsContent value="receive">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        className="space-y-6"
                        key="receive-form"
                        {...fadeIn}
                      >
                        <div className="space-y-2">
                          <Label>Your Wallet Address</Label>
                          <div className="relative">
                            <Input 
                              value={myWalletAddress} 
                              readOnly
                              className="pr-24 font-mono text-xs"
                            />
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={handleCopyAddress}
                              className="absolute right-1 top-1 h-8 px-3"
                            >
                              {copied ? (
                                <Check className="h-3 w-3 mr-1 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3 mr-1" />
                              )}
                              Copy
                            </Button>
                          </div>
                          <div className="flex justify-end mt-1">
                            <DropdownMenu open={shareOpen} onOpenChange={setShareOpen}>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs"
                                >
                                  <Share2 className="h-3 w-3 mr-2" />
                                  Share Address
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleShareAddress("WhatsApp")}>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  WhatsApp
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShareAddress("Email")}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShareAddress("Copy")}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Link
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="requestAmount">Request Specific Amount (Optional)</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="requestAmount" 
                              type="number"
                              min="0.001"
                              step="0.001"
                              placeholder="0.00"
                              value={requestAmount}
                              onChange={(e) => setRequestAmount(e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              variant="outline" 
                              size="icon"
                              title="Refresh QR code"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                          {requestAmount && !isNaN(parseFloat(requestAmount)) && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Equivalent:</span>
                              <span className="font-medium">
                                ${(parseFloat(requestAmount) * fiatRate).toFixed(2)} USD
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-center p-4">
                          <div className="bg-white p-4 rounded-lg mb-2">
                            {/* This would be a real QR code in production */}
                            <div className="h-52 w-52 bg-gray-800 rounded-md flex items-center justify-center">
                              <QrCode className="h-24 w-24 text-white" />
                            </div>
                          </div>
                          <p className="text-xs text-center mt-1 text-muted-foreground">
                            {requestAmount && !isNaN(parseFloat(requestAmount)) && parseFloat(requestAmount) > 0 
                              ? `QR code includes request for ${requestAmount} ETN`
                              : "Scan to send ETN to this wallet"}
                          </p>
                        </div>
                        
                        {pastReceivedTransactions.length > 0 && (
                          <div className="space-y-2">
                            <Label className="flex justify-between items-center">
                              <span>Recent Received Transactions</span>
                              <Button variant="link" className="text-xs p-0 h-auto text-etn">View All</Button>
                            </Label>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                              {pastReceivedTransactions.map((tx, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm">
                                  <div>
                                    <div className="flex items-center">
                                      <p className="font-medium">{tx.amount} ETN</p>
                                      {tx.status === 'pending' && (
                                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs">
                                          Pending
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      From: {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                                    </p>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                </Tabs>
              )}
              
              {/* Review Mode */}
              {reviewMode && !showSuccessDialog && (
                <AnimatePresence mode="wait">
                  <motion.div 
                    className="space-y-6"
                    key="review-mode"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sending:</span>
                          <span className="font-semibold">{sendAmount} ETN</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">To:</span>
                          <span className="font-mono">{recipientAddress.substring(0, 8)}...{recipientAddress.substring(recipientAddress.length - 4)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Network Fee:</span>
                          <span>{txFee} ETN</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">USD Equivalent:</span>
                          <span>${(parseFloat(sendAmount) * fiatRate).toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-medium">
                          <span>Total Amount:</span>
                          <span>{(parseFloat(sendAmount) + txFee).toFixed(3)} ETN</span>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-800 dark:text-yellow-300">
                        <p>Please verify all details carefully. Transactions cannot be reversed once confirmed.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setReviewMode(false)}
                        disabled={isProcessing}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        className="flex-1 bg-etn hover:bg-etn-dark"
                        onClick={handleSendConfirm}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Confirm & Send
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
              
              {/* Success Dialog */}
              {showSuccessDialog && (
                <AnimatePresence>
                  <motion.div 
                    className="text-center space-y-4"
                    key="success-dialog"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="inline-flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Transaction Complete!</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        You've successfully sent {sendAmount} ETN
                      </p>
                    </div>
                    
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recipient:</span>
                        <span className="font-mono">{recipientAddress.substring(0, 8)}...{recipientAddress.substring(recipientAddress.length - 4)}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">Amount:</span>
                        <span>{parseFloat(sendAmount).toFixed(3)} ETN</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">Fee:</span>
                        <span>{txFee} ETN</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">Total:</span>
                        <span>{(parseFloat(sendAmount) + txFee).toFixed(3)} ETN</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                        onClick={handleTransactionComplete}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Done
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SendReceiveModal;
