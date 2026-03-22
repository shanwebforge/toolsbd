"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { 
  PieChart, 
  Home, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Phone,
  Settings,
  Shield,
  Bell,
  Palette,
  Info,
  HelpCircle,
  FileText,
  Star,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
  {
    title: "Main",
    links: [
      { href: "/", icon: Home, label: "Home" },
      { href: "/blog", icon: TrendingUp, label: "Blog" },
      { href: "/about", icon: Users, label: "About" },
      { href: "/services", icon: ShoppingCart, label: "Service" },
      { href: "/contact", icon: Phone, label: "Contact" },
    ],
  },
  {
    title: "Settings",
    links: [
      { href: "/profile", icon: Settings, label: "Profile" },
      { href: "/dashboard", icon: Shield, label: "Dashboard" },
      { href: "/settings", icon: Bell, label: "Settings" },
      { href: "/information", icon: Palette, label: "Information" },
    ],
  },
  {
    title: "Others",
    links: [
      { href: "/faq", icon: Info, label: "FAQ" },
      { href: "/feedback", icon: HelpCircle, label: "Feedback" },
      { href: "/rules", icon: FileText, label: "Rules" },
      { href: "/rate", icon: Star, label: "Rate Us" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleThemeSelect = (selectedTheme: "system" | "light" | "dark") => {
    setTheme(selectedTheme);
  };

  const getThemeLabel = () => {
    if (theme === "system") return "System";
    return theme === "dark" ? "Dark" : "Light";
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-[70px] w-[260px] h-[calc(100vh-70px)] bg-card border-r border-border flex-col z-40 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
        <PieChart className="w-6 h-6 text-primary" />
        <span className="font-bold text-lg text-foreground">Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto py-4 px-3">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Theme Selection */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-primary/10 to-[#6a11cb]/10 rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/30">
            <Palette className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold text-primary">Theme Selection</h4>
          </div>
          <div className="flex gap-2 mb-3">
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
                    "flex-1 flex flex-col items-center gap-1 py-2 px-1.5 rounded-lg border text-xs font-medium transition-all duration-200",
                    theme === option.value
                      ? "bg-primary border-primary text-white"
                      : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground">Current:</span>
            <span className="text-primary font-semibold">{getThemeLabel()}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
