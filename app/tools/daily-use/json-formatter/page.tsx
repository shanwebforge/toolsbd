"use client";

import { useState } from "react";
import { FileJson, Copy, Check, Trash2, Minimize2, Maximize2 } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleSampleJson = () => {
    const sample = {
      name: "ToolsBD",
      version: "1.0.0",
      description: "Free online tools for everyone",
      features: ["BMI Calculator", "Password Generator", "Color Picker"],
      isActive: true,
      stats: {
        users: 50000,
        tools: 100,
        rating: 4.9,
      },
    };
    setInput(JSON.stringify(sample));
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and beautify your JSON data"
      icon={FileJson}
      backHref="/tools/daily-use"
      backLabel="Back to Daily Use Tools"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Indent:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(parseInt(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
          <button
            onClick={handleSampleJson}
            className="px-4 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            Load Sample
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here, e.g., {"name": "John", "age": 30}'
              className="w-full h-[300px] px-4 py-3 rounded-xl border border-border bg-background text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Output</label>
              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here"
                className={`w-full h-[300px] px-4 py-3 rounded-xl border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none ${
                  error ? "border-red-500" : "border-border"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleFormat}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
            Format / Beautify
          </button>
          <button
            onClick={handleMinify}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors"
          >
            <Minimize2 className="w-5 h-5" />
            Minify
          </button>
        </div>

        {/* Stats */}
        {output && !error && (
          <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-xl">
            <div className="text-sm">
              <span className="text-muted-foreground">Characters: </span>
              <span className="font-semibold text-foreground">{output.length}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Lines: </span>
              <span className="font-semibold text-foreground">{output.split("\n").length}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Size: </span>
              <span className="font-semibold text-foreground">
                {(new Blob([output]).size / 1024).toFixed(2)} KB
              </span>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
