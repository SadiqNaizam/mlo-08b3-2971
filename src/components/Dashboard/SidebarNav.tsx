import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Analytics, ShoppingCart, Wallet, FileText, Briefcase,
  Users, MessageSquare, Settings, LogOut, ChevronDown, CircleHelp,
  Puzzle, ShieldCheck, Gift
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
  children?: NavItem[];
}

const navigationData: NavItem[] = [
  { id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard, path: '#', children: [
      { id: 'analytics', label: 'Analytics', icon: Analytics, path: '/analytics' },
      { id: 'crm', label: 'CRM', icon: Users, path: '/crm' },
      { id: 'ecommerce', label: 'Ecommerce', icon: ShoppingCart, path: '/ecommerce' },
    ]
  },
  { id: 'crypto', label: 'Crypto', icon: Wallet, path: '/crypto', badge: 'Active' }, // Assuming 'Active' to match current page logic
  { id: 'projects', label: 'Projects', icon: Briefcase, path: '/projects' },
  { id: 'nft', label: 'NFT', icon: Puzzle, path: '/nft', badge: 'New' },
  { id: 'job', label: 'Job', icon: Briefcase, path: '/job' },
  { id: 'blog', label: 'Blog', icon: FileText, path: '/blog' },
  { id: 'apps', label: 'Apps', icon: LayoutGrid, path: '#', children: [
      { id: 'calendar', label: 'Calendar', icon: MessageSquare, path: '/apps/calendar' },
      { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/apps/chat' },
    ]
  },
];

const bottomNavigationData: NavItem[] = [
  { id: 'support', label: 'Support', icon: CircleHelp, path: '/support' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

interface SidebarNavItemProps {
  item: NavItem;
  activePath: string;
  onNavigate: (path: string) => void;
  isSubItem?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, activePath, onNavigate, isSubItem = false }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(activePath.startsWith(item.path) && item.path !== '#');

  const isActive = activePath === item.path || (item.children && item.children.some(child => activePath === child.path));
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      onNavigate(item.path);
    }
  };

  return (
    <li className={cn(isSubItem ? 'pl-4' : '')}>
      <a
        href={item.path} // Using href for semantic correctness, actual navigation handled by onNavigate
        onClick={(e) => { e.preventDefault(); handleClick(); }}
        className={cn(
          'flex items-center justify-between p-3 rounded-md text-sm font-medium',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/80',
          isSubItem ? 'py-2' : 'py-2.5'
        )}
      >
        <div className="flex items-center">
          <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
          <span>{item.label}</span>
        </div>
        {item.badge && (
          <Badge variant={isActive ? 'default' : 'secondary'} className={cn(isActive ? 'bg-white text-sidebar-primary' : 'bg-sidebar-accent text-sidebar-accent-foreground', 'ml-auto')}>
            {item.badge}
          </Badge>
        )}
        {hasChildren && (
          <ChevronDown className={cn('w-4 h-4 ml-2 transform transition-transform', isOpen ? 'rotate-180' : '')} />
        )}
      </a>
      {hasChildren && isOpen && (
        <ul className="mt-1 space-y-1">
          {item.children?.map(child => (
            <SidebarNavItem key={child.id} item={child} activePath={activePath} onNavigate={onNavigate} isSubItem />
          ))}
        </ul>
      )}
    </li>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activePath, setActivePath] = React.useState<string>('/crypto'); // Default active path

  const handleNavigate = (path: string) => {
    setActivePath(path);
    // In a real app, you'd use react-router or similar for navigation
    console.log(`Navigating to ${path}`);
  };

  return (
    <div className={cn('h-full w-64 bg-sidebar-DEFAULT text-sidebar-foreground flex flex-col', className)}>
      <div className="p-4 flex items-center border-b border-sidebar-border">
        <Gift className="h-8 w-8 text-sidebar-primary mr-2" />
        <h1 className="text-2xl font-bold text-sidebar-foreground">VELZON</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <span className="px-3 text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">Menu</span>
        <ul className="space-y-1 mt-2">
          {navigationData.map(item => (
            <SidebarNavItem key={item.id} item={item} activePath={activePath} onNavigate={handleNavigate} />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <ul className="space-y-1">
          {bottomNavigationData.map(item => (
            <SidebarNavItem key={item.id} item={item} activePath={activePath} onNavigate={handleNavigate} />
          ))}
          <li key="logout">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); console.log('Logout'); }}
              className='flex items-center p-3 rounded-md text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            >
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
         <div className="mt-4 p-3 bg-sidebar-accent/30 rounded-md text-center">
          <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-sidebar-primary" />
          <p className="text-sm text-sidebar-foreground/90">Unlimited Access</p>
          <p className="text-xs text-sidebar-foreground/70 mb-2">Upgrade your plan to get unlimited access.</p>
          <Button variant="default" size="sm" className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
