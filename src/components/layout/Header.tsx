import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader';

interface HeaderProps {
  className?: string;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, onToggleSidebar }) => {
  return (
    <header className={cn(className)}>
      {/* TopHeader component handles its own height, background, stickiness, and content */}
      <TopHeader onToggleSidebar={onToggleSidebar} />
    </header>
  );
};

export default Header;
