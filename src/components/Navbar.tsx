"use client"

import { Menu, X, LogIn, UserPlus, LogOut, Moon, Calendar, Info, Phone } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import AccountMenu from "./profile-dropdown"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathName = usePathname()
  const { data: session } = useSession()

  // Hide navbar on specific pages
  if (pathName === "/login" || pathName === "/register") {
    return null
  }

  if (pathName === "/dashboard" || pathName === "/dashboard") {
    return null
  }

  if (
    pathName === "/dashboard/events" ||
    pathName === "/dashboard/events/create"
  ) {
    return null
  }

  if (
    pathName === "/dashboard/transactions" ||
    pathName === "/dashboard/transactions/manual"
  ) {
    return null
  }

  if (
    pathName === "/dashboard/tickets" ||
    pathName === "/dashboard/tickets/create"
  ) {
    return null
  }

  if (
    pathName === "/dashboard/voucher" ||
    pathName === "/dashboard/voucher/create"
  ) {
    return null
  }

  if (
    pathName === "/dashboard/settings" ||
    pathName === "/dashboard/settings/bank-details" ||
    pathName === "/dashboard/settings/change-password"
  ) {
    return null
  }

  return (
    <header className="sticky top-0 right-0 left-0 z-50 bg-black text-white border-b border-gray-800 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">EH</span>
          </div>
          <span className="text-2xl font-bold text-white">
            Event<span className="text-orange-500">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/events" 
              className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors font-medium group"
            >
              <Calendar className="h-4 w-4 group-hover:text-orange-500 transition-colors" />
              Events
            </Link>
            <Link 
              href="/about" 
              className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors font-medium group"
            >
              <Info className="h-4 w-4 group-hover:text-orange-500 transition-colors" />
              About
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors font-medium group"
            >
              <Phone className="h-4 w-4 group-hover:text-orange-500 transition-colors" />
              Contact
            </Link>
          </nav>


          {/* Auth Section */}
          {session ? (
            <div className="flex items-center gap-4">
              <AccountMenu email={session.user?.email} points={0} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-600 hover:border-gray-500 transition-colors"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
                asChild
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            {/* User Info */}
            <div className="pb-4 border-b border-gray-700">
              <p className="text-sm font-medium text-white">EventHub Menu</p>
              <p className="text-xs text-gray-400 mt-1">
                {session ? session.user?.email : "Not logged in"}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Events
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Info className="h-4 w-4" />
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4" />
                Contact
              </Link>
            </div>

            {/* Theme Toggle Mobile */}
            <div className="pt-2 border-t border-gray-700">
              <button className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors w-full">
                <Moon className="h-4 w-4" />
                Dark Mode
              </button>
            </div>

            {/* Auth Section */}
            <div className="pt-4 border-t border-gray-700 space-y-2">
              {!session ? (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors border border-gray-600"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium shadow-lg"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      signOut({ callbackUrl: "/" })
                    }}
                    className="flex w-full items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
