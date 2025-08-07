"use client";

import { NavMain } from "./nav-main";
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail
} from "@/components/ui/sidebar";
import { Home, Calendar, Users, Settings, BarChart3, FileText, Mail, Bell } from 'lucide-react';

// Sample navigation data
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
    children: [
      {
        title: "All Events",
        url: "/events",
      },
      {
        title: "Create Event",
        url: "/events/create",
      },
      {
        title: "Event Categories",
        url: "/events/categories",
      },
    ],
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    children: [
      {
        title: "All Users",
        url: "/users",
      },
      {
        title: "Admins",
        url: "/users/admins",
      },
      {
        title: "Attendees",
        url: "/users/attendees",
      },
    ],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    children: [
      {
        title: "Event Reports",
        url: "/reports/events",
      },
      {
        title: "User Reports",
        url: "/reports/users",
      },
      {
        title: "Financial Reports",
        url: "/reports/financial",
      },
    ],
  },
  {
    title: "Communications",
    url: "/communications",
    icon: Mail,
    children: [
      {
        title: "Email Templates",
        url: "/communications/templates",
      },
      {
        title: "Notifications",
        url: "/communications/notifications",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    children: [
      {
        title: "General",
        url: "/settings/general",
      },
      {
        title: "Security",
        url: "/settings/security",
      },
      {
        title: "Integrations",
        url: "/settings/integrations",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <span className="text-sm font-bold text-white">EH</span>
          </div>
          <span className="text-lg font-semibold">EventHub</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@eventhub.com</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}
