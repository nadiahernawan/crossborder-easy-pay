
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SwapCardProps {
  currencies: { code: string; name: string; rate: number }[];
}

const SwapCard: React.FC<SwapCardProps> = ({ currencies }) => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('ETN');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRate = () => {
    if (fromCurrency === 'ETN' && toCurrency !== 'ETN') {
      const currency = currencies.find(c => c.code === toCurrency);
      return currency ? currency.rate : 0;
    } else if (fromCurrency !== 'ETN' && toCurrency === 'ETN') {
      const currency = currencies.find(c => c.code === fromCurrency);
      return currency ? 1 / currency.rate : 0;
    } else {
      const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
      const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
      return toRate / fromRate;
    }
  };

  const getConvertedAmount = () => {
    return (amount * getRate()).toFixed(4);
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleRefreshRates = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <motion.div 
      className="glass-card rounded-2xl p-6 max-w-md w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-semibold">Swap Currencies</h3>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleRefreshRates}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            From
          </label>
          <div className="flex space-x-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="flex-grow"
            />
            <select 
              className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="ETN">ETN</option>
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleSwapCurrencies}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            To
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={getConvertedAmount()}
              readOnly
              className="flex-grow bg-muted"
            />
            <select
              className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="ETN">ETN</option>
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Exchange Rate</span>
            <span>1 {fromCurrency} = {getRate().toFixed(4)} {toCurrency}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="flex items-center">
              Fee
              <Popover>
                <PopoverTrigger>
                  <Info className="h-3 w-3 ml-1 text-gray-400" />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="text-sm">
                    <p className="font-medium">Fee Breakdown</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex justify-between">
                        <span>Network Fee:</span>
                        <span>0.1%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Service Fee:</span>
                        <span>0.5%</span>
                      </li>
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </span>
            <span>0.6%</span>
          </div>
          
          <Button className="w-full etn-gradient">
            Swap Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SwapCard;
