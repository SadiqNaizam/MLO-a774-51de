import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  title?: string; // Example, could be used by Header or page content
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, title }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 
        Layout Requirements overall definition: "grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
        This is achieved by using fixed-positioned Sidebar and Header, 
        and then adjusting the main content area with margins.
      */}
      
      <Sidebar isMobileSidebarOpen={isMobileSidebarOpen} />
      
      <Header onToggleMobileSidebar={toggleMobileSidebar} />

      {/* Overlay for mobile when sidebar is open */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <main 
        className={cn(
          'transition-all duration-300 ease-in-out',
          'mt-[60px]', // For the fixed header height
          'md:ml-64', // For the fixed sidebar width on desktop
          'p-6' // Padding for main content area as per Layout Requirements
        )}
      >
        <div className="flex flex-col gap-6">
          {/* Example: if title is provided, display it */} 
          {/* {title && <h1 className="text-2xl font-semibold">{title}</h1>} */} 
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
