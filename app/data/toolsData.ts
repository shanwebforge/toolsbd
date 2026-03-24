import {
  Calculator, Ruler, Landmark, Calendar, Cake, Coffee, Building2,
  Palette, Sparkles, Type, Image, Braces, Code,
  Briefcase, TrendingUp, Users, DollarSign, Clock, FileText,
  Video, Camera, Mic, Radio, Tv,
  ShoppingBag, Package, Store, CreditCard,
  BookOpen, GraduationCap, Library, PenTool, Globe,
  MapPin, Sun, Star, Heart,
  Wifi, Phone, Activity, Hash, Percent, Keyboard, CheckSquare
} from "lucide-react";

export interface Tool {
  name: string;
  icon: any;
  link: string;
  category: string;
  desc: string;
  color?: string; // Daily tools এর জন্য কালার অপশনাল রাখা হয়েছে
}

export const toolsData: Tool[] = [
  // Daily Use Tools
  { name: 'Age Calculator', link: '/daily-use-tools/age-calculator', desc: 'Calculate your age from your date of birth.', icon: Calculator, category: "Daily Use Tools", color: 'from-blue-500 to-cyan-500'}, 
  { name: 'Bangla Calendar', link: '/daily-use-tools/bangla-calendar', desc: 'Convert Gregorian date to Bangla date.', icon: Calendar, category: "Daily Use Tools", color: 'from-emerald-500 to-teal-500'},
  { name: 'BMI Calculator', link: '/daily-use-tools/bmi-calculator', desc: 'Calculate your Body Mass Index.', icon: Heart, category: "Daily Use Tools", color: 'from-rose-500 to-pink-500'},
  { name: 'Daily Habit Tracker', link: '/daily-use-tools/daily-habit-tracker', desc: 'Track your daily habits and stay consistent.', icon: Activity, category: "Daily Use Tools", color: 'from-indigo-500 to-purple-500' },
  { name: 'Date Calculator', link: '/daily-use-tools/date-calculator', desc: 'Calculate difference between two dates.', icon: Calendar, category: "Daily Use Tools", color: 'from-orange-500 to-amber-500'},
  { name: 'Notepad', link: '/daily-use-tools/notepad', desc: 'Write and save your notes easily.', icon: FileText, category: "Daily Use Tools", color: 'from-gray-500 to-slate-500'},
  { name: 'Number to Word', link: '/daily-use-tools/number-to-word', desc: 'Convert numbers into words instantly.', icon: Hash, category: "Daily Use Tools", color: 'from-green-500 to-lime-500'},
  { name: 'Percentage Calculator', link: '/daily-use-tools/percentage-calculator', desc: 'Calculate percentages quickly and easily.', icon: Percent, category: "Daily Use Tools", color: 'from-yellow-500 to-orange-500'},
  { name: 'Speed Test', link: '/daily-use-tools/speed-test', desc: 'Test your internet speed in real-time.', icon: Wifi, category: "Daily Use Tools", color: 'from-sky-500 to-blue-500'},
  { name: 'Todo App', link: '/daily-use-tools/todo-app', desc: 'Manage your daily tasks efficiently.', icon: CheckSquare, category: "Daily Use Tools", color: 'from-teal-500 to-cyan-500'},
  { name: 'Typing Speed Test', link: '/daily-use-tools/typing-speed-test', desc: 'Check your typing speed and accuracy.', icon: Keyboard, category: "Daily Use Tools", color: 'from-purple-500 to-indigo-500'},

  // Dev & Designer Tools
  { name: "Color Picker", icon: Palette, link: "/dev-designer-tools/color-picker", category: "Dev & Designer Tools", desc: "Pick colors & generate codes" },
  { name: "Color Similarity", icon: Palette, link: "/dev-designer-tools/color-similarity", category: "Dev & Designer Tools", desc: "Pick colors & generate codes" },
  { name: "Gradient Generator", icon: Sparkles, link: "/dev-designer-tools/gradiant-mixer", category: "Dev & Designer Tools", desc: "CSS gradient generator" },
  { name: "Shadow Generator", icon: Sparkles, link: "/dev-designer-tools/shadow", category: "Dev & Designer Tools", desc: "Box shadow generator" },
  { name: "Font Preview", icon: Type, link: "/dev-designer-tools/font-preview", category: "Dev & Designer Tools", desc: "Google fonts generator" },
  { name: "Icon Generator", icon: Image, link: "/dev-designer-tools/icon-generator", category: "Dev & Designer Tools", desc: "Favicon & icon generator" },
  { name: "JSON Formatter", icon: Braces, link: "/dev-designer-tools/json-formatter-validator", category: "Dev & Designer Tools", desc: "Format & validate JSON" },
  { name: "CSS Minifier", icon: Code, link: "/dev-designer-tools/css-minifier", category: "Dev & Designer Tools", desc: "Minify CSS code" },
  { name: "JS Minifier", icon: Code, link: "/dev-designer-tools/js-minifier", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },
  { name: "Base64 Encoder", icon: Code, link: "/dev-designer-tools/base64-encoder", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },
  { name: "Facebook Dp", icon: Code, link: "/dev-designer-tools/facebook-dp", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },
  { name: "Logo Generator", icon: Code, link: "/dev-designer-tools/logo-generator", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },
  { name: "Lorem Ipsum", icon: Code, link: "/dev-designer-tools/lorem-ipsum", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },
  { name: "Password Generator", icon: Code, link: "/dev-designer-tools/password-generator", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },
  { name: "Lregex Tester", icon: Code, link: "/dev-designer-tools/regex-tester", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },
  { name: "Responsive design checker", icon: Code, link: "/dev-designer-tools/responsive-design-checker", category: "Dev & Designer Tools", desc: "Minify JavaScript code" },

  // Freelancing Tools
  { name: "Invoice Generator", icon: FileText, link: "/freelanching-tools/invoice-genarator", category: "Freelancing Tools", desc: "Generate professional invoices" },
  { name: "Proposal Template", icon: Briefcase, link: "/freelanching-tools/proposal", category: "Freelancing Tools", desc: "Client proposal templates" },
  { name: "Time Tracker", icon: Clock, link: "/freelanching-tools/time-tracking", category: "Freelancing Tools", desc: "Track work hours" },
  { name: "Project Manager", icon: TrendingUp, link: "/freelanching-tools/project-manager", category: "Freelancing Tools", desc: "Manage projects & tasks" },
  { name: "Client Manager", icon: Users, link: "/freelanching-tools/client-manager", category: "Freelancing Tools", desc: "Manage client information" },
  { name: "Payment Tracker", icon: DollarSign, link: "/freelanching-tools/client-payment-tracker", category: "Freelancing Tools", desc: "Track payments & income" },

  { name: "Contract Template", icon: DollarSign, link: "/freelanching-tools/contract-template-generator", category: "Freelancing Tools", desc: "Track payments & income" },
  { name: "Daily Log", icon: DollarSign, link: "/freelanching-tools/daily-log", category: "Freelancing Tools", desc: "Track payments & income" },
  { name: "Employee Evaluation", icon: DollarSign, link: "/freelanching-tools/employee-evaluation", category: "Freelancing Tools", desc: "Track payments & income" },
  { name: "Fiverr Gig", icon: DollarSign, link: "/freelanching-tools/fiverr-gig-keyword-tool", category: "Freelancing Tools", desc: "Track payments & income" },
  { name: "Flyer Generator", icon: DollarSign, link: "/freelanching-tools/flyer-generator", category: "Freelancing Tools", desc: "Track payments & income" },
 

  // Islamic Tools
  { name: "Prayer Times", icon: Sun, link: "/tools/prayer-times", category: "Islamic Tools", desc: "Daily prayer times" },
  { name: "Quran Reader", icon: BookOpen, link: "/tools/quran", category: "Islamic Tools", desc: "Read Quran with translation" },
  { name: "Qibla Finder", icon: MapPin, link: "/tools/qibla", category: "Islamic Tools", desc: "Find Qibla direction" },
  { name: "Hijri Calendar", icon: Calendar, link: "/tools/hijri-calendar", category: "Islamic Tools", desc: "Islamic calendar" },
  { name: "Zakat Calculator", icon: Heart, link: "/tools/zakat", category: "Islamic Tools", desc: "Calculate Zakat" },
  { name: "Tasbih Counter", icon: Star, link: "/tools/tasbih", category: "Islamic Tools", desc: "Digital tasbih counter" },

  // Media Tools
  { name: "BG Remover", icon: Camera, link: "/media-tools/bg-remover", category: "Media Tools", desc: "Edit photos & images" },
  { name: "Video Editor", icon: Video, link: "/media-tools/video-editor", category: "Media Tools", desc: "Edit videos online" },
  { name: "Image Editor", icon: Camera, link: "/media-tools/image-editor", category: "Media Tools", desc: "Edit photos & images" },
  { name: "Mp3 Cutter", icon: Mic, link: "/media-tools/mp3-cutter", category: "Media Tools", desc: "Edit audio files" },
  { name: "Video to Audio", icon: Video, link: "/media-tools/video-to-audio", category: "Media Tools", desc: "Convert video formats" },
  { name: "Image Compressor", icon: Camera, link: "/media-tools/image-compressor", category: "Media Tools", desc: "Compress images" },
  { name: "Voice Over", icon: Radio, link: "/media-tools/voiceover", category: "Media Tools", desc: "Voce Over" },
  { name: "Mp3 Volume Booster", icon: Radio, link: "/media-tools/mp3-volume-booster", category: "Media Tools", desc: "Voce Over" },
  { name: "Content Scheduler", icon: Radio, link: "/media-tools/content-scheduler", category: "Media Tools", desc: "Voce Over" },
  { name: "Bangla Subtitle", icon: Radio, link: "/media-tools/bangla-subtitle", category: "Media Tools", desc: "Voce Over" },
  { name: "Youtube Downloader", icon: Radio, link: "/media-tools/youtube-downloader", category: "Media Tools", desc: "Voce Over" },
  
  
  // Dokan Tools
  { name: "Product Manager", icon: Package, link: "/dokan-tools/product-manager", category: "Dokan Tools", desc: "Manage store products" },
  { name: "Inventory Tracker", icon: Package, link: "/dokan-tools/inventory", category: "Dokan Tools", desc: "Track inventory" },
  { name: "Order Manager", icon: ShoppingBag, link: "/dokan-tools/order-manager", category: "Dokan Tools", desc: "Manage customer orders" },
  { name: "Customer Manager", icon: Users, link: "/dokan-tools/customer-manager", category: "Dokan Tools", desc: "Manage customers" },
  { name: "Expense Tracker", icon: DollarSign, link: "/dokan-tools/expense", category: "Dokan Tools", desc: "Track store expenses" },
  { name: "Barcode Generator", icon: Store, link: "/dokan-tools/barcode", category: "Dokan Tools", desc: "Generate barcodes" },
  { name: "Coustomer Receipt", icon: Store, link: "/dokan-tools/receipt-print", category: "Dokan Tools", desc: "Generate barcodes" },
  { name: "Discount Calculator", icon: Store, link: "/dokan-tools/discount-calculator", category: "Dokan Tools", desc: "Generate barcodes" },

  // Educational Tools
  { name: "GPA Calculator", icon: GraduationCap, link: "/educational-tools/gpa-cgpa-calculator", category: "Educational Tools", desc: "Calculate GPA/CGPA" },
  { name: "Math Solver", icon: Calculator, link: "/educational-tools/math-solver", category: "Educational Tools", desc: "Solve math problems" },
  { name: "Grammar Checker", icon: PenTool, link: "/educational-tools/grammar-checker", category: "Educational Tools", desc: "Check grammar & spelling" },
  { name: "PDF Editor", icon: FileText, link: "/educational-tools/pdf-editor", category: "Educational Tools", desc: "Edit PDF files" },
  { name: "Dictionary", icon: BookOpen, link: "/educational-tools/dictionary", category: "Educational Tools", desc: "English dictionary" },
  { name: "Translator", icon: Globe, link: "/educational-tools/translator", category: "Educational Tools", desc: "Translate languages" },

  // BD Special Tools
  { name: "NID Checker", icon: MapPin, link: "/tools/nid-checker", category: "BD Special Tools", desc: "Verify NID information" },
  { name: "Passport Tracker", icon: Globe, link: "/tools/passport", category: "BD Special Tools", desc: "Track passport status" },
  { name: "E-TIN Checker", icon: Landmark, link: "/tools/etin", category: "BD Special Tools", desc: "Check TIN status" },
  { name: "BMD Weather", icon: Sun, link: "/tools/bmd-weather", category: "BD Special Tools", desc: "Bangladesh weather" },
  { name: "Bus Ticket", icon: MapPin, link: "/tools/bus-ticket", category: "BD Special Tools", desc: "Book bus tickets" },
  { name: "Train Schedule", icon: MapPin, link: "/tools/train", category: "BD Special Tools", desc: "Bangladesh train schedule" },
  { name: "Mobile Recharge", icon: Wifi, link: "/tools/recharge", category: "BD Special Tools", desc: "Mobile recharge" },
  { name: "Blood Donor", icon: Heart, link: "/tools/blood-donor", category: "BD Special Tools", desc: "Find blood donors" },
  { name: "Emergency Numbers", icon: Phone, link: "/tools/emergency", category: "BD Special Tools", desc: "Emergency contacts" },

];

// Group tools by category
export const groupedTools: Record<string, Tool[]> = toolsData.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<string, Tool[]>);