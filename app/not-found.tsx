import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-950 px-6 transition-colors duration-300">
      
      {/* 404 Visual */}
      <div className="relative flex flex-col items-center">
        <h1 className="text-[10rem] md:text-[15rem] font-black text-purple-100 dark:text-purple-900/20 select-none leading-none">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <p className="text-3xl md:text-5xl font-bold text-purple-600 dark:text-purple-500 tracking-tight">
            NOT FOUND
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="text-center mt-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Oops! The page has drifted into deep space.
        </h2>
        <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-10 py-3 text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 font-bold rounded-xl transition-all shadow-lg shadow-purple-200 dark:shadow-none text-center"
        >
          Go Home
        </Link>
        
        <Link
          href="/"
          className="px-10 py-3 text-purple-600 dark:text-purple-400 border-2 border-purple-100 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-bold rounded-xl transition-all text-center"
        >
          Contact Support
        </Link>
      </div>

      {/* Background Glows (CSS Only) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-50 dark:bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-50 dark:bg-purple-900/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}