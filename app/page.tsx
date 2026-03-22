import { Sidebar } from "@/components/sidebar";
import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
import { ToolsSection } from "@/components/home/tools-section";
import { BlogSection } from "@/components/home/blog-section";
import { StatsSection } from "@/components/home/stats-section";

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-[260px]">
        <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
          <HeroSection />
          <CategorySection />
          <ToolsSection />
          <BlogSection />
          <StatsSection />
        </div>
      </div>
    </div>
  );
}
