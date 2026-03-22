
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const tools = [
  {
    icon: "fas fa-mobile-alt",
    title: "BD Mobile Validator",
    description: "Quickly validate Bangladeshi mobile numbers and check network operator information online.",
    href: "/bd-Localized-Special-tools/bd-mobile-validator/",
    views: 0,
  },
  {
    icon: "fas fa-id-card",
    title: "NID Verification",
    description: "Verify national ID cards online and get full information about the citizen identity quickly.",
    href: "/bd-Localized-Special-tools/nid-verification/",
    views: 0,
  },
  {
    icon: "fas fa-car",
    title: "BRTC গাড়ি রেজিস্ট্রেশন",
    description: "Check Bangladeshi vehicle registration details online using BRTC official information.",
    href: "/bd-Localized-Special-tools/btrc/",
    views: 0,
  },
  {
    icon: "fas fa-file-alt",
    title: "জন্ম সনদ",
    description: "Apply for Bangladeshi birth certificates online and track application status easily.",
    href: "/bd-Localized-Special-tools/birth-certificate/",
    views: 0,
  },
  {
    icon: "fas fa-bolt",
    title: "বিদ্যুৎ বিল ক্যালকুলেটর",
    description: "Calculate your electricity bill easily with accurate online utilities for Bangladeshi consumers.",
    href: "/bd-Localized-Special-tools/current-bill/",
    views: 0,
  },
  {
    icon: "fas fa-calculator",
    title: "ভাড়া ক্যালকুলেটর",
    description: "Quickly calculate rental costs, rent per month or year and plan your budget efficiently.",
    href: "/bd-Localized-Special-tools/bara-calculator/",
    views: 0,
  },
  {
    icon: "fas fa-university",
    title: "স্থানীয় ব্যাংক চেকার",
    description: "Check local bank codes, branch info and verify banking details quickly online.",
    href: "/bd-Localized-Special-tools/bank-chacker/",
    views: 0,
  },
];

const BDLocalizedSpecialToolsPage = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            BD Localize Tools
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Essential tools specifically for Bangladesh - Tk to USD Converter, Mobile Recharge Calculators, Local Bill Payments, Bengali Date Converters, BD Tax Calculators, Local Unit Converters, and utilities tailored for Bangladeshi users
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.title}>
              <a className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <i className={tool.icon}></i>
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{tool.title}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{tool.description}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BDLocalizedSpecialToolsPage;
