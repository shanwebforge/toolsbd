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
  ArrowLeft
} from "lucide-react";

const dailyUseTools = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and check your health status",
    icon: Calculator,
    href: "/tools/daily-use/bmi-calculator",
    isReady: true,
  },
  {
    title: "Typing Speed Test",
    description: "Test your typing speed and accuracy with our interactive test",
    icon: Keyboard,
    href: "/tools/daily-use/typing-speed-test",
    isReady: true,
  },
  {
    title: "Password Generator",
    description: "Generate strong and secure passwords for your accounts",
    icon: Lock,
    href: "/tools/daily-use/password-generator",
    isReady: true,
  },
  {
    title: "Color Picker",
    description: "Pick colors and convert between HEX, RGB, and HSL formats",
    icon: Palette,
    href: "/tools/daily-use/color-picker",
    isReady: true,
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and beautify your JSON data",
    icon: FileJson,
    href: "/tools/daily-use/json-formatter",
    isReady: true,
  },
  {
    title: "Todo App",
    description: "Simple and effective task management tool",
    icon: CheckSquare,
    href: "/tools/daily-use/todo",
    isReady: true,
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age from date of birth",
    icon: Calendar,
    href: "/tools/daily-use/age-calculator",
    isReady: false,
  },
  {
    title: "Unit Converter",
    description: "Convert between various units of measurement",
    icon: Ruler,
    href: "/tools/daily-use/unit-converter",
    isReady: false,
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for URLs, text, and more",
    icon: QrCode,
    href: "/tools/daily-use/qr-code",
    isReady: false,
  },
  {
    title: "Image Compressor",
    description: "Compress images without losing quality",
    icon: ImageDown,
    href: "/tools/daily-use/image-compressor",
    isReady: false,
  },
];

export default function DailyUseToolsPage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tools</span>
      </Link>

      {/* Page Header */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Daily Use Tools
            </h1>
            <p className="text-muted-foreground">
              {dailyUseTools.length} tools available
            </p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-[700px]">
          Essential daily tools like calculators, notepads, calendar, and utilities for everyday use.
          These tools are designed to make your daily tasks easier and more efficient.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dailyUseTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.title}
              href={tool.isReady ? tool.href : "#"}
              className={`group flex flex-col bg-card border border-border rounded-xl p-5 transition-all duration-300 ${
                tool.isReady 
                  ? "hover:border-primary hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  : "opacity-60 cursor-not-allowed"
              }`}
              onClick={(e) => !tool.isReady && e.preventDefault()}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    {!tool.isReady && (
                      <span className="text-[10px] font-semibold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
