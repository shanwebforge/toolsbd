"use client";

import Link from "next/link";
import { 
  Calculator, 
  Keyboard, 
  Lock, 
  Palette, 
  FileJson, 
  CheckSquare,
  Calendar,
  Ruler,
  QrCode,
  ImageDown,
  ArrowRight
} from "lucide-react";

const popularTools = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: Calculator,
    href: "/tools/daily-use/bmi-calculator",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Typing Speed Test",
    description: "Test your typing speed",
    icon: Keyboard,
    href: "/tools/daily-use/typing-speed-test",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Password Generator",
    description: "Generate secure passwords",
    icon: Lock,
    href: "/tools/daily-use/password-generator",
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  {
    title: "Color Picker",
    description: "Pick and convert colors",
    icon: Palette,
    href: "/tools/daily-use/color-picker",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    title: "JSON Formatter",
    description: "Format and validate JSON",
    icon: FileJson,
    href: "/tools/daily-use/json-formatter",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Todo App",
    description: "Manage your tasks",
    icon: CheckSquare,
    href: "/tools/daily-use/todo",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age",
    icon: Calendar,
    href: "/tools/daily-use/age-calculator",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    title: "Unit Converter",
    description: "Convert various units",
    icon: Ruler,
    href: "/tools/daily-use/unit-converter",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes",
    icon: QrCode,
    href: "/tools/daily-use/qr-code",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Image Compressor",
    description: "Compress images online",
    icon: ImageDown,
    href: "/tools/daily-use/image-compressor",
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
];

export function ToolsSection() {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="gradient-text text-2xl md:text-3xl font-extrabold tracking-tight">
          Popular Tools
        </h2>
        <p className="text-muted-foreground mt-3 max-w-[700px] leading-relaxed text-sm md:text-base">
          Most used tools by our community
        </p>
        {/* Dot Line Decoration */}
        <div className="w-[200px] h-5 mx-auto relative opacity-70 mt-3">
          <div className="absolute top-[30%] left-0 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute top-[30%] right-0 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent h-0.5 top-1/2" />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {popularTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.title}
              href={tool.href}
              className="group flex flex-col items-center p-4 bg-white/70 dark:bg-white/[0.08] border border-border rounded-xl hover:border-primary hover:bg-primary/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-foreground text-center mb-1">
                {tool.title}
              </h3>
              <p className="text-xs text-muted-foreground text-center line-clamp-1">
                {tool.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* View All Link */}
      <div className="text-center mt-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300"
        >
          <span>View All Tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
