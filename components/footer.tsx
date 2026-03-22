"use client";

import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Share2 
} from "lucide-react";

const quickLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/rules", label: "Terms Rules" },
  { href: "/security", label: "User Security" },
  { href: "/report-bug", label: "Report a Bug" },
  { href: "/advertise", label: "Advertise" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://x.com", label: "X (Platform)" },
  { href: "https://youtube.com", label: "Youtube" },
];

const productLinks = [
  { href: "/products/mobile-apps", label: "Mobile Apps" },
  { href: "/products/web-tools", label: "Web Tools" },
  { href: "/products/extensions", label: "Browser Extensions" },
  { href: "/products/desktop", label: "Desktop Software" },
  { href: "/products/api", label: "API Services" },
];

const supportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQs" },
  { href: "/community", label: "Community Forum" },
  { href: "/status", label: "System Status" },
];

const shareSocialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/sharer/sharer.php?u=https://toolsbd.vercel.app", label: "Share on Facebook" },
  { icon: Twitter, href: "https://twitter.com/intent/tweet?url=https://toolsbd.vercel.app&text=Check+this+out!", label: "Share on Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/shareArticle?mini=true&url=https://toolsbd.vercel.app", label: "Share on LinkedIn" },
  { icon: MessageCircle, href: "https://api.whatsapp.com/send?text=https://toolsbd.vercel.app", label: "Share on WhatsApp" },
  { icon: Share2, href: "https://www.reddit.com/submit?url=https://toolsbd.vercel.app&title=Check+this+out!", label: "Share on Reddit" },
];

export function Footer() {
  return (
    <footer className="relative hidden md:block max-w-[1400px] mx-auto p-4 pb-5 lg:ml-[280px] lg:w-[calc(100%-280px)] lg:max-w-[calc(1400px-280px)]">
      {/* Dot Line Decoration */}
      <div className="w-[200px] h-5 mx-auto relative opacity-70 mb-4">
        <div className="absolute top-[30%] left-0 w-2 h-2 rounded-full bg-primary" />
        <div className="absolute top-[30%] right-0 w-2 h-2 rounded-full bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent h-0.5 top-1/2" />
      </div>

      <div className="flex flex-wrap gap-5">
        {/* Left Box - Quick Links & Social */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex flex-wrap gap-2">
            {/* Quick Links */}
            <div className="flex-1 min-w-[45%] p-4">
              <h3 className="text-base font-bold mb-2.5 text-foreground">Quick Link</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href} className="relative pl-4">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Network */}
            <div className="flex-1 min-w-[45%] p-4">
              <h3 className="text-base font-bold mb-2.5 text-foreground">Socials Network</h3>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.href} className="relative pl-4">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Box - Download Section */}
        <div className="flex-1 min-w-[250px]">
          <section className="text-center py-5 px-2.5 rounded-2xl">
            <div className="text-2xl font-bold mb-4 text-foreground select-none pointer-events-none">
              Download Now
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="#"
                className="flex items-center justify-center gap-2 text-white py-2.5 px-4 rounded-xl text-sm min-w-[140px] bg-playstore hover:opacity-85 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <span>Play Store</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 text-white py-2.5 px-4 rounded-xl text-sm min-w-[140px] bg-black hover:opacity-85 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <span>App Store</span>
              </a>
            </div>

            {/* Social Share */}
            <div className="flex justify-center gap-2.5 mt-4 py-4">
              {shareSocialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Box - Products & Support */}
        <div className="flex-1 min-w-[250px]">
          <div className="flex flex-wrap gap-2">
            {/* Our Products */}
            <div className="flex-1 min-w-[45%] p-4">
              <h3 className="text-base font-bold mb-2.5 text-foreground">Our Products</h3>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.href} className="relative pl-4">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="flex-1 min-w-[45%] p-4">
              <h3 className="text-base font-bold mb-2.5 text-foreground">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href} className="relative pl-4">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
