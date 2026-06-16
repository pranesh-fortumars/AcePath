"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Card } from "@/components/ui/card";
import { Target } from "lucide-react";

export function CareerTargetEditor() {
  const { careerTarget, setCareerTarget } = useResumeStore();

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-2 border-b pb-3 mb-4 border-border/50">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Career Targets</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Target Role</label>
          <input 
            type="text" 
            className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
            placeholder="e.g. Senior Backend Engineer" 
            value={careerTarget.targetRole}
            onChange={(e) => setCareerTarget({ targetRole: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Preferred Industry</label>
          <input 
            type="text" 
            className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
            placeholder="e.g. Fintech, EdTech" 
            value={careerTarget.preferredIndustry}
            onChange={(e) => setCareerTarget({ preferredIndustry: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Expected Salary</label>
          <input 
            type="text" 
            className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
            placeholder="$150,000" 
            value={careerTarget.expectedSalary}
            onChange={(e) => setCareerTarget({ expectedSalary: e.target.value })}
          />
        </div>
        <div className="space-y-1.5 flex flex-col justify-end">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <input 
              type="checkbox" 
              className="rounded text-primary accent-primary w-4 h-4"
              checked={careerTarget.remotePreference}
              onChange={(e) => setCareerTarget({ remotePreference: e.target.checked })}
            />
            Open to Remote Work
          </label>
        </div>
      </div>
    </Card>
  );
}
