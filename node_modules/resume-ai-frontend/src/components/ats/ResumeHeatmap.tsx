"use client";

import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

export function ResumeHeatmap() {
  // Mock sections for the heatmap visualization
  const sections = [
    { name: "Contact Info", status: "strong", score: 100 },
    { name: "Professional Summary", status: "moderate", score: 65 },
    { name: "Work Experience", status: "strong", score: 90 },
    { name: "Skills", status: "weak", score: 40 },
    { name: "Education", status: "strong", score: 100 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "bg-green-500/20 text-green-700 border-green-500/30";
      case "moderate": return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "weak": return "bg-red-500/20 text-red-700 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 col-span-1 md:col-span-3">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg">Resume Heatmap</h3>
          <p className="text-sm text-muted-foreground">Visual analysis of your resume sections.</p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /> Strong</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /> Moderate</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /> Weak</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {sections.map((section) => (
          <div 
            key={section.name} 
            className={`p-4 rounded-xl border flex flex-col justify-between h-32 transition-colors ${getStatusColor(section.status)}`}
          >
            <span className="font-medium text-sm">{section.name}</span>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-bold opacity-80">{section.score}%</span>
              {section.status === "weak" && <Info className="w-4 h-4 mb-1" />}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
