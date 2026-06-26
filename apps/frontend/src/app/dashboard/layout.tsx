"use client";

import { ReactNode, useEffect } from "react";
import { 
  LayoutDashboard, FileText, Briefcase, Settings, LogOut, Video, Globe, 
  ShieldAlert, User, Search, GraduationCap, ChevronDown, Command
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminStore, UserRole } from "../../store/useAdminStore";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { activeRole, isGodMode, setActiveRole, resetToAdmin } = useAdminStore();
  const pathname = usePathname();
  const router = useRouter();

  // If God Mode is active and we are in SUPER_ADMIN mode, we shouldn't restrict navigation
  
  const getSidebarLinks = () => {
    switch (activeRole) {
      case 'CANDIDATE':
        return [
          { icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview", href: "/dashboard" },
          { icon: <FileText className="w-5 h-5" />, label: "Builder", href: "/dashboard/builder" },
          { icon: <FileText className="w-5 h-5" />, label: "ATS Analyzer", href: "/dashboard/ats" },
          { icon: <Briefcase className="w-5 h-5" />, label: "Job Matches", href: "/dashboard/jobs" },
          { icon: <LayoutDashboard className="w-5 h-5" />, label: "App Tracker", href: "/dashboard/tracker" },
          { icon: <Video className="w-5 h-5" />, label: "Mock Interview", href: "/dashboard/interview" },
          { icon: <Globe className="w-5 h-5" />, label: "AI Portfolio", href: "/dashboard/portfolio" },
        ];
      case 'RECRUITER':
        return [
          { icon: <Search className="w-5 h-5" />, label: "Talent Search", href: "/dashboard/recruiter" },
          { icon: <Briefcase className="w-5 h-5" />, label: "Job Postings", href: "/dashboard/jobs" },
        ];
      case 'COLLEGE':
        return [
          { icon: <GraduationCap className="w-5 h-5" />, label: "Student Tracking", href: "/dashboard/college" },
        ];
      case 'SUPER_ADMIN':
        return [
          { icon: <Command className="w-5 h-5 text-cyan-400" />, label: "Application Hub", href: "/dashboard/admin" },
          { icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview", href: "/dashboard" },
          { icon: <FileText className="w-5 h-5" />, label: "Builder", href: "/dashboard/builder" },
          { icon: <FileText className="w-5 h-5" />, label: "ATS Analyzer", href: "/dashboard/ats" },
          { icon: <Search className="w-5 h-5" />, label: "Recruiter Portal", href: "/dashboard/recruiter" },
          { icon: <GraduationCap className="w-5 h-5" />, label: "College Portal", href: "/dashboard/college" },
          { icon: <Video className="w-5 h-5" />, label: "Mock Interview", href: "/dashboard/interview" },
          { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "/dashboard/settings" },
        ];
      default:
        return [];
    }
  };

  const roleConfigs = {
    SUPER_ADMIN: { icon: ShieldAlert, label: "Super Admin", color: "text-red-500" },
    CANDIDATE: { icon: User, label: "Candidate Workspace", color: "text-blue-500" },
    RECRUITER: { icon: Search, label: "Recruiter View", color: "text-emerald-500" },
    COLLEGE: { icon: GraduationCap, label: "Placement Officer", color: "text-purple-500" },
  };

  const ActiveIcon = roleConfigs[activeRole].icon;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            ResumeAI Pro
          </span>
        </div>
        
        {/* Role Indicator in Sidebar */}
        {isGodMode && (
          <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
            <div className="flex items-center gap-2">
              <ActiveIcon className={`w-4 h-4 ${roleConfigs[activeRole].color}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {roleConfigs[activeRole].label}
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {getSidebarLinks().map((link) => (
            <SidebarItem 
              key={link.href} 
              icon={link.icon} 
              label={link.label} 
              href={link.href} 
              active={pathname === link.href} 
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-border/50 space-y-2">
          {isGodMode && activeRole !== 'SUPER_ADMIN' && (
            <button 
              onClick={() => {
                resetToAdmin();
                router.push("/dashboard/admin");
              }}
              className="flex items-center gap-3 w-full px-3 py-2 text-red-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 border border-red-500/20"
            >
              <ShieldAlert className="w-5 h-5" />
              <span className="font-bold text-sm">Exit to Admin</span>
            </button>
          )}

          <button className="flex items-center gap-3 w-full px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center px-6 justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg hidden sm:block">
              {activeRole === 'SUPER_ADMIN' ? 'Application Hub' : 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Role Switcher (Only visible to God Mode Owners) */}
            {isGodMode && (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
                  <ActiveIcon className={`w-4 h-4 ${roleConfigs[activeRole].color}`} />
                  <span className="text-sm font-medium">{roleConfigs[activeRole].label}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border/50 bg-card p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Switch Perspective</p>
                  {(Object.keys(roleConfigs) as UserRole[]).map((role) => {
                    const RoleIcon = roleConfigs[role].icon;
                    return (
                      <button
                        key={role}
                        onClick={() => {
                          setActiveRole(role);
                          // Auto redirect based on role
                          if(role === 'SUPER_ADMIN') router.push('/dashboard/admin');
                          else if(role === 'RECRUITER') router.push('/dashboard/recruiter');
                          else if(role === 'COLLEGE') router.push('/dashboard/college');
                          else router.push('/dashboard');
                        }}
                        className={`flex w-full items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted ${activeRole === role ? 'bg-primary/10 text-primary' : 'text-foreground'}`}
                      >
                        <RoleIcon className={`w-4 h-4 ${roleConfigs[role].color}`} />
                        {roleConfigs[role].label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                {isGodMode ? 'SA' : 'JD'}
              </div>
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
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}
