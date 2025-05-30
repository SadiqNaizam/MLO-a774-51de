import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Palette,
  Baseline,
  ComponentIcon, // Renamed from Component to avoid conflict with React.Component
  MousePointerSquare,
  BarChart3,
  FileText,
  AppWindow,
  Puzzle,
  Tag,
  Cpu,
  MemoryStick,
  HardDrive,
  ChevronDown,
  Hexagon // Placeholder for CoreUI Logo
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  isNew?: boolean;
  children?: NavItem[];
}

const navigationData: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '#',
    isActive: true,
    isNew: true,
  },
  {
    id: 'theme',
    label: 'Theme',
    icon: Palette,
    children: [
      { id: 'colors', label: 'Colors', icon: Palette, href: '#' },
      { id: 'typography', label: 'Typography', icon: Baseline, href: '#' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: ComponentIcon,
    children: [
      { id: 'base', label: 'Base', icon: ComponentIcon, href: '#' },
      { id: 'buttons', label: 'Buttons', icon: MousePointerSquare, href: '#' },
      { id: 'charts', label: 'Charts', icon: BarChart3, href: '#' },
    ],
  },
  {
    id: 'widgets',
    label: 'Widgets',
    icon: Puzzle,
    href: '#',
    isNew: true,
  },
  {
    id: 'extras',
    label: 'Extras',
    icon: FileText, // Using FileText as a generic 'Extras' icon
    children: [
      { id: 'pages', label: 'Pages', icon: FileText, href: '#' },
      { id: 'apps', label: 'Apps', icon: AppWindow, href: '#' },
    ],
  },
];

const systemUtilizationData = [
  {
    id: 'cpu',
    label: 'CPU USAGE',
    value: 75,
    details: '348 Processes. 1/4 Cores.',
    icon: Cpu,
    color: 'bg-primary',
  },
  {
    id: 'memory',
    label: 'MEMORY USAGE',
    value: 60,
    details: '11444MB/16384MB',
    icon: MemoryStick,
    color: 'bg-destructive',
  },
  {
    id: 'ssd',
    label: 'SSD 1 USAGE',
    value: 90,
    details: '2430GB/2560GB',
    icon: HardDrive,
    color: 'bg-accent',
  },
];

const SidebarNav: React.FC = () => {
  const renderNavItem = (item: NavItem, isSubItem: boolean = false) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <AccordionItem value={item.id} key={item.id} className="border-none">
          <AccordionTrigger
            className={cn(
              'flex items-center justify-between w-full px-3 py-2.5 text-sm hover:bg-sidebar-accent rounded-md',
              item.isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground',
              isSubItem ? 'pl-8' : 'pl-3'
            )}
          >
            <div className="flex items-center">
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.label}
              {item.isNew && <Badge variant="secondary" className="ml-auto bg-accent-green text-white text-xs px-1.5 py-0.5 rounded">NEW</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pl-4 border-l border-sidebar-border ml-[1.375rem]">
            <div className="flex flex-col space-y-1 mt-1">
              {item.children?.map((child) => renderNavItem(child, true))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <a
        key={item.id}
        href={item.href}
        className={cn(
          'flex items-center px-3 py-2.5 text-sm hover:bg-sidebar-accent rounded-md group',
          item.isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground',
          isSubItem ? 'pl-8' : 'pl-3'
        )}
      >
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        {item.label}
        {item.isNew && <Badge variant="secondary" className="ml-auto bg-accent-green text-white text-xs px-1.5 py-0.5 rounded">NEW</Badge>}
      </a>
    );
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-20">
      <div className="h-[60px] flex items-center justify-center px-4 border-b border-sidebar-border">
        <Hexagon className="h-8 w-8 text-primary" /> 
        <span className="ml-2 text-xl font-semibold text-sidebar-primary-foreground">COREUI</span>
      </div>
      <ScrollArea className="flex-1 p-2">
        <nav className="flex flex-col space-y-1">
          <Accordion type="multiple" className="w-full">
            {navigationData.map((item) => renderNavItem(item))}
          </Accordion>
          <div className="px-3 pt-4 pb-2 text-xs uppercase text-sidebar-foreground/70">Labels</div>
          {['Label danger', 'Label info', 'Label warning'].map((label, index) => (
            <a href="#" key={index} className="flex items-center px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md group">
              <Tag className={cn(
                'w-4 h-4 mr-3',
                label === 'Label danger' && 'text-destructive',
                label === 'Label info' && 'text-primary',
                label === 'Label warning' && 'text-accent'
              )} />
              {label}
            </a>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="text-xs uppercase text-sidebar-foreground/70">System Utilization</div>
        {systemUtilizationData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id}>
              <div className="flex justify-between items-center mb-0.5">
                <div className="flex items-center text-xs">
                    <Icon className="w-3.5 h-3.5 mr-1.5" /> 
                    <span>{item.label}</span>
                </div>
                <span className="text-xs text-sidebar-foreground/80">{item.value}%</span>
              </div>
              <Progress value={item.value} className={cn("h-1.5", item.color)} indicatorClassName={item.color} />
              <div className="text-xs text-sidebar-foreground/60 mt-0.5">{item.details}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarNav;
