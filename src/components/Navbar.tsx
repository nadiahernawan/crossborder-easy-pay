
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeftRight, FileText, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/swap', label: 'Swap', icon: ArrowLeftRight },
    { path: '/transactions', label: 'Transactions', icon: FileText },
    { path: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed bottom-0 w-full border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-10 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="text-xl font-display font-semibold text-etn">
                CrossBorderPay
              </Link>
            </div>
            
            <div className="flex justify-around w-full md:w-auto md:justify-end md:space-x-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex flex-col md:flex-row items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.path) 
                      ? 'text-etn' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-etn dark:hover:text-etn'
                  }`}
                >
                  <item.icon className="h-5 w-5 md:mr-1" />
                  <span className="text-xs md:text-sm mt-1 md:mt-0">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div 
                      className="absolute bottom-0 md:bottom-auto md:top-0 left-0 right-0 h-0.5 md:h-1 bg-etn rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            
            <div className="hidden md:block">
              <div className="ml-4 flex items-center">
                <span className="bg-etn text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                  <span className="mr-1">•</span> 45 ETN
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
