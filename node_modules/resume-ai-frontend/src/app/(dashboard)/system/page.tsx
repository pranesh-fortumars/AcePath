"use client";

import { useEffect, useState } from "react";

export default function SystemHealthDashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("viewAsRole") || "ADMIN");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 sm:p-12 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              System Command Center
            </h1>
            <p className="text-gray-400 font-medium tracking-wide">
              Real-time telemetry & operational overview
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              All Systems Operational
            </span>
          </div>
        </header>

        {/* Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Database Latency" 
            value="14ms" 
            trend="-2ms" 
            trendUp={true} 
            color="cyan"
          />
          <StatCard 
            title="Mock Candidates" 
            value="15" 
            trend="+15 generated" 
            trendUp={true} 
            color="purple"
          />
          <StatCard 
            title="ATS Engine Uptime" 
            value="99.99%" 
            trend="Stable" 
            trendUp={true} 
            color="emerald"
          />
        </div>

        {/* Admin Specific View */}
        {role === "ADMIN" && (
          <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6 text-white/90">Development Environment Logs</h2>
            <div className="space-y-4 font-mono text-sm text-gray-400">
              <LogEntry time="14:50:01" msg="Super Admin authenticated successfully." type="success" />
              <LogEntry time="14:48:22" msg="Mock data generated (15 candidates, 15 resumes, 15 ATS reports)." type="info" />
              <LogEntry time="14:48:19" msg="Prisma Dev Postgres cluster synced successfully." type="info" />
              <LogEntry time="14:47:05" msg="Node.js v22.14.0 portable engine initialized." type="info" />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, color }: { title: string, value: string, trend: string, trendUp: boolean, color: 'cyan' | 'purple' | 'emerald' }) {
  const colors = {
    cyan: "from-cyan-500/20 to-cyan-500/0 border-cyan-500/30 text-cyan-400",
    purple: "from-purple-500/20 to-purple-500/0 border-purple-500/30 text-purple-400",
    emerald: "from-emerald-500/20 to-emerald-500/0 border-emerald-500/30 text-emerald-400",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colors[color]} p-6 backdrop-blur-sm transition-all hover:border-opacity-50`}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">{title}</h3>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-black text-white">{value}</span>
        <span className={`text-xs font-bold ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function LogEntry({ time, msg, type }: { time: string, msg: string, type: 'info' | 'success' | 'error' }) {
  const typeColors = {
    info: "text-blue-400",
    success: "text-emerald-400",
    error: "text-rose-400",
  };

  return (
    <div className="flex items-start gap-4 py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-3 rounded transition-colors">
      <span className="text-gray-500 shrink-0">[{time}]</span>
      <span className={`${typeColors[type]} font-bold`}>[{type.toUpperCase()}]</span>
      <span className="text-gray-300">{msg}</span>
    </div>
  );
}
