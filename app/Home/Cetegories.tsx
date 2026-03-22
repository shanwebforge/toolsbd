import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  LayoutGrid, 
  Zap, 
  Palette, 
  Briefcase, 
  Moon, 
  Film, 
  Store, 
  BookOpen, 
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const ToolsSection = () => {
  const categories = [
    { title: "Daily Use Tools", desc: "Essential utilities for your everyday digital tasks.", link: "/daily-use-tools", icon: Zap, color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50 dark:bg-amber-950/30" },
    { title: "Dev & Designer Tools", desc: "Handy resources to speed up your creative workflow.", link: "/dev-designer-tools", icon: Palette, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50 dark:bg-purple-950/30" },
    { title: "Freelancing Tools", desc: "Boost your productivity and manage clients easily.", link: "/freelanching-tools", icon: Briefcase, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-50 dark:bg-emerald-950/30" },
    { title: "Islamic Tools", desc: "Digital resources for your spiritual journey.", link: "/islamic", icon: Moon, color: "from-indigo-500 to-blue-500", bgColor: "bg-indigo-50 dark:bg-indigo-950/30" },
    { title: "Media Tools", desc: "Edit, convert, and manage your media files.", link: "/media-tools", icon: Film, color: "from-rose-500 to-red-500", bgColor: "bg-rose-50 dark:bg-rose-950/30" },
    { title: "Dokan Tools", desc: "Manage your small business and inventory effectively.", link: "/dokan-tools", icon: Store, color: "from-cyan-500 to-sky-500", bgColor: "bg-cyan-50 dark:bg-cyan-950/30" },
    { title: "Educational Tools", desc: "Learning resources and tools for students & teachers.", link: "/educational-tools", icon: BookOpen, color: "from-violet-500 to-purple-500", bgColor: "bg-violet-50 dark:bg-violet-950/30" },
    { title: "BD Special Tools", desc: "Localized tools specifically for Bangladeshi users.", link: "/bd-Localized-Special-tools", icon: MapPin, color: "from-green-500 to-emerald-500", bgColor: "bg-green-50 dark:bg-green-950/30" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-transparent py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">Powerful Tools Collection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need,
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> all in one place</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our comprehensive suite of tools designed to boost your productivity and simplify complex tasks
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
          <div className="relative w-full max-w-xl group">
            <input 
              type="text" 
              placeholder="Search for tools (e.g. PDF, Image, Unit converter)..." 
              className="w-full py-4 pl-12 pr-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm transition-all focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
          </div>
          
          <button className="flex items-center gap-2 py-4 px-8 bg-gray-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600 text-white font-medium rounded-2xl hover:bg-gray-800 dark:hover:from-purple-700 dark:hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap">
            <LayoutGrid size={18} />
            All Categories
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={index} href={item.link} className="group">
                <div className="h-full bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-purple-200 dark:hover:border-purple-500/30 relative overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card Icon with Gradient */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="relative text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* Explore Link */}
                  <div className="relative mt-6 flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2">
                    Explore Tools
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Tools CTA */}
        <div className="text-center mt-12">
          <Link href="/all-tools">
            <button className="inline-flex items-center gap-2 px-8 py-3 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all duration-300 group">
              <TrendingUp className="w-5 h-5" />
              View All Tools
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;