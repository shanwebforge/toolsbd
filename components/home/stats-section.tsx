"use client";

import { Wrench, Users, Eye, Star } from "lucide-react";

const stats = [
  {
    icon: Wrench,
    value: "100+",
    label: "Tools Available",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Eye,
    value: "1M+",
    label: "Total Views",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Star,
    value: "4.9",
    label: "User Rating",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];

export function StatsSection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 md:p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.bgColor} rounded-full flex items-center justify-center mb-3`}>
                <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
