import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Heart } from "lucide-react";

// This would normally fetch from Firebase
async function getPost(slug: string) {
  // Sample post data
  return {
    title: "Top 10 Free Online Tools for Developers in 2024",
    content: `
      <p>As a developer, having the right tools at your disposal can significantly boost your productivity. In this article, we'll explore the top 10 free online tools that every developer should know about in 2024.</p>
      
      <h2>1. JSON Formatter</h2>
      <p>Working with APIs often means dealing with JSON data. A good JSON formatter helps you visualize and validate your data structure quickly.</p>
      
      <h2>2. Color Picker</h2>
      <p>For front-end developers and designers, a reliable color picker that converts between HEX, RGB, and HSL is essential.</p>
      
      <h2>3. Password Generator</h2>
      <p>Security should never be an afterthought. Generate strong, unique passwords for your development accounts and databases.</p>
      
      <h2>4. Regex Tester</h2>
      <p>Regular expressions can be tricky. A regex tester helps you build and validate your patterns before implementing them in code.</p>
      
      <h2>5. Base64 Encoder/Decoder</h2>
      <p>Essential for working with encoded data, especially when dealing with image data URLs or authentication tokens.</p>
      
      <h2>6. Lorem Ipsum Generator</h2>
      <p>When you need placeholder text for your designs or prototypes, a Lorem Ipsum generator is invaluable.</p>
      
      <h2>7. URL Encoder/Decoder</h2>
      <p>Working with URLs often requires encoding special characters. This tool makes it quick and easy.</p>
      
      <h2>8. CSS Minifier</h2>
      <p>Reduce your CSS file size for better page load times by removing unnecessary whitespace and comments.</p>
      
      <h2>9. Diff Checker</h2>
      <p>Compare two pieces of text or code to find differences. Great for code reviews and debugging.</p>
      
      <h2>10. QR Code Generator</h2>
      <p>Create QR codes for URLs, contact information, or any text data. Perfect for mobile app development and marketing.</p>
      
      <h2>Conclusion</h2>
      <p>These tools are just the beginning. At ToolsBD, we offer all of these and many more free tools to help you work more efficiently. Start exploring today!</p>
    `,
    author: "Admin",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Development",
    slug: slug,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-[260px]">
        <div className="max-w-[900px] mx-auto px-4 py-6 space-y-6">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Article Header */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Heart className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-8xl text-primary/30 font-bold">
                {post.title.charAt(0)}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <article className="bg-card border border-border rounded-2xl p-8">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Posts */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "How to Calculate BMI and What It Means", slug: "how-to-calculate-bmi-health" },
                { title: "Ultimate Guide to Password Security", slug: "ultimate-guide-password-security" },
              ].map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-4 bg-muted rounded-xl hover:bg-primary/10 transition-colors group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
