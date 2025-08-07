"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Calendar, Users, Settings, BarChart3, FileText, Mail, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-zinc-800 text-white hover:bg-zinc-700"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <span className="text-sm font-bold text-white">EH</span>
          </div>
          <span className="text-lg font-semibold text-white">EventHub</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Events */}
            <li>
              <button
                onClick={() => toggleExpanded('Events')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    expandedItems.includes('Events') ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {expandedItems.includes('Events') && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/events"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      All Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/events/create"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Create Event
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/events/categories"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Event Categories
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Users */}
            <li>
              <button
                onClick={() => toggleExpanded('Users')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    expandedItems.includes('Users') ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {expandedItems.includes('Users') && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/users"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      All Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/users/admins"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Admins
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/users/attendees"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Attendees
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Analytics */}
            <li>
              <Link
                href="/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </li>

            {/* Reports */}
            <li>
              <button
                onClick={() => toggleExpanded('Reports')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span>Reports</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    expandedItems.includes('Reports') ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {expandedItems.includes('Reports') && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/reports/events"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Event Reports
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reports/users"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      User Reports
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reports/financial"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Financial Reports
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Communications */}
            <li>
              <button
                onClick={() => toggleExpanded('Communications')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>Communications</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    expandedItems.includes('Communications') ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {expandedItems.includes('Communications') && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/communications/templates"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Email Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/communications/notifications"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Notifications
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings */}
            <li>
              <button
                onClick={() => toggleExpanded('Settings')}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    expandedItems.includes('Settings') ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {expandedItems.includes('Settings') && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/settings/general"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      General
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/security"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/integrations"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Integrations
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="border-t border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@eventhub.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content spacer for desktop */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
}
