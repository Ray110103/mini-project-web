"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-16">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">EH</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Event<span className="text-orange-500">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Create, manage, and discover amazing events. EventHub is your all-in-one platform for bringing people together through memorable experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>hello@eventhub.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              {[
                { name: "Overview", href: "/overview" },
                { name: "Features", href: "/features" },
                { name: "Solutions", href: "/solutions" },
                { name: "Tutorials", href: "/tutorials" },
                { name: "Pricing", href: "/pricing" },
                { name: "API", href: "/api" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Press", href: "/press" },
                { name: "News", href: "/news" },
                { name: "Media Kit", href: "/media-kit" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Blog", href: "/blog" },
                { name: "Newsletter", href: "/newsletter" },
                { name: "Events", href: "/events" },
                { name: "Help Center", href: "/help" },
                { name: "Tutorials", href: "/tutorials" },
                { name: "Community", href: "/community" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Licenses", href: "/licenses" },
                { name: "Settings", href: "/settings" },
                { name: "GDPR", href: "/gdpr" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-zinc-800 mt-12 pt-12">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left">
            <h3 className="text-white font-semibold mb-4">Stay updated</h3>
            <p className="text-gray-400 text-sm mb-6">
              Get the latest news, updates, and tips delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-400 text-sm">
              <p>© 2025 EventHub. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <span className="text-zinc-600">•</span>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <span className="text-zinc-600">•</span>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              <div className="flex gap-3">
                {[
                  { icon: Twitter, href: "https://twitter.com/eventhub", label: "Twitter" },
                  { icon: Instagram, href: "https://instagram.com/eventhub", label: "Instagram" },
                  { icon: Linkedin, href: "https://linkedin.com/company/eventhub", label: "LinkedIn" },
                  { icon: Facebook, href: "https://facebook.com/eventhub", label: "Facebook" },
                  { icon: Youtube, href: "https://youtube.com/eventhub", label: "YouTube" }
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-zinc-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
