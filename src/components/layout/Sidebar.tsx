import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={cn("h-full", className)}>
      {/* SidebarNav component handles its own width, background, and content */}
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
