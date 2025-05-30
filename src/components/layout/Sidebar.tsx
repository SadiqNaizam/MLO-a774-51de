import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav'; // Assuming SidebarNav is the content provider

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileSidebarOpen, className }) => {
  // NOTE: This Sidebar component is designed to be the fixed, animated shell.
  // The SidebarNav component (from context code at src/components/Dashboard/SidebarNav.tsx)
  // currently has its own 'fixed' positioning and width (w-64).
  // For this Sidebar shell to correctly manage SidebarNav as its content,
  // SidebarNav.tsx's root div styling would ideally be changed to fill its parent, e.g.:
  // className="flex flex-col h-full w-full overflow-y-auto bg-sidebar text-sidebar-foreground"
  // instead of "fixed top-0 left-0 h-screen w-64 ...".
  // If SidebarNav.tsx is used as-is, its fixed positioning might conflict or override this shell's intent.

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground',
        'flex flex-col z-40 transition-transform duration-300 ease-in-out',
        'md:translate-x-0',
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}
    >
      {/* SidebarNav would provide the actual navigation links, logo, system utils etc. */}
      {/* It should ideally fill this <aside> container. */}
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
