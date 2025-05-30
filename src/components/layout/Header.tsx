import React from 'react';
import TopHeader from '../Dashboard/TopHeader'; // Using the provided TopHeader component
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar, className }) => {
  // The TopHeader component (from context code at src/components/Dashboard/TopHeader.tsx)
  // already implements the necessary fixed positioning, height, background, and responsive left margin (md:left-64).
  // This Header layout component primarily acts as a pass-through or a place for additional layout-specific logic if needed.
  return (
    <TopHeader onToggleSidebar={onToggleMobileSidebar} />
    // If TopHeader couldn't take className, we'd wrap it: 
    // <div className={cn(className)}> <TopHeader onToggleSidebar={onToggleMobileSidebar} /> </div>
    // But TopHeader itself is 'fixed', so className on this wrapper wouldn't affect TopHeader's fixed properties directly.
    // The existing TopHeader styling 'fixed top-0 left-0 md:left-64 right-0 h-[60px] ... z-10' is what we need.
  );
};

export default Header;
