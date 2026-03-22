
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a>
              <Image
                src="/logo.webp"
                alt="ToolsBD"
                width={161}
                height={56}
                className="cursor-pointer"
              />
            </a>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-600 dark:hover:text-gray-300">Home</a>
          </Link>
          <Link href="/blog" legacyBehavior>
            <a className="hover:text-gray-600 dark:hover:text-gray-300">Blog</a>
          </Link>
          <a
            href="//"
            className="hover:text-gray-600 dark:hover:text-gray-300"
          >
            Shop
          </a>
          <Link href="/nav-menu/about" legacyBehavior>
            <a className="hover:text-gray-600 dark:hover:text-gray-300">
              About
            </a>
          </Link>
          <Link href="/nav-menu/service" legacyBehavior>
            <a className="hover:text-gray-600 dark:hover:text-gray-300">
              Services
            </a>
          </Link>
          <Link href="/nav-menu/contact" legacyBehavior>
            <a className="hover:text-gray-600 dark:hover:text-gray-300">
              Contact
            </a>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
