"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { type ThemeProviderProps } from "next-themes/dist/types";

// NextThemesProvider কে ডাইনামিকালি লোড করছি এবং SSR পুরোপুরি অফ করে দিচ্ছি
const NextThemesProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  { 
    ssr: false,
    loading: () => <>{null}</> // লোড হওয়ার আগ পর্যন্ত কিছুই দেখাবে না
  }
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // যতক্ষণ মাউন্ট না হচ্ছে, ততক্ষণ কোনো স্ক্রিপ্ট ইনজেক্ট হওয়ার সুযোগই পাবে না
  if (!mounted) {
    return (
      <div suppressHydrationWarning style={{ display: 'contents' }}>
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider 
      {...props} 
      enableSystem={false} 
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}