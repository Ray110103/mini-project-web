"use client"
import { Menu, X, Moon } from "lucide-react"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import { useState, useCallback } from "react"
import { Button } from "./ui/button"
import { useAuthStore } from "@/app/stores/auth"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] })

const Navbar = () => {
  const { user, clearAuth } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  return (
    <nav
      className={`w-full bg-black backdrop-blur border-b border-gray-800 shadow-sm sticky top-0 z-50 ${montserrat.className}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">EH</span>
          </div>
          <span className="text-xl font-bold text-white">
            Event<span className="text-orange-500">Hub</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark mode toggle */}
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Moon className="h-5 w-5" />
          </Button>

          {user ? (
            <>
              <Link href="/write" className="text-gray-400 hover:text-white transition duration-300">
                Write
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={clearAuth}
                aria-label="Logout"
                className="bg-red-600 hover:bg-red-700 text-white transition duration-300"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" aria-label="Sign in">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white transition duration-300">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up" aria-label="Sign up">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white transition duration-300">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-400 hover:text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 flex flex-col gap-4 bg-gray-900 border-t border-gray-800 shadow-sm">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            aria-label="Home"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                href="/write"
                onClick={() => setMenuOpen(false)}
                aria-label="Write"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Write
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  clearAuth()
                  setMenuOpen(false)
                }}
                aria-label="Logout"
                className="bg-red-600 hover:bg-red-700 text-white transition duration-300 w-fit"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)} aria-label="Sign in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white transition duration-300 w-fit"
                >
                  Login
                </Button>
              </Link>
              <Link href="/sign-up" onClick={() => setMenuOpen(false)} aria-label="Sign up">
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white transition duration-300 w-fit"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
