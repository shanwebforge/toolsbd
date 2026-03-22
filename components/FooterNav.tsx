"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 lg:ml-64 lg:w-[calc(100%-16rem)] transition-all duration-300 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-blue-600 dark:text-blue-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms Rules</Link></li>
              <li><Link href="/security" className="hover:text-blue-500 transition-colors">User Security</Link></li>
              <li><Link href="/report" className="hover:text-blue-500 transition-colors">Report a Bug</Link></li>
              <li><Link href="/advertise" className="hover:text-blue-500 transition-colors">Advertise</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-blue-600 dark:text-blue-400">Social Networks</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">X (Platform)</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Youtube</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-blue-600 dark:text-blue-400">Our Products</h3>
            <ul className="space-y-3">
              <li><Link href="/mobile-apps" className="hover:text-blue-500 transition-colors">Mobile Apps</Link></li>
              <li><Link href="/web-tools" className="hover:text-blue-500 transition-colors">Web Tools</Link></li>
              <li><Link href="/extensions" className="hover:text-blue-500 transition-colors">Browser Extensions</Link></li>
              <li><Link href="/software" className="hover:text-blue-500 transition-colors">Desktop Software</Link></li>
              <li><Link href="/api" className="hover:text-blue-500 transition-colors">API Services</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mb-15 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} ToolsBD. Built with ❤️ in Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;