"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Wrench, LayoutGrid } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: <Home size={22} />, href: "/" },
    { name: "Menu", icon: <LayoutGrid size={22} />, href: "/menu" },
    { name: "Tools", icon: <Wrench size={22} />, href: "/tools" },
    { name: "Service", icon: <Grid size={22} />, href: "/services" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 lg:left-64 lg:w-[calc(100%-16rem)] transition-all duration-300">
      {/* Footer Container */}
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center h-16 md:h-20">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 group transition-all ${
                    isActive 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-500"
                  }`}
                >
                  {/* Icon Wrapper */}
                  <div className={`p-2 rounded-xl transition-all ${
                    isActive ? "bg-blue-50 dark:bg-blue-900/20 scale-110" : "group-hover:bg-gray-100 dark:group-hover:bg-gray-900"
                  }`}>
                    {item.icon}
                  </div>
                  {/* Label */}
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;