"use client";
import Link from "next/link";
import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  ChevronRight 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#09090b] text-zinc-600 dark:text-zinc-400 pt-10 pb-6 lg:ml-64 lg:w-[calc(100%-16rem)] transition-all duration-300 border-t border-slate-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">
          
          {/* Section 1: Quick Links */}
          <div className="col-span-1">
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] mb-5 text-purple-600 dark:text-purple-400">
              Legal & Support
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Rules", href: "/terms" },
                { name: "Security", href: "/security" },
                { name: "Report Bug", href: "/report" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-1.5 text-xs font-bold hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200">
                    <ChevronRight size={12} className="text-slate-300 dark:text-zinc-700 group-hover:text-purple-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Products */}
          <div className="col-span-1">
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] mb-5 text-purple-600 dark:text-purple-400">
              Our Ecosystem
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Mobile Apps", href: "/mobile-apps" },
                { name: "Web Tools", href: "/web-tools" },
                { name: "Extensions", href: "/extensions" },
                { name: "API Access", href: "/api" },
              ].map((product) => (
                <li key={product.name}>
                  <Link href={product.href} className="group flex items-center gap-1.5 text-xs font-bold hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200">
                    <ChevronRight size={12} className="text-slate-300 dark:text-zinc-700 group-hover:text-purple-500 transition-colors" />
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Social Connect */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] mb-5 text-purple-600 dark:text-purple-400">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Facebook size={16} />, href: "#" },
                { icon: <Linkedin size={16} />, href: "#" },
                { icon: <Twitter size={16} />, href: "#" },
                { icon: <Youtube size={16} />, href: "#" },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 hover:border-purple-500/50 hover:text-purple-600 transition-all active:scale-90"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-emerald-600 bg-emerald-50 dark:bg-emerald-500/5 dark:text-emerald-400 w-fit px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/10">
               <ShieldCheck size={10} />
               <span>SSL Secured</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Lifted Up */}
        <div className="mb-17 md:mb-20 mt-12 pt-6 border-t border-slate-50 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-purple-600 dark:bg-white rounded flex items-center justify-center">
               <Zap size={14} className="text-white dark:text-black fill-current" />
            </div>
            <span className="text-sm font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              TOOL<span className="text-purple-600">X</span>BD
            </span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest leading-none">
              &copy; {new Date().getFullYear()} ToolXBD Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;