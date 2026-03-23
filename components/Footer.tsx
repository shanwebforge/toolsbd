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
    { name: "Tools", icon: <Wrench size={22} />, href: "/tools", drawer: "tools" },
    { name: "Menu", icon: <LayoutGrid size={22} />, href: "/menu", drawer: "menu" },
  ];

  const menuData = {
    "General Pages": [
      { name: "About Us", icon: <Info size={18} />, path: "/about" },
      { name: "Our Blog", icon: <BookOpen size={18} />, path: "/blog" },
      { name: "Contact", icon: <MessageSquare size={18} />, path: "/contact" },
      { name: "Community", icon: <Users size={18} />, path: "/community" },
    ],
    "Resources": [
      { name: "AI Docs", icon: <FileJson size={18} />, path: "/docs/ai" },
      { name: "API Docs", icon: <Code size={18} />, path: "/docs/api" },
      { name: "Terms & Privacy", icon: <ShieldCheck size={18} />, path: "/terms" },
    ],
  };

  const toolsCategories = [
    { name: "Daily Use Tools", icon: <Zap size={18} />, path: "/tools/daily" },
    { name: "Dev & Designer Tools", icon: <Code size={18} />, path: "/tools/dev-design" },
    { name: "Freelancing Tools", icon: <Briefcase size={18} />, path: "/tools/freelancing" },
    { name: "Islamic Tools", icon: <Moon size={18} />, path: "/tools/islamic" },
    { name: "Media Tools", icon: <Video size={18} />, path: "/tools/media" },
    { name: "Dokan Tools", icon: <Store size={18} />, path: "/tools/dokan" },
    { name: "Educational Tools", icon: <BookOpen size={18} />, path: "/tools/educational" },
    { name: "BD Special Tools", icon: <Flag size={18} />, path: "/tools/bd-special" },
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

    return (
      <>
        <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300" onClick={handleDrawerClose} />
        
        <div className="fixed bottom-0 left-0 right-0 z-[70] bg-[#eff2ff] dark:bg-[#15162c] rounded-t-[1.0rem] shadow-2xl animate-slide-up lg:left-64 lg:right-0 transition-all border-t border-indigo-100 dark:border-indigo-500/20">
          
          <div className="flex justify-center pt-4 pb-2">
             <div className="w-12 h-1.5 bg-indigo-200 dark:bg-indigo-900/40 rounded-full" />
          </div>
          
          <div className="px-6 py-2 flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold text-indigo-900 dark:text-indigo-100">{title}</h2>
            <button onClick={handleDrawerClose} className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>
          
          <div className="max-h-[65vh] overflow-y-auto p-4 md:p-6 pt-2 pb-12 custom-scrollbar">
            {isMenuDrawer ? (
              // Menu Drawer: Category wise layout (Ager moto)
              Object.entries(menuData).map(([category, items]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 dark:text-indigo-500/60 mb-3 ml-1">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    {items.map((item) => (
                      <Link key={item.path} href={item.path} onClick={handleDrawerClose}
                        className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-2xl bg-white dark:bg-[#1c1d3a] border border-indigo-50/50 dark:border-indigo-500/10 hover:border-indigo-500/30 transition-all active:scale-95 group shadow-sm"
                      >
                        <span className="text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="text-[11px] md:text-sm font-semibold text-zinc-700 dark:text-zinc-200">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Tools Drawer: All tools in a 2-column grid (Compact)
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {toolsCategories.map((item) => (
                  <Link key={item.path} href={item.path} onClick={handleDrawerClose}
                    className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-3 md:p-5 rounded-2xl bg-white dark:bg-[#1c1d3a] border border-indigo-50/50 dark:border-indigo-500/10 hover:border-indigo-500/40 transition-all active:scale-95 group shadow-sm"
                  >
                    <div className="p-2 md:p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-zinc-700 dark:text-zinc-200 leading-tight">
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
      <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-[340px] md:max-w-2xl lg:left-[calc(50%+8rem)] lg:w-[680px] z-50 transition-all duration-500">
        <div className="bg-[#eff2ff]/95 dark:bg-[#15162c]/90 backdrop-blur-3xl border border-indigo-200/50 dark:border-indigo-500/20 rounded-[2rem] shadow-[0_15px_40px_rgba(99,102,241,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="px-1 md:px-6 py-1.5 md:py-2.5">
            <div className="flex justify-around items-center h-11 md:h-16">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Component = item.drawer ? 'button' : Link;
                const props = item.drawer 
                  ? { onClick: (e) => handleDrawerOpen(item.drawer, e) }
                  : { href: item.href };

                return (
                  <Component key={item.name} {...props}
                    className={`relative flex flex-col items-center justify-center min-w-[50px] md:min-w-[85px] transition-all duration-300 ${
                      isActive ? "text-indigo-600 dark:text-indigo-300" : "text-indigo-400/60 dark:text-indigo-100/30 hover:text-indigo-500"
                    }`}
                  >
                    {isActive && <div className="absolute -top-1.5 md:-top-2.5 w-4 md:w-10 h-[2px] md:h-1 bg-indigo-500 dark:bg-indigo-400 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]" />}
                    <div className={`flex items-center justify-center transition-all duration-300 ${isActive ? "scale-[0.85] md:scale-110 -translate-y-0.5" : "scale-[0.65] md:scale-90"}`}>
                      {item.icon}
                    </div>
                    <span className={`text-[6.5px] md:text-[9.5px] font-black uppercase tracking-[0.02em] md:tracking-[0.15em] transition-all duration-300 leading-none mt-0.5 ${isActive ? "opacity-100" : "opacity-60"}`}>
                      {item.name}
                    </span>
                  </Component>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
      {renderDrawer()}
      <style jsx>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
      `}</style>
    </>
  );
};

export default Footer;