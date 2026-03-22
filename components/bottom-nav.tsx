"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Wrench, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/blog", icon: BookOpen, label: "Blog" },
  { href: "/tools", icon: Wrench, label: "Tools" },
  { href: "/shop", icon: ShoppingBag, label: "Shop" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[55px] bg-card shadow-[0_-1px_5px_rgba(0,0,0,0.1)] z-50 md:hidden">
      <div className="grid grid-cols-5 h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-semibold transition-all duration-300 hover:-translate-y-1",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-[18px] h-[18px] mb-0.5 transition-colors",
                isActive ? "text-primary" : ""
              )} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
