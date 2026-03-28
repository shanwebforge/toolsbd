import { 
  Wand2, Scissors, Code2, Globe, Palette, Layers, 
  Clock, Calendar, Type, CaseSensitive, Calculator, 
  Percent, Coins, LineChart, Zap, ShieldCheck, 
  Instagram, Share2, ImageIcon, Maximize, FileText, 
  FileCode, RefreshCcw, FileAudio, Lock, EyeOff, Sparkles,
  Search, Hash, Binary, Braces, FileJson, Layout, 
  MousePointer2, PaletteIcon, ClipboardList, ListChecks, 
  Timer, Languages, PenTool, Activity, Heart, 
  Wallet, Receipt, Box, ShoppingCart, UserCog, 
  History, QrCode, Mic2, Music, Video, Facebook, 
  Smartphone, FileUp, FileDown, ShieldAlert, Moon, 
  BookOpen, GraduationCap, BrainCircuit, HelpCircle, Fingerprint,  SignalHigh, FileCheck,  Home, Landmark, CalendarDays, 
  Mic, Volume2, SearchCode, Shapes, Eye, ReceiptText,  Briefcase,   CreditCard, Users
} from 'lucide-react';

export interface Tool {
  id: string;
  catId: string;
  name: string;
  desc: string;
  tag: string;
  path: string;
  icon: any; 
}

export const ALL_TOOLS: Tool[] = [
  // 1. AI Tools (ai-tools)
  { id: 'ai-logo-gen', catId: 'ai-tools', name: 'AI Logo Maker', desc: 'Create professional logos using AI canvas engine.', tag: 'AI', path: '/ai-tools/logo-gen', icon: Wand2 },
  { id: 'bg-remover', catId: 'ai-tools', name: 'AI BG Remover', desc: 'Remove image backgrounds instantly with high precision.', tag: 'PRO', path: '/ai-tools/bg-remover', icon: Scissors },
  { id: 'ai-writer', catId: 'ai-tools', name: 'AI Content Writer', desc: 'Generate high-quality articles, blogs and scripts.', tag: 'AI', path: '/ai-tools/writer', icon: Sparkles },

  // 2. Developer Tools (dev-tools)
  { id: 'json-fmt', catId: 'dev-tools', name: 'JSON Formatter', desc: 'Prettify, minify and validate JSON data structures.', tag: 'Dev', path: '/dev-tools/json-fmt', icon: FileJson },
  { id: 'html-preview', catId: 'dev-tools', name: 'HTML Previewer', desc: 'Live preview your HTML and CSS code snippets.', tag: 'Web', path: '/dev-tools/html-preview', icon: Globe },
  { id: 'base64-encoder', catId: 'dev-tools', name: 'Base64 Converter', desc: 'Encode and Decode strings to Base64 format securely.', tag: 'Secure', path: '/dev-tools/base64-encoder', icon: Binary },
  { id: 'css-minifier', catId: 'dev-tools', name: 'CSS Minifier', desc: 'Compress CSS code to reduce file size and load time.', tag: 'Speed', path: '/dev-tools/css-minifier', icon: Code2 },
  { id: 'js-minifier', catId: 'dev-tools', name: 'JS Minifier', desc: 'Optimize JavaScript code by removing unnecessary chars.', tag: 'Dev', path: '/dev-tools/js-minifier', icon: Braces },
  { id: 'regex-tester', catId: 'dev-tools', name: 'Regex Tester', desc: 'Test and validate regular expressions in real-time.', tag: 'Utility', path: '/dev-tools/regex-tester', icon: SearchCode },
  { id: 'shadow', catId: 'dev-tools', name: 'Shadow Generator', desc: 'Design beautiful CSS box-shadows with live preview.', tag: 'UI', path: '/dev-tools/shadow', icon: Layout },
  { id: 'Formatter', catId: 'dev-tools', name: 'Multi Formatter', desc: 'Format SQL, XML, and other languages instantly.', tag: 'Tool', path: '/dev-tools/Formatter', icon: Code2 },
  { id: 'responsive-design', catId: 'dev-tools', name: 'Viewport Tester', desc: 'Check website responsiveness on different screens.', tag: 'UI/UX', path: '/dev-tools/responsive-design', icon: Smartphone },
  

  // 3. Designer Tools (designer-tools)
  { id: 'color-palette', catId: 'designer-tools', name: 'Palette Gen', desc: 'Generate premium color schemes for modern UI/UX.', tag: 'Design', path: '/design-tools/color-palette', icon: Palette },
  { id: 'color-picker', catId: 'designer-tools', name: 'Color Picker', desc: 'Pick and find hex, rgb, and hsl color codes.', tag: 'Visual', path: '/design-tools/color-picker', icon: MousePointer2 },
  { id: 'color-similarity', catId: 'designer-tools', name: 'Color Matcher', desc: 'Find similar colors and contrast ratios easily.', tag: 'UX', path: '/design-tools/color-similarity', icon: PaletteIcon },
  { id: 'gradiant-mixer', catId: 'designer-tools', name: 'Gradient Mixer', desc: 'Blend multiple colors to create beautiful gradients.', tag: 'UI', path: '/design-tools/gradiant-mixer', icon: Layers },
  { id: 'icon-generator', catId: 'designer-tools', name: 'Icon Generator', desc: 'Generate custom web icons for your projects.', tag: 'Asset', path: '/design-tools/icon-generator', icon: Shapes },
  { id: 'logo-generator', catId: 'designer-tools', name: 'Logo Studio', desc: 'Create unique vector logos for your brand identity.', tag: 'Brand', path: '/design-tools/logo-generator', icon: Wand2 },
  { id: 'svg-blob', catId: 'designer-tools', name: 'SVG Blob Maker', desc: 'Create unique organic SVG shapes for web designs.', tag: 'SVG', path: '/design-tools/blobs', icon: Layers },

  // 4. Daily Use Tools (daily-tools)
  { id: 'daily-habit-tracker', catId: 'daily-tools', name: 'Habit Tracker', desc: 'Track your daily routines and achieve your goals.', tag: 'Habit', path: '/daily-tools/daily-habit-tracker', icon: ListChecks },
  { id: 'notepad', catId: 'daily-tools', name: 'Quick Note', desc: 'A simple and fast notepad for your daily ideas.', tag: 'Task', path: '/daily-tools/notepad', icon: ClipboardList },
  { id: 'number-to-word', catId: 'daily-tools', name: 'Number to Word', desc: 'Convert numeric values into readable text formats.', tag: 'Util', path: '/daily-tools/number-to-word', icon: Type },
  { id: 'speed-test', catId: 'daily-tools', name: 'Speed Test', desc: 'Check your internet connection speed instantly.', tag: 'Web', path: '/daily-tools/speed-test', icon: Zap },
  { id: 'typing-speed-test', catId: 'daily-tools', name: 'Typing Master', desc: 'Test and improve your typing speed and accuracy.', tag: 'Skill', path: '/daily-tools/typing-speed-test', icon: Type },
  { id: 'todo-app', catId: 'daily-tools', name: 'Tasks Manager', desc: 'Organize your work with a smart to-do list.', tag: 'Daily', path: '/daily-tools/todo-app', icon: ListChecks },

  // 5. Text Tools (text-tools)
  { id: 'lorem-ipsum', catId: 'text-tools', name: 'Lorem Ipsum', desc: 'Generate placeholder text for your design layouts.', tag: 'Content', path: '/text-tools/lorem-ipsum', icon: FileText },
  { id: 'word-counter', catId: 'text-tools', name: 'Word Counter', desc: 'Count words, chars and reading time estimations.', tag: 'Stats', path: '/text-tools/word-counter', icon: Type },
  { id: 'case-conv', catId: 'text-tools', name: 'Case Converter', desc: 'Convert text to UPPER, lower or Sentence cases.', tag: 'Quick', path: '/text-tools/case-conv', icon: CaseSensitive },
  { id: 'font-preview', catId: 'text-tools', name: 'Font Previewer', desc: 'Preview and compare different web fonts easily.', tag: 'Design', path: '/text-tools/font-preview', icon: Eye },
  { id: 'text-to-handwriting', catId: 'text-tools', name: 'Handwriter', desc: 'Convert digital text into realistic handwriting.', tag: 'Creative', path: '/text-tools/text-to-handwriting', icon: PenTool },

  // 6. Calculator Tools (calc-tools)
  { id: 'age-calculator', catId: 'calc-tools', name: 'Age Calculator', desc: 'Calculate exact age, months and days with ease.', tag: 'Daily', path: '/calculator-tools/age-calculator', icon: Calendar },
  { id: 'discount-calculator', catId: 'calc-tools', name: 'Discount Calc', desc: 'Quickly calculate savings and final prices.', tag: 'Shop', path: '/calculator-tools/discount-calculator', icon: Percent },
  { id: 'percentage-calculator', catId: 'calc-tools', name: 'Percent Solver', desc: 'Solve complex percentage math problems instantly.', tag: 'Math', path: '/calculator-tools/percentage-calculator', icon: Calculator },
  { id: 'date-calculator', catId: 'calc-tools', name: 'Date Diff', desc: 'Find difference between two dates accurately.', tag: 'Time', path: '/calculator-tools/date-calculator', icon: Clock },
  { id: 'gpa-cgpa-calculator', catId: 'calc-tools', name: 'GPA/CGPA Calc', desc: 'Calculate your academic GPA and CGPA scores.', tag: 'Edu', path: '/calculator-tools/gpa-cgpa-calculator', icon: GraduationCap },
  { id: 'bmi-calculator', catId: 'calc-tools', name: 'BMI Tracker', desc: 'Check your Body Mass Index for better health.', tag: 'Health', path: '/calculator-tools/bmi-calculator', icon: Activity },
  { id: 'jakat-calculator', catId: 'calc-tools', name: 'Zakat Calc', desc: 'Calculate your Zakat accurately based on nisab.', tag: 'Faith', path: '/calculator-tools/jakat-calculator', icon: Coins },

  // 7. Finance Tools (finance-tools)
  { id: 'currency-conv', catId: 'finance-tools', name: 'Currency Pro', desc: 'Get real-time global currency exchange rates.', tag: 'Money', path: '/finance-tools/currency', icon: Globe },
  { id: 'loan-emi', catId: 'finance-tools', name: 'EMI Calculator', desc: 'Calculate monthly loan installments with ease.', tag: 'Bank', path: '/finance-tools/loan-emi', icon: LineChart },
  { id: 'barcode', catId: 'finance-tools', name: 'Barcode Gen', desc: 'Generate barcodes for your products and items.', tag: 'Stock', path: '/finance-tools/barcode', icon: Hash },
  { id: 'customer-manager', catId: 'finance-tools', name: 'CRM Lite', desc: 'Manage your customer data and relationships.', tag: 'Admin', path: '/finance-tools/customer-manager', icon: UserCog },
  { id: 'expense', catId: 'finance-tools', name: 'Expense Tracker', desc: 'Monitor your daily spending and budget plans.', tag: 'Budget', path: '/finance-tools/expense', icon: Wallet },
  { id: 'inventory', catId: 'finance-tools', name: 'Stock Manager', desc: 'Track your product inventory and stock levels.', tag: 'Biz', path: '/finance-tools/inventory', icon: Box },
  { id: 'invoice-with-vat', catId: 'finance-tools', name: 'VAT Invoice', desc: 'Generate professional invoices including VAT.', tag: 'Finance', path: '/finance-tools/invoice-with-vat', icon: Receipt },
  { id: 'order-manager', catId: 'finance-tools', name: 'Order Tracker', desc: 'Manage and track customer orders efficiently.', tag: 'Sale', path: '/finance-tools/order-manager', icon: ShoppingCart },
  { id: 'product-manager', catId: 'finance-tools', name: 'Product Suite', desc: 'Organize your products and pricing details.', tag: 'Store', path: '/finance-tools/product-manager', icon: Box },
  { id: 'bikroy-lenden', catId: 'finance-tools', name: 'Sales Ledger', desc: 'Keep track of all your sales and transactions.', tag: 'Report', path: '/finance-tools/bikroy-lenden', icon: History },
  { id: 'maal-stock', catId: 'finance-tools', name: 'Warehouse Pro', desc: 'Advanced warehouse and stock management.', tag: 'Biz', path: '/finance-tools/maal-stock', icon: Layers },
  { id: 'receipt-print', catId: 'finance-tools', name: 'Receipt Maker', desc: 'Create and print payment receipts instantly.', tag: 'Finance', path: '/finance-tools/receipt-print', icon: Receipt },
  { id: 'grocery-shopping', catId: 'finance-tools', name: 'Grocery List', desc: 'Manage your grocery shopping lists and costs.', tag: 'Personal', path: '/finance-tools/grocery-shopping', icon: ShoppingCart },

  // 8. Online Generators (gen-tools)
  { id: 'qr-gen', catId: 'gen-tools', name: 'QR Code Studio', desc: 'Generate custom QR codes for URLs and text.', tag: 'Web', path: '/generotors-tools/qr-gen', icon: QrCode },
  { id: 'pass-gen', catId: 'gen-tools', name: 'Secure Pass Gen', desc: 'Create highly secure and random passwords.', tag: 'Secure', path: '/security/password', icon: ShieldCheck },
  { id: 'flyer-generator', catId: 'gen-tools', name: 'Flyer Generator', desc: 'Design professional marketing flyers instantly.', tag: 'Creative', path: '/generators-tools/flyer-generator', icon: Layout },
  { id: 'invoice-genarator', catId: 'gen-tools', name: 'Invoice Generator', desc: 'Generate professional billing invoices for clients.', tag: 'Business', path: '/generators-tools/invoice-genarator', icon: ReceiptText },

  // 9. Social Media (social-tools)
  { id: 'voiceover', catId: 'media-tools', name: 'AI Voiceover', desc: 'Convert text to natural human-like voiceovers.', tag: 'Media', path: '/media-tools/voiceover', icon: Mic2 },
  { id: 'mp3-cutter', catId: 'media-tools', name: 'Audio Cutter', desc: 'Trim and cut MP3 files for ringtones and clips.', tag: 'Music', path: '/media-tools/mp3-cutter', icon: Scissors },
  { id: 'mp3-volume-booster', catId: 'media-tools', name: 'Volume Booster', desc: 'Increase and boost audio volume without noise.', tag: 'Audio', path: '/media-tools/mp3-volume-booster', icon: Volume2 },
  { id: 'bangla-subtitle', catId: 'media-tools', name: 'Subtitle Gen', desc: 'Generate subtitles for videos in Bangla easily.', tag: 'Video', path: '/media-tools/bangla-subtitle', icon: FileText },
  { id: 'content-scheduler', catId: 'media-tools', name: 'Post Scheduler', desc: 'Plan and schedule your social media content.', tag: 'Growth', path: '/media-tools/content-scheduler', icon: Calendar },
  { id: 'youtube-downloader', catId: 'media-tools', name: 'YT Downloader', desc: 'Save your favorite videos for offline viewing.', tag: 'Web', path: '/media-tools/youtube-downloader', icon: Video },
  { id: 'facebook-dp', catId: 'media-tools', name: 'FB Frame Maker', desc: 'Design professional frames for your FB profile.', tag: 'Social', path: '/media-tools/facebook-dp', icon: Facebook },
  { id: 'insta-bio', catId: 'media-tools', name: 'Insta Bio Gen', desc: 'Create stylish and catchy bios for Instagram.', tag: 'Social', path: '/media-tools/insta-bio', icon: Instagram },
  { id: 'hashtag-gen', catId: 'media-tools', name: 'Hashtag Finder', desc: 'Find trending hashtags to boost your reach.', tag: 'Growth', path: '/media-tools/hashtags', icon: Hash },

  // 10. Image Tools (image-tools)
  { id: 'img-compress', catId: 'image-tools', name: 'Image Optimizer', desc: 'Reduce image size without quality loss.', tag: 'Tool', path: '/image-tools/image-compressor', icon: ImageIcon },
  { id: 'img-resize', catId: 'image-tools', name: 'Smart Resizer', desc: 'Resize images to custom width and height.', tag: 'Free', path: '/image-tools/resize', icon: Maximize },
  { id: 'bg-remover', catId: 'image-tools', name: 'BG Remover', desc: 'Remove backgrounds instantly with AI accuracy.', tag: 'PRO', path: '/image-tools/bg-remover', icon: Scissors },

  // 11. PDF Tools (pdf-tools)
  { id: 'pdf-to-word', catId: 'pdf-tools', name: 'PDF to Word', desc: 'Convert PDF documents to editable Word files.', tag: 'PDF', path: '/pdf-tools/pdf-to-word', icon: FileText },
  { id: 'merge-pdf', catId: 'pdf-tools', name: 'Merge PDF', desc: 'Combine multiple PDF files into one document.', tag: 'PDF', path: '/pdf-tools/merge', icon: FileCode },

  // 12. File Converter (converter-tools)
  { id: 'video-to-mp3', catId: 'converter-tools', name: 'Audio Extractor', desc: 'Convert MP4/Video to high-quality MP3 audio.', tag: 'Media', path: '/converter-tools/video-to-audio', icon: FileAudio },
  { id: 'unit-conv', catId: 'converter-tools', name: 'Unit Converter', desc: 'Convert Length, Mass and Data units easily.', tag: 'Daily', path: '/converter-tools/unit-converter', icon: RefreshCcw },

  // 13. Security & Privacy (security-tools)
  { id: 'hash-gen', catId: 'security-tools', name: 'Hash Generator', desc: 'Generate secure MD5, SHA-1, SHA-256 hashes.', tag: 'Cyber', path: '/security/hash', icon: Hash },
  { id: 'hidden-text', catId: 'security-tools', name: 'Text Encryptor', desc: 'Encrypt private messages with a secure key.', tag: 'Secure', path: '/security/encrypt', icon: EyeOff },
  { id: 'pass-gen', catId: 'security-tools', name: 'Password Gen', desc: 'Generate strong and unbreakable passwords.', tag: 'Cyber', path: '/security/password', icon: Lock },

  // 14. Education (educational-tools)
  { id: 'grammar-checker', catId: 'educational-tools', name: 'Grammar Pro', desc: 'Fix spelling and grammar errors instantly.', tag: 'Write', path: '/educational-tools/grammar-checker', icon: Languages },
  { id: 'flash-card', catId: 'educational-tools', name: 'Flash Cards', desc: 'Memorize topics faster with digital flashcards.', tag: 'Study', path: '/educational-tools/flash-card', icon: Layers },
  { id: 'math-solver', catId: 'educational-tools', name: 'Math Solver', desc: 'Step-by-step solutions for math problems.', tag: 'Learn', path: '/educational-tools/math-solver', icon: BrainCircuit },
  { id: 'mcq-practice', catId: 'educational-tools', name: 'MCQ Master', desc: 'Practice and test your knowledge with MCQs.', tag: 'Exam', path: '/educational-tools/mcq-practice', icon: ListChecks },
  { id: 'study-timer', catId: 'educational-tools', name: 'Focus Timer', desc: 'Stay focused with Pomodoro and study timers.', tag: 'Focus', path: '/educational-tools/study-timer', icon: Timer },
  { id: 'syllabus-breakdown', catId: 'educational-tools', name: 'Syllabus Plan', desc: 'Break down your syllabus into easy tasks.', tag: 'Plan', path: '/educational-tools/syllabus-breakdown', icon: FileText },
  { id: 'time-table', catId: 'educational-tools', name: 'Timetable Gen', desc: 'Create a perfect schedule for your classes.', tag: 'Daily', path: '/educational-tools/time-table', icon: Calendar },
  { id: 'viva-question', catId: 'educational-tools', name: 'Viva Prep', desc: 'Common questions and answers for viva exams.', tag: 'Prep', path: '/educational-tools/viva-question', icon: HelpCircle },
  { id: 'voice-pronunciation-generator', catId: 'educational-tools', name: 'Pronunciation', desc: 'Learn how to pronounce any word correctly.', tag: 'Lang', path: '/educational-tools/voice-pronunciation-generator', icon: Mic },

  // 15. Islamic Tools (islamic-tools)
  { id: 'digital-tasbih', catId: 'islamic-tools', name: 'Tasbih Counter', desc: 'A digital counter for your daily dhikr.', tag: 'Faith', path: '/islamic/digital-tasbih', icon: Activity },
  { id: 'islamic-name', catId: 'islamic-tools', name: 'Baby Names', desc: 'Find meaningful Islamic names for babies.', tag: 'Names', path: '/islamic-name', icon: Heart },
  { id: 'islamic-quiz', catId: 'islamic-tools', name: 'Islamic Quiz', desc: 'Test your knowledge about Islam with quizzes.', tag: 'Learn', path: '/islamic-quiz', icon: BookOpen },
  { id: 'quran-audio', catId: 'islamic-tools', name: 'Quran Player', desc: 'Listen to beautiful Quran recitations online.', tag: 'Listen', path: '/islamic/quran-audio', icon: Music },
  { id: 'quran-search', catId: 'islamic-tools', name: 'Quran Search', desc: 'Search and find verses from the Holy Quran.', tag: 'Search', path: '/islamic/quran-search', icon: Search },

  // 16. Freelanching Tools (freelanching-tools)
  { id: 'client-manager', catId: 'freelanching-tools', name: 'Client Manager', desc: 'Organize and manage your client base efficiently.', tag: 'Business', path: '/freelanching-tools/client-manager', icon: Users },
{ id: 'client-payment-tracker', catId: 'freelanching-tools', name: 'Payment Tracker', desc: 'Keep track of client payments and pending dues.', tag: 'Finance', path: '/freelanching-tools/client-payment-tracker', icon: CreditCard },
{ id: 'contract-template-generator', catId: 'freelanching-tools', name: 'Contract Generator', desc: 'Create professional service contracts for clients.', tag: 'Legal', path: '/freelanching-tools/contract-template-generator', icon: FileText },
{ id: 'daily-log', catId: 'freelanching-tools', name: 'Daily Log', desc: 'Log your daily work progress and focus hours.', tag: 'Productivity', path: '/freelanching-tools/daily-log', icon: ClipboardList },
{ id: 'employee-evaluation', catId: 'freelanching-tools', name: 'Team Evaluation', desc: 'Assess and monitor employee or assistant performance.', tag: 'Management', path: '/freelanching-tools/employee-evaluation', icon: LineChart },
{ id: 'fiverr-gig-keyword', catId: 'freelanching-tools', name: 'Gig SEO Tool', desc: 'Find high-ranking keywords for your Fiverr gigs.', tag: 'SEO', path: '/freelanching-tools/fiverr-gig-keyword', icon: SearchCode },
{ id: 'project-cost-estimator', catId: 'freelanching-tools', name: 'Cost Estimator', desc: 'Calculate the estimated budget for new projects.', tag: 'Estimator', path: '/freelanching-tools/project-cost-estimator', icon: Calculator },
{ id: 'project-manager', catId: 'freelanching-tools', name: 'Project Manager', desc: 'Track project milestones and delivery deadlines.', tag: 'Workflow', path: '/freelanching-tools/project-manager', icon: Briefcase },
{ id: 'time-tracking', catId: 'freelanching-tools', name: 'Time Tracker', desc: 'Measure how much time you spend on each task.', tag: 'Timing', path: '/freelanching-tools/time-tracking', icon: Clock } ,


{ id: 'bangla-calendar', catId: 'bd-tools', name: 'বাংলা ক্যালেন্ডার', desc: 'আজকের বাংলা তারিখ এবং সরকারি ছুটির তালিকা দেখুন।', tag: 'ক্যালেন্ডার', path: '/bd-tools/bangla-calendar', icon: CalendarDays },
{ id: 'bank-chacker', catId: 'bd-tools', name: 'ব্যাংক তথ্য যাচাই', desc: 'সকল ব্যাংকের রাউটিং নাম্বার এবং অনলাইন ব্যাংকিং ডিটেইলস।', tag: 'ব্যাংকিং', path: '/bd-tools/bank-chacker', icon: Landmark },
{ id: 'bara-calculator', catId: 'bd-tools', name: 'বাড়ি ভাড়া ক্যালকুলেটর', desc: 'আপনার মাসিক বাড়ি ভাড়া এবং ইউটিলিটি বিল সহজে হিসাব করুন।', tag: 'হিসাব', path: '/bd-tools/bara-calculator', icon: Home },
{ id: 'bd-mobile-validator', catId: 'bd-tools', name: 'মোবাইল নাম্বার যাচাই', desc: 'যেকোনো বিডি মোবাইল অপারেটর নাম্বার ভ্যালিড কি না চেক করুন।', tag: 'ভ্যালিডেটর', path: '/bd-tools/bd-mobile-validator', icon: Smartphone },
{ id: 'birth-certificate', catId: 'bd-tools', name: 'জন্ম নিবন্ধন ট্র্যাকার', desc: 'অনলাইনে আপনার জন্ম নিবন্ধন যাচাই এবং স্ট্যাটাস চেক করুন।', tag: 'সরকারি', path: '/bd-tools/birth-certificate', icon: FileCheck },
{ id: 'btrc', catId: 'bd-tools', name: 'বিটিআরসি সার্ভিস', desc: 'আপনার নামে কয়টি সিম আছে এবং অন্যান্য বিটিআরসি তথ্য।', tag: 'টেলিকম', path: '/bd-tools/btrc', icon: SignalHigh },
{ id: 'current-bill', catId: 'bd-tools', name: 'বিদ্যুৎ বিল ক্যালকুলেটর', desc: 'মাসিক বিদ্যুৎ খরচ এবং বিলের পরিমাণ ঘরে বসেই হিসাব করুন।', tag: 'ইউটিলিটি', path: '/bd-tools/current-bill', icon: Zap },
{ id: 'nid-verification', catId: 'bd-tools', name: 'এনআইডি যাচাই', desc: 'আপনার ভোটার আইডি কার্ড বা এনআইডি ইনফরমেশন ভেরিফাই করুন।', tag: 'ভেরিফিকেশন', path: '/bd-tools/nid-verification', icon: Fingerprint },
 
];

export const getToolsByCat = (catId: string) => {
  return ALL_TOOLS.filter(tool => tool.catId === catId);
};