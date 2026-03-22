"use client";

import { useState } from "react";
import { Calculator, RotateCcw, Info } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

type BMICategory = "underweight" | "normal" | "overweight" | "obese";

interface BMIResult {
  bmi: number;
  category: BMICategory;
  message: string;
  color: string;
}

const categoryInfo: Record<BMICategory, { message: string; color: string }> = {
  underweight: {
    message: "You are underweight. Consider consulting a healthcare provider.",
    color: "text-blue-500",
  },
  normal: {
    message: "You have a normal weight. Keep up the healthy lifestyle!",
    color: "text-green-500",
  },
  overweight: {
    message: "You are overweight. Consider a balanced diet and exercise.",
    color: "text-yellow-500",
  },
  obese: {
    message: "You are obese. Please consult a healthcare provider for advice.",
    color: "text-red-500",
  },
};

function calculateBMI(weight: number, height: number): BMIResult {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category: BMICategory;
  if (bmi < 18.5) {
    category = "underweight";
  } else if (bmi < 25) {
    category = "normal";
  } else if (bmi < 30) {
    category = "overweight";
  } else {
    category = "obese";
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    ...categoryInfo[category],
  };
}

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [result, setResult] = useState<BMIResult | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert("Please enter valid weight and height values");
      return;
    }

    let weightKg = w;
    let heightCm = h;

    if (unit === "imperial") {
      weightKg = w * 0.453592; // lbs to kg
      heightCm = h * 2.54; // inches to cm
    }

    const bmiResult = calculateBMI(weightKg, heightCm);
    setResult(bmiResult);
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and check your health status"
      icon={Calculator}
      backHref="/tools/daily-use"
      backLabel="Back to Daily Use Tools"
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Unit Toggle */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setUnit("metric")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              unit === "metric"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              unit === "imperial"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Imperial (lbs/in)
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === "metric" ? "kilograms" : "pounds"}`}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Height ({unit === "metric" ? "cm" : "inches"})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === "metric" ? "centimeters" : "inches"}`}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleCalculate}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Calculate BMI
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-muted text-muted-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="p-6 bg-muted rounded-xl space-y-4 animate-fade-in">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Your BMI</div>
              <div className={`text-5xl font-bold ${result.color}`}>
                {result.bmi}
              </div>
              <div className={`text-lg font-semibold capitalize mt-2 ${result.color}`}>
                {result.category}
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{result.message}</p>
            </div>

            {/* BMI Scale */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">BMI Scale</div>
              <div className="flex rounded-lg overflow-hidden h-4">
                <div className="flex-1 bg-blue-400" title="Underweight" />
                <div className="flex-1 bg-green-400" title="Normal" />
                <div className="flex-1 bg-yellow-400" title="Overweight" />
                <div className="flex-1 bg-red-400" title="Obese" />
              </div>
              <div className="flex text-xs text-muted-foreground">
                <div className="flex-1 text-left">{"<18.5"}</div>
                <div className="flex-1 text-center">18.5-24.9</div>
                <div className="flex-1 text-center">25-29.9</div>
                <div className="flex-1 text-right">{"30+"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
