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
  ArrowRight
} from "lucide-react";

const toolCategories = [
  {
    title: "Daily Use Tools",
    description: "Essential daily tools like calculators, notepads, calendar, and utilities for everyday use.",
    icon: Wrench,
    href: "/tools/daily-use",
    toolCount: 10,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "PDF Tools",
    description: "PDF merge, split, compress, convert — সব ধরনের PDF কাজ এক জায়গায় সহজে করুন।",
    icon: FileText,
    href: "/tools/pdf",
    toolCount: 10,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Developer & Designer",
    description: "Tools for coding, UI/UX designing, graphics, and software development projects.",
    icon: Code,
    href: "/tools/developer",
    toolCount: 13,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Education Tools",
    description: "Educational apps and tools for students and teachers.",
    icon: GraduationCap,
    href: "/tools/education",
    toolCount: 10,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Business & Freelancing",
    description: "Tools for entrepreneurs, freelancers, and business productivity.",
    icon: Briefcase,
    href: "/tools/business",
    toolCount: 9,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Shop & Dokan",
    description: "E-commerce tools for shop owners, inventory management, and sales tracking.",
    icon: Store,
    href: "/tools/shop",
    toolCount: 8,
    color: "from-teal-500 to-green-500",
  },
  {
    title: "Finance & Money",
    description: "Banking, finance apps, budgeting, and investment management tools.",
    icon: Wallet,
    href: "/tools/finance",
    toolCount: 8,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Media Tools",
    description: "Tools for photo editing, video creation, audio editing, and content sharing.",
    icon: ImageIcon,
    href: "/tools/media",
    toolCount: 7,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "BD Localize Tools",
    description: "Apps and tools specific to Bangladesh: maps, local services, government resources.",
    icon: MapPin,
    href: "/tools/bd-local",
    toolCount: 8,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "General Tools",
    description: "General purpose tools for everyone: utilities, converters, calculators.",
    icon: Users,
    href: "/tools/general",
    toolCount: 10,
    color: "from-indigo-500 to-purple-500",
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <h1 className="gradient-text text-3xl md:text-4xl font-extrabold mb-4">
          All Tools
        </h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Browse our complete collection of free online tools organized by category.
          Find the perfect tool for your needs.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden bg-card border border-border rounded-2xl p-6 hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h2>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {category.toolCount} tools
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
