"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { 
  Search, 
  Heart, 
  Globe, 
  Sun, 
  Moon, 
  Monitor,
  Menu, 
  X, 
  ArrowLeft,
  Home,
  BookOpen,
  Info,
  Briefcase,
  Phone,
  User,
  LayoutDashboard,
  Settings,
  HelpCircle,
  MessageSquare,
  Scale,
  Shield,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchPopup } from "@/components/search-popup";

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const menuSections = [
  {
    title: "Main",
    links: [
      { href: "/", label: "Home", icon: Home },
      { href: "/blog", label: "Blog", icon: BookOpen },
      { href: "/about", label: "About", icon: Info },
      { href: "/services", label: "Services", icon: Briefcase },
      { href: "/contact", label: "Contact", icon: Phone },
    ],
  },
  {
    title: "Settings",
    links: [
      { href: "/profile", label: "Profile", icon: User },
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/information", label: "Information", icon: Info },
    ],
  },
  {
    title: "Others",
    links: [
      { href: "/faq", label: "FAQ", icon: HelpCircle },
      { href: "/feedback", label: "Feedback", icon: MessageSquare },
      { href: "/rules", label: "Rules", icon: Scale },
      { href: "/privacy", label: "Privacy & Policy", icon: Shield },
    ],
  },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleThemeSelect = (selectedTheme: "system" | "light" | "dark") => {
    setTheme(selectedTheme);
  };

  const getThemeLabel = () => {
    if (theme === "system") return "System";
    return theme === "dark" ? "Dark" : "Light";
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 h-[70px] flex items-center bg-white/95 dark:bg-[#121212]/80 shadow-md transition-all duration-300">
        <div className="max-w-[1200px] w-full mx-auto px-5 flex items-center justify-between h-full relative">
          {/* Mobile Back Button */}
          <button
            className="hidden md:hidden w-10 h-10 items-center justify-center rounded-md hover:bg-primary/10 transition-colors text-foreground"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 h-10 flex items-center">
            <Image
              src="/assets/logo.webp"
              alt="ToolsBD"
              width={161}
              height={56}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex ml-auto">
            <ul className="flex gap-4 items-center">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="px-4 py-2.5 bg-primary text-white rounded-md font-medium text-sm hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Icons */}
          <div className="flex lg:hidden gap-2 items-center">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* Bookmark */}
            <Link
              href="/bookmarks"
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors"
              aria-label="Bookmarks"
            >
              <Heart className="w-5 h-5 text-foreground" />
            </Link>

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors"
                aria-label="Language"
              >
                <Globe className="w-5 h-5 text-foreground" />
              </button>
              {isLangMenuOpen && (
                <ul className="absolute top-11 right-0 bg-card rounded-lg shadow-lg min-w-[120px] z-50 overflow-hidden border border-border">
                  <li
                    className="px-5 py-3 cursor-pointer hover:bg-muted transition-colors text-sm"
                    onClick={() => setIsLangMenuOpen(false)}
                  >
                    English
                  </li>
                  <li
                    className="px-5 py-3 cursor-pointer hover:bg-muted transition-colors text-sm"
                    onClick={() => setIsLangMenuOpen(false)}
                  >
                    বাংলা
                  </li>
                </ul>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Canvas Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[2000] lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Canvas */}
        <aside
          className={cn(
            "absolute top-0 right-0 w-[300px] h-full bg-card shadow-[-5px_0_25px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-300",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Canvas Header */}
          <div className="flex-shrink-0 flex justify-between items-center p-5 bg-gradient-to-br from-primary to-[#6a11cb] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] bg-cover opacity-10" />
            <h2 className="text-2xl font-bold text-white relative z-10">
              <Image
                src="/assets/logo.png"
                alt="ToolsBD"
                width={100}
                height={20}
                className="h-5 w-auto"
              />
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl hover:bg-white/30 hover:rotate-90 transition-all duration-300 relative z-10"
              title="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Canvas Content */}
          <div className="flex-grow overflow-y-auto p-5 pb-5">
            {menuSections.map((section) => (
              <section
                key={section.title}
                className="mb-6 bg-primary/5 rounded-xl p-4 border border-primary/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="flex items-center pb-3 mb-4 border-b-2 border-primary/20">
                  <h3 className="text-lg font-bold text-primary flex items-center">
                    <span className="w-1 h-[18px] bg-primary rounded-sm mr-2.5" />
                    {section.title}
                  </h3>
                </div>
                <nav>
                  <ul className="space-y-1.5">
                    {section.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:translate-x-1 hover:bg-primary/10 transition-all duration-300 relative overflow-hidden group"
                          >
                            <span className="absolute left-0 top-0 h-full w-0 bg-primary/10 group-hover:w-full transition-all duration-300" />
                            <Icon className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </section>
            ))}

            {/* Theme Selection Section */}
            <section className="mt-auto mb-10 bg-gradient-to-br from-primary/10 to-[#6a11cb]/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center mb-4 pb-2.5 border-b border-primary/30">
                <h4 className="text-base font-semibold text-primary flex items-center gap-2.5">
                  <Palette className="w-[18px] h-[18px]" />
                  Theme Selection
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 justify-center">
                  {[
                    { value: "system" as const, icon: Monitor, label: "System" },
                    { value: "light" as const, icon: Sun, label: "Light" },
                    { value: "dark" as const, icon: Moon, label: "Dark" },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleThemeSelect(option.value)}
                        className={cn(
                          "flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                          theme === option.value
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/30"
                            : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/50 dark:bg-white/10 rounded-lg text-sm">
                  <span className="text-muted-foreground font-medium">Current:</span>
                  <span className="text-primary font-semibold">{getThemeLabel()}</span>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>

      {/* Search Popup */}
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
