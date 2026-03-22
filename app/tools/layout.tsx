import { Sidebar } from "@/components/sidebar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-[260px]">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
