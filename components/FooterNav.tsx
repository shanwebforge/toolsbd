"use client";
import Link from "next/link";
import { Facebook, Linkedin, Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 py-16 lg:ml-64 lg:w-[calc(100%-16rem)] transition-all duration-300 border-t border-gray-100 dark:border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          
          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-[0.2em] mb-7 text-purple-600 dark:text-purple-400">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms Rules", href: "/terms" },
                { name: "User Security", href: "/security" },
                { name: "Report a Bug", href: "/report" },
                { name: "Advertise", href: "/advertise" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                    <span className="font-medium">{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-[0.2em] mb-7 text-purple-600 dark:text-purple-400">
              Social Networks
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "Facebook", icon: <Facebook size={18} />, href: "#" },
                { name: "LinkedIn", icon: <Linkedin size={18} />, href: "#" },
                { name: "Instagram", icon: <Instagram size={18} />, href: "#" },
                { name: "X Platform", icon: <Twitter size={18} />, href: "#" },
                { name: "Youtube", icon: <Youtube size={18} />, href: "#" },
              ].map((social) => (
                <a key={social.name} href={social.href} className="flex items-center gap-3 hover:text-purple-600 dark:hover:text-purple-400 transition-all group">
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-900 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors">
                    {social.icon}
                  </div>
                  <span className="font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-[0.2em] mb-7 text-purple-600 dark:text-purple-400">
              Our Products
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Mobile Apps", href: "/mobile-apps" },
                { name: "Web Tools", href: "/web-tools" },
                { name: "Browser Extensions", href: "/extensions" },
                { name: "Desktop Software", href: "/software" },
                { name: "API Services", href: "/api" },
              ].map((product) => (
                <li key={product.name}>
                  <Link href={product.href} className="relative font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                    {product.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar - Mobile & PC Both Centered with Bottom Margin */}
        <div className="mt-20 mb-16 pt-10 border-t border-gray-100 dark:border-zinc-900 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-tighter">
            Tool<span className="text-purple-600">X</span>BD
          </p>
          <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;