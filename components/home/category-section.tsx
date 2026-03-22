"use client";

import Link from "next/link";
import { 
  Wrench, 
  FileText, 
  Code, 
  GraduationCap, 
  Briefcase, 
  Store, 
  Wallet, 
  ImageIcon, 
  MapPin, 
  Users,
  Eye,
  FileIcon,
  Heart,
  Share2,
  Bookmark
} from "lucide-react";

const toolCategories = [
  {
    title: "Daily Use Tools",
    description: "Essential daily tools like calculators, notepads, calendar, and utilities for everyday use.",
    icon: Wrench,
    href: "/tools/daily-use",
    fileCount: 10,
    views: 1250,
  },
  {
    title: "PDF Tools",
    description: "PDF merge, split, compress, convert — সব ধরনের PDF কাজ এক জায়গায় সহজে করুন।",
    icon: FileText,
    href: "/tools/pdf",
    fileCount: 10,
    views: 890,
  },
  {
    title: "Developer & Designer",
    description: "Tools for coding, UI/UX designing, graphics, and software development projects.",
    icon: Code,
    href: "/tools/developer",
    fileCount: 13,
    views: 2100,
  },
  {
    title: "Education Tools",
    description: "Educational apps and tools for students and teachers, including e-books and online learning platforms.",
    icon: GraduationCap,
    href: "/tools/education",
    fileCount: 10,
    views: 780,
  },
  {
    title: "Business & Freelancing",
    description: "Tools for entrepreneurs, freelancers, project management, and business productivity.",
    icon: Briefcase,
    href: "/tools/business",
    fileCount: 9,
    views: 650,
  },
  {
    title: "Shop & Dokan",
    description: "Marketplace and e-commerce tools for shop owners, inventory management, and sales tracking.",
    icon: Store,
    href: "/tools/shop",
    fileCount: 8,
    views: 420,
  },
  {
    title: "Finance & Money",
    description: "Banking, finance apps, budgeting, payment solutions, and investment management tools.",
    icon: Wallet,
    href: "/tools/finance",
    fileCount: 8,
    views: 980,
  },
  {
    title: "Media Tools",
    description: "Tools for photo editing, video creation, audio editing, and content sharing for media creators.",
    icon: ImageIcon,
    href: "/tools/media",
    fileCount: 7,
    views: 1560,
  },
  {
    title: "BD Localize Tools",
    description: "Apps and tools specific to Bangladesh: maps, local services, government resources, and regional guides.",
    icon: MapPin,
    href: "/tools/bd-local",
    fileCount: 8,
    views: 340,
  },
  {
    title: "Tools For General People",
    description: "General purpose tools for everyone: utilities, converters, calculators, and everyday assistance apps.",
    icon: Users,
    href: "/tools/general",
    fileCount: 10,
    views: 2350,
  },
];

export function CategorySection() {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="gradient-text text-2xl md:text-3xl font-extrabold tracking-tight">
          Tools Category
        </h2>
        <p className="text-muted-foreground mt-3 max-w-[700px] leading-relaxed text-sm md:text-base">
          Explore our collection of useful tools and utilities for your daily tasks
        </p>
        {/* Dot Line Decoration */}
        <div className="w-[200px] h-5 mx-auto relative opacity-70 mt-3">
          <div className="absolute top-[30%] left-0 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute top-[30%] right-0 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent h-0.5 top-1/2" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {toolCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.title}
              href={category.href}
              className="group flex bg-white/70 dark:bg-white/[0.08] border border-border rounded-xl p-5 md:p-7 gap-5 relative hover:bg-primary/10 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 min-h-[120px] md:min-h-[180px]"
            >
              {/* Content */}
              <div className="flex-grow pr-[100px] md:pr-[140px]">
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary group-hover:rotate-[10deg] group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                {/* Title */}
                <h3 className="text-base md:text-xl font-bold text-foreground mb-2">
                  {category.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                  {category.description}
                </p>
              </div>

              {/* Info Panel */}
              <div className="absolute right-4 top-4 bottom-4 flex flex-col justify-between items-end">
                {/* Stats */}
                <div className="flex flex-col gap-1.5 p-2 md:p-3 border border-primary/40 rounded-xl bg-primary/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                    <FileIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <span className="font-bold text-primary">{category.fileCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <span className="font-bold text-primary">{category.views}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 md:gap-3 p-2 md:p-3 border border-primary/40 rounded-xl bg-primary/10 backdrop-blur-sm">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
                  <Share2 className="w-4 h-4 md:w-5 md:h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
                  <Bookmark className="w-4 h-4 md:w-5 md:h-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
