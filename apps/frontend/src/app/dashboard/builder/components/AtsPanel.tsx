"use client";

import { X, Activity, Target, Zap, FileSearch, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AtsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="h-8 border-b border-border/50 bg-muted/10 flex items-center justify-between px-4 shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          Live ATS Telemetry & Recruiter Preview
        </span>
        <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-red-500/10 hover:text-red-500 rounded-full" onClick={onClose}>
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex gap-6">
        
        {/* Core Scores */}
        <div className="w-[300px] shrink-0 space-y-4 border-r border-border/50 pr-6">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent"></div>
            <div className="relative z-10">
              <span className="text-xs font-bold text-emerald-600 uppercase">ATS Compatibility Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-emerald-500">92</span>
                <span className="text-sm font-medium text-muted-foreground">/ 100</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <MetricCard title="Recruiter Score" value="88" icon={<Target className="text-blue-500" />} />
            <MetricCard title="Impact Score" value="95" icon={<Zap className="text-amber-500" />} />
          </div>
        </div>

        {/* Breakdown & Feedback */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 border-b border-border/50 pb-1">
              <FileSearch className="w-3.5 h-3.5" /> Keyword Density
            </h3>
            <ul className="space-y-2">
              <KeywordItem word="Microservices" count={4} />
              <KeywordItem word="Kubernetes" count={3} />
              <KeywordItem word="Optimization" count={2} />
              <KeywordItem word="Leadership" count={1} status="warning" />
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 border-b border-border/50 pb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Grammar & Readability
            </h3>
            <div className="p-3 bg-muted/30 rounded-lg text-sm border border-border/50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Readability Grade</span>
                <span className="font-bold text-blue-500">College Level</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Passive Voice</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full font-bold">0 Instances</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Weak Buzzwords</span>
                <span className="text-xs bg-red-500/20 text-red-600 px-2 py-0.5 rounded-full font-bold">1 Found (Synergy)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 border-b border-border/50 pb-1">
              <Zap className="w-3.5 h-3.5" /> Content Quality Engine
            </h3>
            <div className="space-y-2">
              <div className="flex gap-2 text-sm bg-emerald-500/5 text-emerald-600 p-2 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Strong use of action verbs (Architected, Designed, Reduced).</span>
              </div>
              <div className="flex gap-2 text-sm bg-amber-500/5 text-amber-600 p-2 rounded-lg border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Project 2 is missing quantifiable metrics. Suggest quantifying the user impact.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }: any) {
  return (
    <div className="p-3 bg-card border border-border/50 rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-muted-foreground uppercase">{title}</span>
        <div className="w-6 h-6 rounded-md bg-muted/50 flex items-center justify-center">{icon}</div>
      </div>
      <span className="text-2xl font-extrabold">{value}</span>
    </div>
  );
}

function KeywordItem({ word, count, status = 'good' }: any) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="font-medium text-foreground">{word}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{count}x</span>
        <div className={`w-16 h-1.5 rounded-full ${status === 'good' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
      </div>
    </li>
  );
}
