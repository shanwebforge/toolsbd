import Link from 'next/link';
import { 
  Calendar, 
  Calculator, 
  Heart, 
  CheckSquare, 
  CalendarDays, 
  NotebookPen,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const tools = [
  { name: 'Age Calculator', href: '/daily-use-tools/age-calculator', description: 'Calculate your age from your date of birth.', icon: Calculator, color: 'from-blue-500 to-cyan-500' },
  { name: 'Bangla Calendar', href: '/daily-use-tools/bangla-calendar', description: 'Convert Gregorian date to Bangla date.', icon: Calendar, color: 'from-emerald-500 to-teal-500' },
  { name: 'BMI Calculator', href: '/daily-use-tools/bmi-calculator', description: 'Calculate your Body Mass Index.', icon: Heart, color: 'from-rose-500 to-pink-500' },
  { name: 'Daily Habit Tracker', href: '/daily-use-tools/daily-habit-tracker', description: 'Track your daily habits and build routines.', icon: CheckSquare, color: 'from-purple-500 to-indigo-500' },
  { name: 'Date Calculator', href: '/daily-use-tools/date-calculator', description: 'Calculate the duration between two dates.', icon: CalendarDays, color: 'from-orange-500 to-amber-500' },
  { name: 'Notepad', href: '/daily-use-tools/notepad', description: 'A simple notepad to jot down your thoughts.', icon: NotebookPen, color: 'from-gray-500 to-gray-700' },
];

export default function DailyUseTools() {
  return (
    <div className="bg-gray-50 dark:bg-transparent min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">Essential Utilities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Daily Use Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of essential tools for your everyday digital needs. Simple, fast, and completely free.
          </p>
          
          {/* Stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{tools.length}+ Free Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">No Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Instant Results</span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link key={tool.name} href={tool.href} className="group">
                <div className="h-full bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-purple-200 dark:hover:border-purple-500/30 relative overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon with Gradient */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} p-2.5 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="relative text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  
                  {/* Explore Link */}
                  <div className="relative mt-6 flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2">
                    Use Tool
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Tools CTA */}
        <div className="text-center mt-12">
          <Link href="/all-tools">
            <button className="inline-flex items-center gap-2 px-8 py-3 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all duration-300 group">
              <TrendingUp className="w-5 h-5" />
              Explore All Tools
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}