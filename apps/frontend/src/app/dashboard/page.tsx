"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Activity, Target, Zap, FileText } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, John</h2>
        <p className="text-muted-foreground mt-1">Here's your career progress at a glance.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Avg. ATS Score" value="84%" icon={<Target className="w-4 h-4 text-primary" />} trend="+12% from last month" />
        <MetricCard title="Profile Completion" value="92%" icon={<Zap className="w-4 h-4 text-amber-500" />} progress={92} />
        <MetricCard title="Active Resumes" value="3" icon={<FileText className="w-4 h-4 text-blue-500" />} trend="2 updated this week" />
        <MetricCard title="Interview Readiness" value="Strong" icon={<Activity className="w-4 h-4 text-green-500" />} trend="Based on latest mock" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Updated "Software Engineer" Resume</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ATS Score Improvement */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Strength</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
             <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="60" className="stroke-muted fill-none" strokeWidth="8" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0 1000" }}
                    animate={{ strokeDasharray: "316 1000" }} // Approx 84% of 2*PI*r
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="64" cy="64" r="60" 
                    className="stroke-primary fill-none" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">84</span>
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
