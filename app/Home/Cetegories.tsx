"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { groupedTools } from "../data/toolsData";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
 
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              All Tools & Utilities
            </h1>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-3 py-4">
        {Object.entries(groupedTools).map(([category, tools]) => (
          <div key={category} className="mb-6 last:mb-0">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              {category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Link
                    key={tool.link}
                    href={tool.link}
                    className="group p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:border-purple-200 dark:hover:border-purple-800"
                  >
                    <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                      <div className="p-2 sm:p-2.5 bg-purple-50 dark:bg-purple-950/30 rounded-lg group-hover:scale-105 transition-transform">
                        <IconComponent size={18} className="text-purple-600 dark:text-purple-400 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">
                          {tool.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1 sm:line-clamp-2">
                          {tool.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}