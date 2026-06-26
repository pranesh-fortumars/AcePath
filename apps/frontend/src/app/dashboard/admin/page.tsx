"use client";

import { useAdminStore } from "../../../store/useAdminStore";
import { 
  Rocket, Database, RefreshCw, Terminal, 
  Trash2, PlaySquare, Bug, FolderSync,
  FileText, Briefcase, Search, GraduationCap, Video, Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminHub() {
  const { isGodMode, setActiveRole } = useAdminStore();
  const router = useRouter();
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (!isGodMode) {
      router.push("/dashboard");
    }
  }, [isGodMode, router]);

  const handleLaunchCandidate = () => {
    setActiveRole('CANDIDATE');
    router.push("/dashboard");
  };

  const executeProductivityAction = async (action: string) => {
    if (action === "seed") {
      setIsSeeding(true);
      try {
        const res = await fetch("http://localhost:3001/auth/seed");
        const data = await res.json();
        alert(`Database Seeded Successfully!\n\n${data.status.join('\n')}`);
      } catch (err) {
        alert("Failed to seed. Is backend running?");
      } finally {
        setIsSeeding(false);
      }
    } else if (action === "clearCache") {
      localStorage.clear();
      // Keep God Mode token
      localStorage.setItem("ADMIN_BYPASS_MODE", "enabled");
      alert("Local Storage & Client Cache Cleared.");
    } else {
      alert(`[Developer Action] ${action} executed successfully in mock mode.`);
    }
  };

  if (!isGodMode) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            God-Tier Workspace
          </h1>
          <p className="text-muted-foreground mt-1">
            Total unrestricted access to all platform modules, developer commands, and multi-tenant perspectives.
          </p>
        </div>
        
        <button 
          onClick={handleLaunchCandidate}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <Rocket className="w-5 h-5" />
          Launch Candidate Workspace
        </button>
      </div>

      {/* Admin Quick Actions Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
          <Terminal className="w-5 h-5 text-purple-500" />
          Platform Modules
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard 
            icon={<FileText className="text-blue-500" />} 
            title="Resume Builder" 
            desc="Enter the Drag-and-Drop builder"
            onClick={() => { setActiveRole('CANDIDATE'); router.push('/dashboard/builder'); }}
          />
          <QuickActionCard 
            icon={<Search className="text-cyan-500" />} 
            title="ATS Scanner" 
            desc="Run local heuristic NLP scans"
            onClick={() => { setActiveRole('CANDIDATE'); router.push('/dashboard/ats'); }}
          />
          <QuickActionCard 
            icon={<Video className="text-emerald-500" />} 
            title="Mock Interviews" 
            desc="Launch AI persona interviews"
            onClick={() => { setActiveRole('CANDIDATE'); router.push('/dashboard/interview'); }}
          />
          <QuickActionCard 
            icon={<Briefcase className="text-orange-500" />} 
            title="Job Matching" 
            desc="Vector search against resumes"
            onClick={() => { setActiveRole('CANDIDATE'); router.push('/dashboard/jobs'); }}
          />
          
          <QuickActionCard 
            icon={<Users className="text-pink-500" />} 
            title="Recruiter Portal" 
            desc="View CRM and candidate lists"
            onClick={() => { setActiveRole('RECRUITER'); router.push('/dashboard/recruiter'); }}
          />
          <QuickActionCard 
            icon={<GraduationCap className="text-indigo-500" />} 
            title="College Placement" 
            desc="Track student hiring metrics"
            onClick={() => { setActiveRole('COLLEGE'); router.push('/dashboard/college'); }}
          />
        </div>
      </section>

      {/* Developer Productivity Console */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
          <Bug className="w-5 h-5 text-red-500" />
          Developer Productivity Console
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <ProductivityCard 
            icon={<Database />} title="Seed Triple-DB Architecture" color="border-cyan-500/50 hover:bg-cyan-500/10"
            onClick={() => executeProductivityAction('seed')}
            loading={isSeeding}
          />
          
          <ProductivityCard 
            icon={<Trash2 />} title="Clear Local Storage / Cache" color="border-red-500/50 hover:bg-red-500/10 text-red-400"
            onClick={() => executeProductivityAction('clearCache')}
          />
          
          <ProductivityCard 
            icon={<Users />} title="Generate Test Candidates" color="border-purple-500/50 hover:bg-purple-500/10"
            onClick={() => executeProductivityAction('generateCandidates')}
          />
          
          <ProductivityCard 
            icon={<Briefcase />} title="Generate Mock Job Listings" color="border-orange-500/50 hover:bg-orange-500/10"
            onClick={() => executeProductivityAction('generateJobs')}
          />
          
          <ProductivityCard 
            icon={<FolderSync />} title="Rebuild Vector Index" color="border-emerald-500/50 hover:bg-emerald-500/10"
            onClick={() => executeProductivityAction('rebuildIndex')}
          />
          
          <ProductivityCard 
            icon={<PlaySquare />} title="Enable Network Debug Mode" color="border-blue-500/50 hover:bg-blue-500/10"
            onClick={() => executeProductivityAction('debugMode')}
          />

        </div>
      </section>

    </div>
  );
}

function QuickActionCard({ icon, title, desc, onClick }: any) {
  return (
    <motion.button 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-start p-5 bg-card border border-border/50 rounded-xl hover:border-border text-left transition-colors shadow-sm"
    >
      <div className="p-3 bg-muted rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{desc}</p>
    </motion.button>
  );
}

function ProductivityCard({ icon, title, color, onClick, loading }: any) {
  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-4 p-4 border rounded-xl transition-colors bg-card/50 ${color} ${loading ? 'opacity-50' : ''}`}
    >
      <div className="shrink-0">
        {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : icon}
      </div>
      <div className="text-left font-medium text-sm">
        {loading ? 'Executing...' : title}
      </div>
    </button>
  );
}
