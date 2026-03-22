import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";

// Sample blog posts - will be replaced with Firebase data
const blogPosts = [
  {
    id: "1",
    title: "Top 10 Free Online Tools for Developers in 2024",
    excerpt: "Discover the most useful free tools that every developer should know about. From code formatters to design tools, these will boost your productivity.",
    image: "/assets/blog/dev-tools.jpg",
    author: "Admin",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Development",
    slug: "top-10-free-online-tools-developers",
  },
  {
    id: "2",
    title: "How to Calculate BMI and What It Means for Your Health",
    excerpt: "Understanding Body Mass Index and how it relates to your overall health. Learn the formula and what different BMI ranges indicate.",
    image: "/assets/blog/bmi-guide.jpg",
    author: "Health Expert",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    category: "Health",
    slug: "how-to-calculate-bmi-health",
  },
  {
    id: "3",
    title: "Ultimate Guide to Password Security",
    excerpt: "Learn how to create and manage secure passwords to protect your accounts. Best practices for password hygiene in 2024.",
    image: "/assets/blog/password-security.jpg",
    author: "Security Team",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    category: "Security",
    slug: "ultimate-guide-password-security",
  },
  {
    id: "4",
    title: "Best Practices for PDF Document Management",
    excerpt: "Tips and tricks for efficiently managing your PDF documents. Learn about compression, merging, and conversion tools.",
    image: "/assets/blog/pdf-management.jpg",
    author: "Admin",
    date: "Nov 28, 2024",
    readTime: "3 min read",
    category: "Productivity",
    slug: "best-practices-pdf-management",
  },
  {
    id: "5",
    title: "Introduction to Color Theory for Web Design",
    excerpt: "Understanding color theory basics and how to apply them in web design. Create visually appealing websites with proper color choices.",
    image: "/assets/blog/color-theory.jpg",
    author: "Design Team",
    date: "Nov 20, 2024",
    readTime: "7 min read",
    category: "Design",
    slug: "introduction-color-theory-web-design",
  },
  {
    id: "6",
    title: "Improve Your Typing Speed: Tips and Techniques",
    excerpt: "Practical tips to boost your typing speed and accuracy. From proper posture to keyboard shortcuts, master the art of fast typing.",
    image: "/assets/blog/typing-tips.jpg",
    author: "Admin",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    category: "Productivity",
    slug: "improve-typing-speed-tips",
  },
];

const categories = ["All", "Development", "Health", "Security", "Productivity", "Design"];

export default function BlogPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-[260px]">
        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          {/* Page Header */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <h1 className="gradient-text text-3xl md:text-4xl font-extrabold mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground max-w-[600px] mx-auto mb-6">
              Articles, tutorials, and insights on technology, programming, design, and productivity.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-12 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-6xl text-primary/30 font-bold">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
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

          {/* Load More */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold text-sm hover:bg-muted/80 transition-colors">
              <span>Load More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
