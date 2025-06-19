import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // Initialize isDesktop based on window.innerWidth, default to false for SSR or non-browser environments
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  const updateMedia = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('resize', updateMedia);
    // Call handler right away so state gets updated with initial window size
    updateMedia();
    
    return () => window.removeEventListener('resize', updateMedia);
  }, [updateMedia]);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  // Layout Requirements:
  // Overall: type: "Grid", definition: "grid-cols-[auto_1fr] grid-rows-[auto_1fr]"
  // Sidebar: w-64 (16rem), Header: h-16 (4rem)
  // On large screens (lg), the layout is a grid.
  // Sidebar occupies the first column ('auto' width, effectively w-64) and spans both rows.
  // Header occupies the second column, first row ('auto' height, effectively h-16).
  // Main content occupies the second column, second row (1fr height and 1fr width).
  // On smaller screens, layout is a flex column (Header, Main Content), and Sidebar is a drawer.

  return (
    <div 
      className={cn(
        "h-screen overflow-hidden",
        "flex flex-col lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr]"
      )}
    >
      {/* Mobile Sidebar (Drawer) - Only rendered on non-desktop screens */} 
      {!isDesktop && (
        <>
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out",
              "w-64", // Sidebar width from requirements
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
            aria-modal="true"
            role="dialog"
          >
            <Sidebar />
          </div>
          {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={toggleMobileSidebar}
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* Desktop Sidebar (Grid Item) - Only rendered and part of grid on desktop screens */} 
      <div
        className={cn(
          "hidden lg:block row-span-2 col-start-1",
          "w-64" // Explicit width for the 'auto' grid column sizing
        )}
      >
        <Sidebar />
      </div>
      
      {/* Header - Positioned by flex on mobile, by grid on desktop */} 
      <div 
        className={cn(
          "lg:col-start-2 lg:row-start-1",
          "h-16" // Explicit height for the 'auto' grid row sizing
        )}
      >
        <Header onToggleSidebar={toggleMobileSidebar} />
      </div>

      {/* Main Content Area - Positioned by flex on mobile, by grid on desktop */} 
      <main
        className={cn(
          "flex-1 lg:flex-none", // On mobile, flex-1 to fill space. On desktop, grid cell sizes it.
          "lg:col-start-2 lg:row-start-2",
          "overflow-y-auto p-6 bg-background"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
