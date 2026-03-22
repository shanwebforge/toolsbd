import Link from "next/link";
import Image from "next/image";

const Blog = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <Link href="/blog/youtube-earning">
          {/* Image ব্যবহারের সময় width এবং height অথবা layout fill দিতে হয় */}
          <div className="relative w-full h-48">
             <Image 
                className="object-cover" 
                src="/blog-bg.webp" 
                alt="How to Earn Money" 
                fill 
             />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
               How to Earn Money From YouTube
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
               Learn the best strategies to monetize your channel in 2026.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Blog;