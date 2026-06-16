"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, Target, TrendingUp, Cpu, Award, BookOpen, Briefcase, Eye, ChevronRight } from "lucide-react";
import { ResumeHeatmap } from "@/components/ats/ResumeHeatmap";

export default function AtsDashboardPage() {
  // ATS 2.0 Extended Metrics (Simulated Local NLP Engine Data)
  const scores = {
    overall: 84,
    atsCompatibility: 95,
    recruiter: 78,
    keywordDensity: 82,
    industryAlignment: 88,
    executive: 65,
    readability: 91,
    impact: 74,
  };

  const psychology = {
    firstImpression: "Strong",
    sixSecondScan: "Clear Hierarchy",
    trustworthiness: "High (Quantified Achievements)",
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">ATS 2.0 Intelligence</h2>
          <p className="text-muted-foreground mt-1">Deep analysis across 8 dimensions simulating Workday, Taleo, and Greenhouse parsers.</p>
        </div>
        <Button className="rounded-full shadow-lg shadow-primary/20">
          <Cpu className="w-4 h-4 mr-2" /> Re-Scan Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Overall Score Card */}
        <Card className="p-8 col-span-1 lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-primary/20">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="80" cy="80" r="70" className="stroke-muted fill-none" strokeWidth="12" />
                 <circle 
                   strokeDasharray="439.8"
                   strokeDashoffset={439.8 - (439.8 * scores.overall) / 100}
                   cx="80" cy="80" r="70" 
                   className="stroke-primary fill-none transition-all duration-1000 ease-out" 
                   strokeWidth="12" 
                   strokeLinecap="round" 
                 />
               </svg>
               <div className="absolute flex flex-col items-center justify-center">
                 <span className="text-4xl font-extrabold text-primary">{scores.overall}</span>
                 <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Overall</span>
               </div>
            </div>

            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold">Highly Competitive</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your resume is highly optimized for applicant tracking systems like Workday and Greenhouse. 
                However, to increase your <strong>Executive Score</strong> and <strong>Impact Score</strong>, consider adding more revenue metrics to your latest role.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-bold border border-green-500/20">Workday Ready</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-bold border border-green-500/20">Greenhouse Ready</span>
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-bold border border-yellow-500/20">Taleo Warning</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recruiter Psychology Engine */}
        <Card className="p-6 bg-slate-900 text-white border-slate-800 flex flex-col justify-between">
           <div className="space-y-4">
             <h3 className="font-semibold text-lg flex items-center gap-2">
               <Eye className="w-5 h-5 text-indigo-400" /> Recruiter Psychology
             </h3>
             <p className="text-xs text-slate-400">Simulated 6-second human scan analysis.</p>
             
             <div className="space-y-3 mt-4">
               <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
                 <span className="text-sm">First Impression</span>
                 <span className="text-sm font-bold text-green-400">{psychology.firstImpression}</span>
               </div>
               <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
                 <span className="text-sm">6-Sec Scan</span>
                 <span className="text-sm font-bold text-blue-400">{psychology.sixSecondScan}</span>
               </div>
               <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
                 <span className="text-sm">Trustworthiness</span>
                 <span className="text-sm font-bold text-purple-400">{psychology.trustworthiness}</span>
               </div>
             </div>
           </div>
        </Card>

      </div>

      {/* Advanced 8-Dimension Scoring Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreMetric title="ATS Compatibility" score={scores.atsCompatibility} icon={<ShieldCheck />} color="bg-green-500" />
        <ScoreMetric title="Recruiter Score" score={scores.recruiter} icon={<Target />} color="bg-blue-500" />
        <ScoreMetric title="Keyword Density" score={scores.keywordDensity} icon={<FileSearchIcon />} color="bg-purple-500" />
        <ScoreMetric title="Industry Alignment" score={scores.industryAlignment} icon={<Briefcase />} color="bg-indigo-500" />
        <ScoreMetric title="Executive Presence" score={scores.executive} icon={<Award />} color="bg-yellow-500" warning />
        <ScoreMetric title="Readability" score={scores.readability} icon={<BookOpen />} color="bg-teal-500" />
        <ScoreMetric title="Business Impact" score={scores.impact} icon={<TrendingUp />} color="bg-orange-500" />
        <Card className="p-5 flex items-center justify-center hover:bg-muted cursor-pointer transition-colors border-dashed">
           <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">View Detailed Report <ChevronRight className="w-4 h-4" /></span>
        </Card>
      </div>

      <ResumeHeatmap />
    </div>
  );
}

function ScoreMetric({ title, score, icon, color, warning = false }: any) {
  return (
    <Card className={`p-5 border-border/50 ${warning ? 'border-yellow-500/30 bg-yellow-500/5' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-background shadow-sm border border-border/50 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:opacity-80`}>
          {icon}
        </div>
        <span className="text-2xl font-bold">{score}</span>
      </div>
      <div>
        <div className="flex justify-between text-sm font-medium mb-2">
          <span className={warning ? 'text-yellow-700' : ''}>{title}</span>
        </div>
        <Progress value={score} className={`h-1.5 [&>div]:${color}`} />
      </div>
    </Card>
  );
}

function FileSearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m11.5 14.5 2.5 2.5"/></svg>
  );
}
