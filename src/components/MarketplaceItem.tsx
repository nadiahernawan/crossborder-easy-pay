
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MarketplaceItemProps {
  title: string;
  description: string;
  price: number;
  image: string;
  seller: {
    name: string;
    verified: boolean;
    rating: number;
  };
  category: string;
  index: number;
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({
  title,
  description,
  price,
  image,
  seller,
  category,
  index
}) => {
  return (
    <motion.div 
      className="glass-card card-hover overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        <Badge className="absolute top-3 left-3 bg-white/80 dark:bg-black/60 text-foreground">
          {category}
        </Badge>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-medium text-lg line-clamp-1">{title}</h3>
          <Badge variant="outline" className="etn-gradient">
            {price} ETN
          </Badge>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 h-10 mb-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <span className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {seller.rating}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              {seller.name}
              {seller.verified && (
                <Badge className="ml-1 h-4 px-1 bg-blue-500 text-white text-xs">✓</Badge>
              )}
            </span>
          </div>
          
          <button className="text-xs flex items-center text-etn hover:text-etn-dark transition-colors">
            <ShoppingCart className="h-3 w-3 mr-1" />
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketplaceItem;
