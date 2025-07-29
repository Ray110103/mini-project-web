"use client";

import { Menu, X } from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/app/stores/auth";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

const Navbar = () => {
  const { user, clearAuth } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    <nav className={`w-full bg-black backdrop-blur border-b border-sky-100 shadow-sm sticky top-0 z-50 ${montserrat.className}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className={`text-3xl font-bold text-white`}>
          Event
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sky-700 font-medium ">
          

          {user ? (
            <>
              <Link href="/write" className="transition-colors hover:text-blue text-white">Write</Link>
              <Button variant="destructive" size="sm" onClick={clearAuth}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" size="sm">Sign in</Button>
            </Link>

            
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-sky-800"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 pb-4 flex flex-col gap-4 text-sky-700 font-medium text-sm bg-white border-t border-sky-100 shadow-sm">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          
          {user ? (
            <>
              <Link href="/write" onClick={() => setMenuOpen(false)}>Write</Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  clearAuth();
                  setMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm">Sign in</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
