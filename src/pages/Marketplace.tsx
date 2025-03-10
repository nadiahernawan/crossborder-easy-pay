
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid3X3, ListFilter } from 'lucide-react';
import MarketplaceItem from '@/components/MarketplaceItem';
import Layout from '@/components/Layout';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Mock data
  const categories = ['All', 'Electronics', 'Clothing', 'Services', 'Digital Goods'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const products = [
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      description: 'High-quality noise cancelling headphones with 30-hour battery life',
      price: 120,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      seller: {
        name: 'AudioTech',
        verified: true,
        rating: 4.8
      },
      category: 'Electronics'
    },
    {
      id: '2',
      title: 'Digital Marketing Consultation',
      description: 'One-hour consultation session with a digital marketing expert',
      price: 50,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
      seller: {
        name: 'MarketPro',
        verified: true,
        rating: 4.9
      },
      category: 'Services'
    },
    {
      id: '3',
      title: 'Premium WordPress Theme',
      description: 'Responsive and customizable WordPress theme for business websites',
      price: 45,
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d',
      seller: {
        name: 'WebDesigns',
        verified: false,
        rating: 4.5
      },
      category: 'Digital Goods'
    },
    {
      id: '4',
      title: 'Designer Sunglasses',
      description: 'UV protected stylish sunglasses with polarized lenses',
      price: 75,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
      seller: {
        name: 'FashionHub',
        verified: true,
        rating: 4.6
      },
      category: 'Clothing'
    },
    {
      id: '5',
      title: 'Smartphone Stand & Charger',
      description: 'Wireless charging stand compatible with all modern smartphones',
      price: 35,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
      seller: {
        name: 'TechGadgets',
        verified: false,
        rating: 4.3
      },
      category: 'Electronics'
    },
    {
      id: '6',
      title: 'Language Learning Course',
      description: 'Complete Spanish language course with 50+ hours of content',
      price: 60,
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
      seller: {
        name: 'LanguagePro',
        verified: true,
        rating: 4.7
      },
      category: 'Digital Goods'
    }
  ];
  
  const filteredProducts = products.filter(product => 
    (activeCategory === 'All' || product.category === activeCategory) &&
    (product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     product.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <h1 className="text-2xl font-display font-semibold">Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Buy products and services with ETN
          </p>
        </motion.div>

        <div className="mb-6 flex space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search marketplace..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-x-auto pb-2 mb-6">
          <div className="flex space-x-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={activeCategory === category ? "bg-etn hover:bg-etn-dark" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        } gap-6`}>
          {filteredProducts.map((product, index) => (
            <MarketplaceItem
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              seller={product.seller}
              category={product.category}
              index={index}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p className="mb-2">No products found</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;
