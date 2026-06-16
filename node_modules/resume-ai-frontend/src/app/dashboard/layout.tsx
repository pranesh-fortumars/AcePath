import { ReactNode } from "react";
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <span className="font-bold text-lg tracking-tight">ResumeAI Pro</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Overview" href="/dashboard" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="Builder" href="/dashboard/builder" />
          <SidebarItem icon={<FileText className="w-5 h-5" />} label="ATS Analyzer" href="/dashboard/ats" active />
          <SidebarItem icon={<Briefcase className="w-5 h-5" />} label="Job Matches" href="/dashboard/jobs" />
          <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" href="/dashboard/settings" />
        </nav>
        <div className="p-4 border-t border-border/50">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-border/50 bg-background flex items-center px-6 justify-between shrink-0">
          <h1 className="font-semibold text-lg">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
              JD
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, href, active }: { icon: ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
