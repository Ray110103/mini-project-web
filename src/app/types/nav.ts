import { TypeIcon as type, LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  children?: NavItem[];
};
