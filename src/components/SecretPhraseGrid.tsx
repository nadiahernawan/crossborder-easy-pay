
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecretPhraseGridProps {
  mode: 'create' | 'verify';
  onComplete: (phrase: string[]) => void;
}

const wordList = [
  'apple', 'banana', 'cherry', 'dog', 'elephant', 'fox',
  'grape', 'honey', 'ice', 'jaguar', 'kiwi', 'lemon',
  'mango', 'nut', 'orange', 'peach', 'quince', 'raspberry',
  'strawberry', 'tangerine', 'umbrella', 'vanilla', 'walnut', 'xylophone',
  'yacht', 'zebra', 'airplane', 'bridge', 'castle', 'diamond',
  'eagle', 'forest', 'garden', 'harbor', 'island', 'jungle'
];

const SecretPhraseGrid: React.FC<SecretPhraseGridProps> = ({ mode, onComplete }) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (mode === 'create') {
      generateRandomWords();
    }
  }, [mode]);

  const generateRandomWords = () => {
    const shuffled = [...wordList].sort(() => 0.5 - Math.random());
    setGeneratedWords(shuffled.slice(0, 12));
    setSelectedWords([]);
  };

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < 12 || mode === 'verify') {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleComplete = () => {
    if (selectedWords.length === 12) {
      onComplete(selectedWords);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <motion.h2 
          className="text-2xl font-display font-semibold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {mode === 'create' 
            ? 'Create Your Secret Phrase' 
            : 'Enter Your Secret Phrase'}
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {mode === 'create'
            ? 'Remember these 12 words to access your wallet'
            : 'Enter the 12 words in the correct order'}
        </motion.p>
      </div>

      {mode === 'create' && (
        <motion.div 
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsRevealed(!isRevealed)}
          >
            {isRevealed ? <Unlock size={16} /> : <Lock size={16} />}
            {isRevealed ? 'Hide Phrase' : 'Reveal Phrase'}
          </Button>
        </motion.div>
      )}
      
      <motion.div 
        className="secret-phrase-grid mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {mode === 'create' ? (
          // Display the generated words in a grid
          generatedWords.map((word, index) => (
            <motion.div
              key={`${word}-${index}`}
              className={`secret-phrase-item ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isRevealed ? 1 : 0,
                scale: isRevealed ? 1 : 0.8
              }}
              transition={{ delay: index * 0.05 + 0.5 }}
            >
              <span className="mr-2 opacity-50">{index + 1}.</span> {word}
            </motion.div>
          ))
        ) : (
          // Input fields for verification
          Array(12).fill(0).map((_, index) => (
            <motion.div
              key={index}
              className={`secret-phrase-item ${
                selectedWords[index] ? 'bg-accent/20 border-accent' : ''
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.5 }}
              onClick={() => {
                // For simplicity, we'll just add placeholder words
                // In a real app, this would show a dropdown or input
                if (!selectedWords[index]) {
                  const newWords = [...selectedWords];
                  newWords[index] = wordList[Math.floor(Math.random() * wordList.length)];
                  setSelectedWords(newWords);
                } else {
                  const newWords = [...selectedWords];
                  newWords[index] = '';
                  setSelectedWords(newWords);
                }
              }}
            >
              <span className="mr-2 opacity-50">{index + 1}.</span>
              {selectedWords[index] || '•••••'}
            </motion.div>
          ))
        )}
      </motion.div>

      <motion.div 
        className="flex justify-center space-x-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {mode === 'create' && (
          <Button 
            variant="outline" 
            onClick={generateRandomWords}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Generate New
          </Button>
        )}
        <Button 
          className="etn-gradient"
          onClick={handleComplete}
          disabled={mode === 'verify' && selectedWords.filter(Boolean).length !== 12}
        >
          {mode === 'create' ? 'I\'ve Saved My Phrase' : 'Verify Phrase'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default SecretPhraseGrid;
