"use client";

import { useState, useCallback } from "react";
import { Lock, Copy, RefreshCw, Check, Shield } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(options: PasswordOptions): string {
  let chars = "";
  if (options.uppercase) chars += UPPERCASE;
  if (options.lowercase) chars += LOWERCASE;
  if (options.numbers) chars += NUMBERS;
  if (options.symbols) chars += SYMBOLS;

  if (chars === "") return "";

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function calculateStrength(password: string): { strength: number; label: string; color: string } {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (password.length >= 16) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { strength: 1, label: "Weak", color: "bg-red-500" };
  if (strength <= 4) return { strength: 2, label: "Fair", color: "bg-yellow-500" };
  if (strength <= 5) return { strength: 3, label: "Good", color: "bg-blue-500" };
  return { strength: 4, label: "Strong", color: "bg-green-500" };
}

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
  }, [options]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = password ? calculateStrength(password) : null;

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong and secure passwords for your accounts"
      icon={Lock}
      backHref="/tools/daily-use"
      backLabel="Back to Daily Use Tools"
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Password Display */}
        <div className="relative">
          <div className="flex items-center gap-2 p-4 bg-muted rounded-xl border border-border">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Click generate to create password"
              className="flex-1 bg-transparent text-lg font-mono text-foreground focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-background rounded-lg transition-colors"
              disabled={!password}
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
          
          {/* Strength Indicator */}
          {strength && (
            <div className="mt-3 space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      level <= strength.strength ? strength.color : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password Strength</span>
                <span className={`font-medium ${strength.color.replace("bg-", "text-")}`}>
                  {strength.label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Password Length</label>
            <span className="text-sm font-bold text-primary">{options.length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Include Characters</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "uppercase" as const, label: "Uppercase (A-Z)" },
              { key: "lowercase" as const, label: "Lowercase (a-z)" },
              { key: "numbers" as const, label: "Numbers (0-9)" },
              { key: "symbols" as const, label: "Symbols (!@#$)" },
            ].map((option) => (
              <label
                key={option.key}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  options[option.key]
                    ? "bg-primary/10 border-primary"
                    : "bg-muted border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={options[option.key]}
                  onChange={(e) => setOptions({ ...options, [option.key]: e.target.checked })}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center ${
                    options[option.key] ? "bg-primary" : "bg-background border border-border"
                  }`}
                >
                  {options[option.key] && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Password
        </button>

        {/* Tips */}
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Security Tips</p>
              <ul className="space-y-1">
                <li>Use at least 12 characters for better security</li>
                <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
                <li>Never reuse passwords across different accounts</li>
                <li>Consider using a password manager</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
