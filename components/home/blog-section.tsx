"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

// Sample blog posts - will be replaced with Firebase data
const blogPosts = [
  {
    id: "1",
    title: "Top 10 Free Online Tools for Developers in 2024",
    excerpt: "Discover the most useful free tools that every developer should know about...",
    image: "/assets/blog/dev-tools.jpg",
    author: "Admin",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    slug: "top-10-free-online-tools-developers",
  },
  {
    id: "2",
    title: "How to Calculate BMI and What It Means for Your Health",
    excerpt: "Understanding Body Mass Index and how it relates to your overall health...",
    image: "/assets/blog/bmi-guide.jpg",
    author: "Health Expert",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    slug: "how-to-calculate-bmi-health",
  },
  {
    id: "3",
    title: "Ultimate Guide to Password Security",
    excerpt: "Learn how to create and manage secure passwords to protect your accounts...",
    image: "/assets/blog/password-security.jpg",
    author: "Security Team",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    slug: "ultimate-guide-password-security",
  },
  {
    id: "4",
    title: "Best Practices for PDF Document Management",
    excerpt: "Tips and tricks for efficiently managing your PDF documents...",
    image: "/assets/blog/pdf-management.jpg",
    author: "Admin",
    date: "Nov 28, 2024",
    readTime: "3 min read",
    slug: "best-practices-pdf-management",
  },
];

export function BlogSection() {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="gradient-text text-2xl md:text-3xl font-extrabold tracking-tight">
          Blog
        </h2>
        <p className="text-muted-foreground mt-3 max-w-[700px] leading-relaxed text-sm md:text-base">
          Articles, tutorials, and insights on technology, programming, and development trends
        </p>
        {/* Dot Line Decoration */}
        <div className="w-[200px] h-5 mx-auto relative opacity-70 mt-3">
          <div className="absolute top-[30%] left-0 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute top-[30%] right-0 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent h-0.5 top-1/2" />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white/70 dark:bg-white/[0.08] border border-border rounded-xl overflow-hidden hover:border-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-video bg-muted overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-4xl text-primary/50">
                  {post.title.charAt(0)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-grow">
                {post.excerpt}
              </p>
              
              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
