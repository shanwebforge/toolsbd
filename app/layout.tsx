import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles.css";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import Footer from "@/components/Footer";
import LeftPanel from "@/components/LeftPanel"; // এটি যোগ করা হয়েছে
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToolsBD - Free Tools, Tech, free ai, blog, code, sort code, command, secret code, prompt",
  description: "বাংলায় সহজ কিছু প্রয়োজনীয় অনলাইন টুলস।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          
          <div className="flex">
            {/* LeftPanel শুধু পিসিতে দেখাবে, সেটি কম্পোনেন্টের ভেতরেই কন্ট্রোল করা আছে */}
            <LeftPanel />

            {/* মেইন কন্টেন্ট এরিয়া: পিসিতে বামপাশে ২৪০পিএক্স বা ৬৪ ইউনিট গ্যাপ রাখা হয়েছে */}
            <main className="flex-1 w-full min-h-screen lg:pl-64 transition-all duration-300">
              {children}
            </main>
          </div>

          <FooterNav />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}