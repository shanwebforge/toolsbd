import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BottomNav } from "@/components/bottom-nav";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ToolsBD - Free Tools, Tech, AI, Blog, Code, Sort Code, Command, Secret Code, Prompt",
  description: "বাংলায় সহজ কিছু প্রয়োজনীয় অনলাইন টুলস। টেক্সট, কনভার্টার, ক্যালকুলেটর, টাইমার এবং আরও অনেক কিছু।",
  keywords: ["tools", "tech", "ai", "blog", "code", "calculator", "converter", "bangla tools"],
  authors: [{ name: "ToolsBD" }],
  openGraph: {
    title: "ToolsBD - Free Tools, Tech, AI, Blog, Code",
    description: "বাংলায় সহজ কিছু প্রয়োজনীয় অনলাইন টুলস।",
    url: "https://toolsbd.vercel.app",
    siteName: "ToolsBD",
    images: [
      {
        url: "/preview-image.png",
        width: 1200,
        height: 630,
        alt: "ToolsBD Preview",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsBD - Free Tools",
    description: "বাংলায় সহজ কিছু প্রয়োজনীয় অনলাইন টুলস।",
    images: ["/preview-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/assets/fav-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/fav-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/fav-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/fav-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/fav-180.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${notoSansBengali.variable} ${hindSiliguri.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-[70px] pb-[60px] md:pb-0 min-h-screen">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
