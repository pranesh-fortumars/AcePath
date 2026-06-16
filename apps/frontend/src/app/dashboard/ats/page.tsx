"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, FileSearch, Target, TrendingUp } from "lucide-react";
import { ResumeHeatmap } from "@/components/ats/ResumeHeatmap";

export default function AtsDashboardPage() {
  // Mock data for Phase 3 UI
  const atsScore = 78;
  const missingKeywords = ["React 19", "Next.js", "Docker", "Agile"];
  const strongKeywords = ["TypeScript", "NestJS", "PostgreSQL"];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">ATS Analyzer</h2>
          <p className="text-muted-foreground mt-1">Optimize your resume against Applicant Tracking Systems</p>
        </div>
        <Button className="rounded-full shadow-lg shadow-primary/20">
          <FileSearch className="w-4 h-4 mr-2" /> Scan Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <Card className="p-6 col-span-1 md:col-span-2 relative overflow-hidden bg-gradient-to-br from-card to-card/50">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Overall ATS Match
              </h3>
              <p className="text-sm text-muted-foreground max-w-[80%]">
                Your resume is looking good, but missing key technical requirements for Senior Roles.
              </p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-extrabold text-primary">{atsScore}</span>
              <span className="text-xl font-bold text-muted-foreground">/100</span>
            </div>
          </div>
          
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Match Quality</span>
              <span>{atsScore}%</span>
            </div>
            <Progress value={atsScore} className="h-2" />
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg"><ShieldCheck className="w-5 h-5 text-green-500" /></div>
              <div>
                <p className="text-sm font-medium">Formatting</p>
                <p className="text-xs text-muted-foreground">ATS-Friendly</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg"><AlertCircle className="w-5 h-5 text-yellow-500" /></div>
              <div>
                <p className="text-sm font-medium">Readability</p>
                <p className="text-xs text-muted-foreground">Needs Improvement</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg"><TrendingUp className="w-5 h-5 text-blue-500" /></div>
              <div>
                <p className="text-sm font-medium">Impact Focus</p>
                <p className="text-xs text-muted-foreground">Strong</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map(kw => (
              <span key={kw} className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
                {kw}
              </span>
            ))}
          </div>
        </Card>

        {/* Strong Keywords */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 text-green-600 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Strong Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {strongKeywords.map(kw => (
              <span key={kw} className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
                {kw}
              </span>
            ))}
          </div>
        </Card>

        {/* Heatmap Section */}
        <ResumeHeatmap />
      </div>

    </div>
  );
}
