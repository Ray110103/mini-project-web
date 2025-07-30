"use client";

import { Facebook, Twitter, Instagram, Github } from "lucide-react";  // Fixed GitHub import
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section: Links and Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-500">Quick Links</h2>
            <ul>
              <li>
                <Link href="/" className="text-white hover:text-sky-500">Home</Link>
              </li>
              <li>
                <Link href="/events" className="text-white hover:text-sky-500">Events</Link>
              </li>
              <li>
                <Link href="/ticket-purchase" className="text-white hover:text-sky-500">Buy Tickets</Link>
              </li>
              <li>
                <Link href="/my-tickets" className="text-white hover:text-sky-500">My Tickets</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-sky-500">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-500">Follow Us</h2>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-white hover:text-sky-500">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-sky-500">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-sky-500">
                <Instagram size={24} />
              </a>
              <a href="https://github.com" className="text-white hover:text-sky-500">
                <Github size={24} /> {/* Corrected GitHub icon usage */}
              </a>
            </div>
          </div>

          {/* Newsletter or Additional Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-500">Subscribe for Updates</h2>
            <p className="text-sm">Stay updated with the latest events and ticket offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-md border-none focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button className="bg-sky-500 text-white px-6 py-2 rounded-r-md hover:bg-sky-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright and Support */}
        <div className="mt-10 border-t border-sky-100 pt-6 text-center text-sm">
          <p>&copy; 2025 TicketMaster. All Rights Reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            <Link href="/terms" className="hover:text-sky-500">Terms & Conditions</Link> | 
            <Link href="/privacy" className="hover:text-sky-500"> Privacy Policy</Link>
          </p>
        </div>

        {/* Customer Support Section */}
        <div className="mt-6 text-center text-sm">
          <h3 className="text-lg font-semibold text-sky-500">Need Help?</h3>
          <p className="text-sm">
            For inquiries, reach out to our <Link href="/support" className="text-sky-500 hover:text-sky-400">customer support</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
