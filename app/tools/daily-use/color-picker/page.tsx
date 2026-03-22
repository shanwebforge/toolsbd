"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check, RefreshCw } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function generateRandomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

const presetColors = [
  "#8e3cfa", "#cc13bd", "#f518f5", "#6a11cb", "#2575fc",
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#84cc16",
];

export default function ColorPickerPage() {
  const [color, setColor] = useState("#8e3cfa");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const colorFormats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "" },
    { label: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "" },
    { label: "RGBA", value: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : "" },
  ];

  const handleCopy = async (format: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleRandomColor = () => {
    setColor(generateRandomColor());
  };

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and convert between HEX, RGB, and HSL formats"
      icon={Palette}
      backHref="/tools/daily-use"
      backLabel="Back to Daily Use Tools"
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Color Preview */}
        <div className="relative">
          <div
            className="w-full aspect-video rounded-2xl shadow-lg transition-colors duration-300"
            style={{ backgroundColor: color }}
          />
          <button
            onClick={handleRandomColor}
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/50 rounded-lg hover:bg-white dark:hover:bg-black/70 transition-colors"
            title="Random Color"
          >
            <RefreshCw className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Color Input */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="w-full h-14 rounded-xl border-2 border-border cursor-pointer transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: color }}
            />
          </div>
          <input
            type="text"
            value={color.toUpperCase()}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                setColor(val);
              }
            }}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground font-mono text-center uppercase focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="#000000"
          />
        </div>

        {/* Color Formats */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Color Formats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {colorFormats.map((format) => (
              <div
                key={format.label}
                className="flex items-center justify-between p-3 bg-muted rounded-xl"
              >
                <div>
                  <div className="text-xs text-muted-foreground">{format.label}</div>
                  <div className="font-mono text-sm text-foreground">{format.value}</div>
                </div>
                <button
                  onClick={() => handleCopy(format.label, format.value)}
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                >
                  {copiedFormat === format.label ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preset Colors */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Preset Colors</h3>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-10 h-10 rounded-lg transition-transform hover:scale-110 ${
                  color === presetColor ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                }`}
                style={{ backgroundColor: presetColor }}
                title={presetColor}
              />
            ))}
          </div>
        </div>

        {/* Color Shades */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Color Shades</h3>
          <div className="flex rounded-xl overflow-hidden">
            {[0.9, 0.7, 0.5, 0.3, 0.1, 0, -0.1, -0.2, -0.3, -0.4].map((factor, index) => {
              const shadeRgb = rgb
                ? {
                    r: Math.min(255, Math.max(0, Math.round(rgb.r + (255 - rgb.r) * factor))),
                    g: Math.min(255, Math.max(0, Math.round(rgb.g + (255 - rgb.g) * factor))),
                    b: Math.min(255, Math.max(0, Math.round(rgb.b + (255 - rgb.b) * factor))),
                  }
                : { r: 0, g: 0, b: 0 };
              
              const shadeHex = rgbToHex(shadeRgb.r, shadeRgb.g, shadeRgb.b);
              
              return (
                <button
                  key={index}
                  onClick={() => setColor(shadeHex)}
                  className="flex-1 h-12 transition-transform hover:scale-y-110"
                  style={{ backgroundColor: shadeHex }}
                  title={shadeHex.toUpperCase()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
