
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4">

      {/* Main Title */}
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold">A free online tools site for everyone</h1>
        <p className="text-lg text-gray-600">A collection of free online tools for developers, designers, and everyone.</p>
      </div>

      {/* Search and Categories */}
      <div className="flex justify-center items-center my-8">
        <div className="relative w-full max-w-lg">
          <input type="text" placeholder="Search for tools..." className="w-full py-3 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
        <div className="ml-4">
          <button className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">All Categories</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/daily-use-tools">
            <h3 className="text-xl font-bold mb-2">Daily Use Tools</h3>
            <p className="text-gray-600">A collection of tools for daily use.</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/dev-designer-tools">
            <h3 className="text-xl font-bold mb-2">Developer & Designer Tools</h3>
            <p className="text-gray-600">A collection of tools for developers and designers.</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/freelanching-tools">
            <h3 className="text-xl font-bold mb-2">Freelancing Tools</h3>
            <p className="text-gray-600">A collection of tools for freelancers.</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/islamic">
            <h3 className="text-xl font-bold mb-2">Islamic Tools</h3>
            <p className="text-gray-600">A collection of tools for Islamic purposes.</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/media-tools">
            <h3 className="text-xl font-bold mb-2">Media Tools</h3>
            <p className="text-gray-600">A collection of tools for media purposes.</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/dokan-tools">
            <h3 className="text-xl font-bold mb-2">Dokan Tools</h3>
            <p className="text-gray-600">A collection of tools for dokan (shop) purposes.</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/educational-tools">
            <h3 className="text-xl font-bold mb-2">Educational Tools</h3>
            <p className="text-gray-600">A collection of tools for educational purposes.</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link href="/bd-Localized-Special-tools">
            <h3 className="text-xl font-bold mb-2">BD Localized Special Tools</h3>
            <p className="text-gray-600">A collection of tools for Bangladesh.</p>
          </Link>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href="#">
              <Image className="w-full h-48 object-cover" src="/blog-bg.webp" alt="How to Earn Money From YouTube" width={500} height={300} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">How to Earn Money From YouTube</h3>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href="#">
              <Image className="w-full h-48 object-cover" src="/blog-bg.webp" alt="How to Earn Money From YouTube" width={500} height={300} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">How to Earn Money From YouTube</h3>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href="#">
              <Image className="w-full h-48 object-cover" src="/blog-bg.webp" alt="How to Earn Money From YouTube" width={500} height={300} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">How to Earn Money From YouTube</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Tools */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href="#">
              <Image className="w-full h-48 object-cover" src="/default-thumbnail.webp" alt="Tool Name" width={500} height={300} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tool Name</h3>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href="#">
              <Image className="w-full h-48 object-cover" src="/default-thumbnail.webp" alt="Tool Name" width={500} height={300} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tool Name</h3>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href="#">
              <Image className="w-full h-48 object-cover" src="/default-thumbnail.webp" alt="Tool Name" width={500} height={300} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tool Name</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
