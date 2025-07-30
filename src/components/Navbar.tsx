"use client";

import { Menu, X } from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/app/stores/auth";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

const Navbar = () => {
  const { user, clearAuth } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav
      className={`w-full bg-black backdrop-blur border-b border-sky-100 shadow-sm sticky top-0 z-50 ${montserrat.className}`}
    >
      <div className="container mx-auto px-6 py-2 flex justify-between items-center"> {/* Reduced padding */}
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white">
          Event
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sky-700 font-medium">
        
          {user ? (
            <>
              <Link href="/write" className="text-white hover:text-sky-500 transition duration-300">
                Write
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={clearAuth}
                aria-label="Logout"
                className="transition duration-300 hover:bg-red-700"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" aria-label="Sign in">
                <Button variant="outline" size="sm" className="transition duration-300 hover:text-sky-700">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up" aria-label="Sign up">
                <Button variant="outline" size="sm" className="transition duration-300 hover:text-sky-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-sky-800"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 pb-4 flex flex-col gap-4 text-sky-700 font-medium text-sm bg-white border-t border-sky-100 shadow-sm">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Home">
            Home
          </Link>
          {user ? (
            <>
              <Link href="/write" onClick={() => setMenuOpen(false)} aria-label="Write">
                Write
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  clearAuth();
                  setMenuOpen(false);
                }}
                aria-label="Logout"
                className="transition duration-300 hover:bg-red-700"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)} aria-label="Sign in">
                <Button variant="outline" size="sm" className="transition duration-300 hover:text-sky-700">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)} aria-label="Sign up">
                <Button variant="outline" size="sm" className="transition duration-300 hover:text-sky-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
