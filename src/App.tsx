
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Transactions from "./pages/Transactions";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Initialize QueryClient
const queryClient = new QueryClient();

// Add framer-motion for page transitions
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
