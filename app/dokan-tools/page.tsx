import Link from 'next/link';
import { 
  TrendingUp, 
  Printer, 
  Percent, 
  Wallet, 
  ShoppingCart, 
  FileText, 
  Package, 
  QrCode,
  Store,
  ArrowRight,
  Sparkles,
  Calculator,
  Receipt
} from 'lucide-react';

const DokanToolsPage = () => {
  const tools = [
    { name: 'বিক্রয় ও লেনদেন', href: '/dokan-tools/bikroy-lenden', description: 'সহজে বিক্রয় ও লেনদেনের হিসাব রাখুন', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
    { name: 'কাস্টমার রিসিট প্রিন্ট', href: '/dokan-tools/customer-receipt-print', description: 'গ্রাহকের জন্য রিসিট প্রিন্ট করুন', icon: Printer, color: 'from-blue-500 to-cyan-500' },
    { name: 'ডিসকাউন্ট ক্যালকুলেটর', href: '/dokan-tools/discount-calculator', description: 'দ্রুত ডিসকাউন্ট হিসাব করুন', icon: Percent, color: 'from-amber-500 to-orange-500' },
    { name: 'দৈনিক খরচের হিসাব', href: '/dokan-tools/expense-tracker', description: 'দৈনিক খরচ ট্র্যাক করুন', icon: Wallet, color: 'from-rose-500 to-pink-500' },
    { name: 'গ্রোসারি শপিং লিস্ট', href: '/dokan-tools/grocery-shopping', description: 'শপিং লিস্ট তৈরি করুন', icon: ShoppingCart, color: 'from-green-500 to-emerald-500' },
    { name: 'ইনভয়েস উইথ ভ্যাট', href: '/dokan-tools/invoice-with-vat', description: 'ভ্যাট সহ ইনভয়েস তৈরি করুন', icon: FileText, color: 'from-purple-500 to-indigo-500' },
    { name: 'মালের স্টক', href: '/dokan-tools/maal-stock', description: 'পণ্যের স্টক ব্যবস্থাপনা', icon: Package, color: 'from-indigo-500 to-purple-500' },
    { name: 'QR কোড জেনারেটর', href: '/dokan-tools/qr-code-product', description: 'পণ্যের জন্য QR কোড তৈরি করুন', icon: QrCode, color: 'from-gray-500 to-gray-700' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-transparent min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 mb-4">
            <Store className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">দোকান ব্যবস্থাপনা</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            দোকান টুলস
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            আপনার দোকানের হিসাব-নিকাশ সহজ করার জন্য আধুনিক টুলস। সহজ, দ্রুত এবং সম্পূর্ণ বিনামূল্যে।
          </p>
          
          {/* Stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{tools.length}+ টুলস</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">বিনামূল্যে</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">কোনো রেজিস্ট্রেশন প্রয়োজন নেই</span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <div className="h-full bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-purple-200 dark:hover:border-purple-500/30 relative overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon with Gradient */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} p-2.5 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="relative text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  
                  {/* Explore Link */}
                  <div className="relative mt-6 flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2">
                    ব্যবহার করুন
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Tools Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 p-2.5">
                <Calculator className="w-full h-full text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  ব্যবসা পরিচালনা সহজ করুন
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  আমাদের টুলস ব্যবহার করে আপনার দোকানের সব হিসাব রাখুন
                </p>
              </div>
            </div>
            <Link href="/all-tools">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                সব টুলস দেখুন
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              দোকান পরিচালনার টিপস
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              আপনার ব্যবসা আরও সফল করতে সাহায্য করবে
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'নিয়মিত স্টক চেক করুন',
              'গ্রাহকের তথ্য সংরক্ষণ করুন',
              'দৈনিক খরচের হিসাব রাখুন'
            ].map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-900/30 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DokanToolsPage;