import Link from 'next/link';
import { 
  Palette, 
  Key, 
  Eye, 
  Droplet, 
  Code2, 
  Smartphone, 
  TextQuote, 
  Regex, 
  Binary, 
  FileJson, 
  Sparkles, 
  Type, 
  Facebook,
  ArrowRight,
  TrendingUp,
  Brush,
  Zap
} from 'lucide-react';

const tools = [
  { name: 'CSS Gradient Generator', href: '/dev-designer-tools/gradiant-mixer', description: 'Generate beautiful CSS gradients for your projects.', icon: Palette, color: 'from-purple-500 to-pink-500' },
  { name: 'Password Generator', href: '/dev-designer-tools/password-generator', description: 'Generate strong, secure passwords instantly.', icon: Key, color: 'from-amber-500 to-orange-500' },
  { name: 'Color Similarity', href: '/dev-designer-tools/color-similarity', description: 'Find similar colors and complementary shades.', icon: Eye, color: 'from-emerald-500 to-teal-500' },
  { name: 'Color Picker & Palette', href: '/dev-designer-tools/color-picker', description: 'Pick colors and create stunning palettes.', icon: Droplet, color: 'from-cyan-500 to-blue-500' },
  { name: 'HTML, CSS, JS Formatter & Beautifier', href: '/dev-designer-tools/Formatter', description: 'Format and beautify your code for better readability.', icon: Code2, color: 'from-blue-500 to-indigo-500' },
  { name: 'Responsive Design Checker', href: '/dev-designer-tools/responsive-design-checker', description: 'Test your website on different screen sizes.', icon: Smartphone, color: 'from-green-500 to-emerald-500' },
  { name: 'Lorem Ipsum Generator', href: '/dev-designer-tools/lorem-ipsum', description: 'Generate placeholder text for your designs.', icon: TextQuote, color: 'from-slate-500 to-gray-500' },
  { name: 'Regex Tester', href: '/dev-designer-tools/regex-tester', description: 'Test and validate your regular expressions.', icon: Regex, color: 'from-red-500 to-rose-500' },
  { name: 'Base64 Encoder / Decoder', href: '/dev-designer-tools/base64-encoder', description: 'Encode and decode Base64 strings easily.', icon: Binary, color: 'from-violet-500 to-purple-500' },
  { name: 'JSON Formatter & Validator', href: '/dev-designer-tools/json-formatter-validator', description: 'Format and validate your JSON data.', icon: FileJson, color: 'from-yellow-500 to-amber-500' },
  { name: 'Logo Generator', href: '/dev-designer-tools/logo-generator', description: 'Create professional logos for your brand.', icon: Sparkles, color: 'from-indigo-500 to-purple-500' },
  { name: 'Font Preview', href: '/dev-designer-tools/font-preview', description: 'Preview and compare different fonts.', icon: Type, color: 'from-teal-500 to-cyan-500' },
  { name: 'Facebook DP', href: '/dev-designer-tools/facebook-dp', description: 'Create stunning Facebook display pictures.', icon: Facebook, color: 'from-blue-600 to-sky-500' },
];

export default function DevDesignerTools() {
  return (
    <div className="bg-gray-50 dark:bg-transparent min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 mb-4">
            <Brush className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">Creative Toolkit</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Developer & Designer Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Essential tools to supercharge your development and design workflow. Code smarter, design better.
          </p>
          
          {/* Stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{tools.length}+ Professional Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Free for Everyone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">No Signup Required</span>
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
              <Zap className="w-5 h-5" />
              Explore All Developer Tools
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Popular Categories */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Popular Categories
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Find exactly what you need
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Code Tools', 'Design Tools', 'Color Tools', 'Text Tools', 'Security Tools', 'Testing Tools'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}