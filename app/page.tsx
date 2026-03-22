
import Image from 'next/image';
import Link from 'next/link';

import Hero from "./Home/Hero";
import Categories from "./Home/Cetegories";

export default function HomePage() {
  return (
    <main>
      {/* হোম পেজের কম্পোনেন্টগুলো এখানে কল হবে */}
      <Hero />
      <Categories />
      
      {/* আপনি চাইলে আরও সেকশন এখানে যোগ করতে পারেন */}
    </main>
  );
}
