"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Grid, Wrench, LayoutGrid, X, 
  Info, BookOpen, Users, MessageSquare, FileJson, ShieldCheck, 
  Briefcase, Moon, Video, Store, Zap, Flag, Code
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const pathname = usePathname();
  const [activeDrawer, setActiveDrawer] = useState(null);

  const navItems = [
    { name: "Home", icon: <Home size={22} />, href: "/", drawer: null },
    { name: "Service", icon: <Grid size={22} />, href: "/services", drawer: null },
    { name: "Menu", icon: <LayoutGrid size={22} />, href: "/menu", drawer: "menu" },
    { name: "Tools", icon: <Wrench size={22} />, href: "/tools", drawer: "tools" },
  ];

  const menuData = {
    "General Pages": [
      { name: "About Us", icon: <Info size={20} />, path: "/about" },
      { name: "Our Blog", icon: <BookOpen size={20} />, path: "/blog" },
      { name: "Contact", icon: <MessageSquare size={20} />, path: "/contact" },
      { name: "Community", icon: <Users size={20} />, path: "/community" },
    ],
    "Resources": [
      { name: "AI Docs", icon: <FileJson size={20} />, path: "/docs/ai" },
      { name: "API Docs", icon: <Code size={20} />, path: "/docs/api" },
      { name: "Terms & Privacy", icon: <ShieldCheck size={20} />, path: "/terms" },
    ],
  };

  const toolsCategories = [
    { name: "Daily Use Tools", icon: <Zap size={20} />, path: "/tools/daily" },
    { name: "Dev & Designer Tools", icon: <Code size={20} />, path: "/tools/dev-design" },
    { name: "Freelancing Tools", icon: <Briefcase size={20} />, path: "/tools/freelancing" },
    { name: "Islamic Tools", icon: <Moon size={20} />, path: "/tools/islamic" },
    { name: "Media Tools", icon: <Video size={20} />, path: "/tools/media" },
    { name: "Dokan Tools", icon: <Store size={20} />, path: "/tools/dokan" },
    { name: "Educational Tools", icon: <BookOpen size={20} />, path: "/tools/educational" },
    { name: "BD Special Tools", icon: <Flag size={20} />, path: "/tools/bd-special" },
  ];

  const handleDrawerOpen = (drawerName, e) => {
    e.preventDefault();
    setActiveDrawer(drawerName);
  };

  const handleDrawerClose = () => setActiveDrawer(null);

  const renderDrawer = () => {
    if (!activeDrawer) return null;

    const isMenuDrawer = activeDrawer === "menu";
    const title = isMenuDrawer ? "Quick Menu" : "Explore Categories";
    const icon = isMenuDrawer ? <LayoutGrid size={20} /> : <Wrench size={20} />;

    return (
      <>
        <div 
          className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300" 
          onClick={handleDrawerClose} 
        />
        
        <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-zinc-950 rounded-t-[2.5rem] shadow-2xl animate-slide-up lg:left-64 transition-all border-t border-gray-100 dark:border-zinc-800">
          
          <div className="flex justify-center pt-4 pb-2">
             <div className="w-12 h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full" />
          </div>
          
          <div className="px-6 py-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                {icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            </div>
            <button onClick={handleDrawerClose} className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-full text-gray-500 hover:text-red-500 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto p-6 pt-2 pb-12">
            {isMenuDrawer ? (
              Object.entries(menuData).map(([category, items]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-zinc-500 mb-3 ml-1">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {items.map((item) => (
                      <Link key={item.path} href={item.path} onClick={handleDrawerClose}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/40 border border-transparent hover:border-blue-500/20 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                      >
                        <span className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-zinc-200">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {toolsCategories.map((item) => (
                  <Link key={item.path} href={item.path} onClick={handleDrawerClose}
                    className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800/50 hover:border-blue-500/40 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group"
                  >
                    <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full z-50 lg:left-64 lg:w-[calc(100%-16rem)] transition-all">
        <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-t border-gray-200 dark:border-zinc-800">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex justify-around items-center h-16 md:h-20">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Component = item.drawer ? 'button' : Link;
                const props = item.drawer 
                  ? { onClick: (e) => handleDrawerOpen(item.drawer, e) }
                  : { href: item.href };

                return (
                  <Component
                    key={item.name}
                    {...props}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-zinc-500 hover:text-blue-500"
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-blue-50 dark:bg-blue-900/20 scale-110 shadow-sm" : ""}`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
                  </Component>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      {renderDrawer()}

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </>
  );
};

export default Footer;