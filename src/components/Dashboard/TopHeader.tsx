import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu as MenuIcon,
  Search,
  Bell,
  ListChecks,
  Settings,
  User,
  LogOut,
  ShieldCheck,
  CreditCard,
  FileText
} from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-[60px] bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onToggleSidebar}>
            <MenuIcon className="h-6 w-6" />
          </Button>
        )}
        {/* Breadcrumbs - Placeholder for now, can be passed as props or use react-router context */}
        <nav className="text-sm hidden sm:block">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-muted-foreground hover:text-primary">Home</a>
            </li>
            <li className="flex items-center mx-2 text-muted-foreground">/</li>
            <li className="flex items-center">
              <a href="#" className="text-muted-foreground hover:text-primary">Admin</a>
            </li>
            <li className="flex items-center mx-2 text-muted-foreground">/</li>
            <li className="flex items-center">
              <span className="text-foreground">Dashboard</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 h-9 w-40 lg:w-64" />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </Button>
        <Button variant="ghost" size="icon">
          <ListChecks className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" /> Billing</DropdownMenuItem>
            <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> Projects</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default TopHeader;
