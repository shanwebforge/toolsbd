import { Inter } from "next/font/google";
import "./globals.css";
import "./styles.css";
import Header from "@/components/Header";
import FooterNav from "@/components/FooterNav";
import Footer from "@/components/Footer";
import LeftPanel from "@/components/LeftPanel";
import { ThemeProvider } from "next-themes";
import SecurityWrapper from "@/components/SecurityWrapper"; // এটাকে আলাদা ফাইলে রাখাই বেস্ট

const inter = Inter({ subsets: ["latin"] });

// মেটাডেটা এখন কাজ করবে কারণ এটা সার্ভার সাইড
export const metadata = {
  title: "ToolxBD / Free Tools And Ai Hub",
  description: "Advanced Design Engine by Shan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider সবার উপরে থাকবে */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SecurityWrapper>
            <div className="flex flex-col min-h-screen">
              <Header />
              
              <div className="flex flex-1">
                <LeftPanel />

                {/* মেইন কন্টেন্ট এরিয়া */}
                <main className="flex-1 w-full lg:pl-64 transition-all duration-300">
                  {children}
                </main>
              </div>

              <FooterNav />
              <Footer />
            </div>
          </SecurityWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}