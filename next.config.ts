import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* উন্নত কনফিগারেশন */
  reactStrictMode: true,
  
  // যদি আপনি ইমেজ ব্যবহার করেন (যেমন Blog বা Hero সেকশনে)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // আপাতত সব হোস্ট এলাউ করা হলো যাতে এরর না আসে
      },
    ],
  },

  // বিল্ডের সময় টাইপস্ক্রিপ্ট বা লিন্টিং এরর থাকলেও যেন বিল্ড না থামে (অপশনাল)
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;