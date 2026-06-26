"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Activity, Target, Zap, FileText } from "lucide-react";
import { Achievements } from "@/components/gamification/Achievements";
import { useResumeStore } from "@/store/useResumeStore";

export default function DashboardPage() {
  const { resumes, personalInfo } = useResumeStore();

  // Aggregate stats
  const activeResumeCount = resumes.length;
  const avgAtsScore = resumes.length > 0 
    ? Math.round(resumes.reduce((acc, r) => acc + (r.computedScore || 84), 0) / resumes.length) 
    : 84;
    
  // Recent Activity sorting
  const recentActivity = [...resumes].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {personalInfo.fullName.split(' ')[0] || "User"}</h2>
        <p className="text-muted-foreground mt-1">Here's your career progress at a glance.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Avg. ATS Score" value={`${avgAtsScore}%`} icon={<Target className="w-4 h-4 text-primary" />} trend="Live computation" />
        <MetricCard title="Profile Completion" value="92%" icon={<Zap className="w-4 h-4 text-amber-500" />} progress={92} />
        <MetricCard title="Active Resumes" value={activeResumeCount.toString()} icon={<FileText className="w-4 h-4 text-blue-500" />} trend="Across all versions" />
        <MetricCard title="Interview Readiness" value="Strong" icon={<Activity className="w-4 h-4 text-green-500" />} trend="Based on latest mock" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Achievements / Gamification */}
        <Achievements />

        {/* Recent Activity */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((r, i) => (
                <div key={r.id} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Updated "{r.title}"</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No recent activity. Build your first resume!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ATS Score Improvement */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Resume Strength</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
             <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="60" className="stroke-muted fill-none" strokeWidth="8" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0 1000" }}
                    animate={{ strokeDasharray: `${(avgAtsScore / 100) * 377} 1000` }} // 2*PI*r where r=60 is ~377
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="64" cy="64" r="60" 
                    className="stroke-primary fill-none" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{avgAtsScore}</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
             </div>
             <p className="text-sm text-muted-foreground mt-4 text-center">Your main resume is highly optimized for Applicant Tracking Systems.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, progress }: { title: string; value: string; icon: React.ReactNode; trend?: string; progress?: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {progress !== undefined && <Progress value={progress} className="mt-3 h-2" />}
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </CardContent>
    </Card>
  );
}
