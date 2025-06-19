import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Menu,
  Search,
  Bell,
  Grid3X3, // Using Grid3x3 for 'apps'
  Settings,
  User,
  LogOut,
  Moon, 
  Sun,
  Globe // For language
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, onToggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would also toggle a class on document.body or use a theme provider
    console.log(isDarkMode ? 'Switching to light mode' : 'Switching to dark mode');
  };

  return (
    <TooltipProvider>
      <header className={cn('h-16 bg-card text-card-foreground border-b border-border flex items-center justify-between px-6 sticky top-0 z-50', className)}>
        <div className="flex items-center">
          {onToggleSidebar && (
            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-4 lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <div className="relative w-full max-w-xs hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-10" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Language</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Grid3X3 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Applications</p></TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Notifications</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</p></TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 p-1 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=annaadame" alt="Anna Adame" />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                   <span className="text-sm font-medium text-foreground">Anna Adame</span>
                   <span className="text-xs text-muted-foreground">Founder</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default TopHeader;
