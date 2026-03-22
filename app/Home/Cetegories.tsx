import React from 'react';
import Link from 'next/link';
import { Search, LayoutGrid, Tooltip } from 'lucide-react'; // লোগো বা আইকন ব্যবহারের জন্য

const ToolsSection = () => {
  const categories = [
    { title: "Daily Use Tools", desc: "Essential utilities for your everyday digital tasks.", link: "/daily-use-tools", icon: "⚡" },
    { title: "Dev & Designer Tools", desc: "Handy resources to speed up your creative workflow.", link: "/dev-designer-tools", icon: "🎨" },
    { title: "Freelancing Tools", desc: "Boost your productivity and manage clients easily.", link: "/freelanching-tools", icon: "💼" },
    { title: "Islamic Tools", desc: "Digital resources for your spiritual journey.", link: "/islamic", icon: "🌙" },
    { title: "Media Tools", desc: "Edit, convert, and manage your media files.", link: "/media-tools", icon: "🎬" },
    { title: "Dokan Tools", desc: "Manage your small business and inventory effectively.", link: "/dokan-tools", icon: "🏪" },
    { title: "Educational Tools", desc: "Learning resources and tools for students & teachers.", link: "/educational-tools", icon: "📚" },
    { title: "BD Special Tools", desc: "Localized tools specifically for Bangladeshi users.", link: "/bd-Localized-Special-tools", icon: "🇧🇩" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
        <div className="relative w-full max-w-xl group">
          <input 
            type="text" 
            placeholder="Search for tools (e.g. PDF, Image, Unit converter)..." 
            className="w-full py-4 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
        </div>
        
        <button className="flex items-center gap-2 py-4 px-8 bg-gray-900 text-white font-medium rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
          <LayoutGrid size={18} />
          All Categories
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((item, index) => (
          <Link key={index} href={item.link} className="group">
            <div className="h-full bg-white border border-gray-100 rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 relative overflow-hidden">
              {/* Card Accent Decor */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">
                {item.icon}
              </div>
              
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
              
              <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Explore Tools →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsSection;