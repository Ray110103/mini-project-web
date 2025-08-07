"use client";

import { type Icon } from "@tabler/icons-react";
import { 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import { ChevronDown } from 'lucide-react';

// Define the NavItem type
type NavItem = {
  title: string;
  url?: string;
  icon?: Icon;
  children?: NavItem[]; // Optional nested items for submenus
};

// Define the NavMain component's props to accept an array of NavItem
export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            item.children ? (
              <Collapsible key={item.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={child.url || "#"}>
                              {child.icon && <child.icon className="h-4 w-4" />}
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url || "#"}>
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
