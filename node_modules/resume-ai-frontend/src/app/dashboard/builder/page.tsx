"use client";


import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { 
  Download, Eye, Maximize2, Zap, LayoutTemplate, 
  History, Settings, PenTool, Bot, Activity, Menu, Upload
} from "lucide-react";

// Placeholder components (will be built out in subsequent steps)
import { StructurePanel } from "@/app/dashboard/builder/components/StructurePanel";
import { EditorPanel } from "@/app/dashboard/builder/components/EditorPanel";
import { CopilotPanel } from "@/app/dashboard/builder/components/CopilotPanel";
import { AtsPanel } from "@/app/dashboard/builder/components/AtsPanel";
import { VersionControlModal } from "@/app/dashboard/builder/components/VersionControlModal";
import { SmartImportModal } from "@/app/dashboard/builder/components/SmartImportModal";

export default function UltimateResumeBuilder() {
  const [activeRightPanel, setActiveRightPanel] = useState<'copilot' | 'design' | 'ats' | 'versions'>('ats');
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-4rem)] -m-6 flex flex-col bg-background overflow-hidden text-sm">
      
      {/* Top Toolbar */}
      <header className="h-14 border-b border-border/50 bg-card/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Menu className="w-4 h-4" /> File
          </Button>
          <div className="h-4 w-px bg-border/50"></div>
          <span className="font-semibold text-primary flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4" />
            Resume V3 (Editing)
          </span>
          <span className="text-xs text-muted-foreground ml-2">Saved just now</span>
        </div>
        
        <div className="flex items-center gap-2 border-l border-border/50 pl-4">
          <Button variant="outline" size="sm" className="gap-2 text-purple-600 border-purple-200 hover:bg-purple-50" onClick={() => setIsImportModalOpen(true)}>
            <Upload className="w-4 h-4" /> Import Data
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsVersionModalOpen(true)} className="gap-2">
            <History className="w-4 h-4" /> History
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-indigo-500 border-indigo-500/20 hover:bg-indigo-500/10">
            <Maximize2 className="w-4 h-4" /> Fullscreen
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </header>

      {/* Main 4-Pane Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Structure Engine (20%) */}
        <aside className="w-[300px] border-r border-border/50 bg-muted/20 flex flex-col shrink-0 relative z-10">
          <StructurePanel />
        </aside>

        {/* Center Panel: Live Editor (Auto) */}
        <main className="flex-1 flex flex-col relative bg-muted/10 overflow-hidden">
          <EditorPanel />
        </main>

        {/* Right Panel: AI Copilot & Design Studio (25%) */}
        <aside className="w-[350px] border-l border-border/50 bg-card flex flex-col shrink-0 relative z-10 shadow-xl shadow-black/5">
          {/* Right Panel Tabs */}
          <div className="h-12 border-b border-border/50 flex items-center px-1 gap-1 bg-muted/30">
            <Button 
              variant={activeRightPanel === 'ats' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveRightPanel('ats')}
              className="flex-1 gap-1 text-[11px]"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-500" /> ATS
            </Button>
            <Button 
              variant={activeRightPanel === 'copilot' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveRightPanel('copilot')}
              className="flex-1 gap-1 text-[11px]"
            >
              <Bot className="w-3.5 h-3.5 text-purple-500" /> Copilot
            </Button>
            <Button 
              variant={activeRightPanel === 'design' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveRightPanel('design')}
              className="flex-1 gap-1 text-[11px]"
            >
              <PenTool className="w-3.5 h-3.5 text-pink-500" /> Design
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeRightPanel === 'ats' && <AtsPanel onClose={() => {}} />}
            {activeRightPanel === 'copilot' && <CopilotPanel />}
            {activeRightPanel === 'design' && (
              <div className="p-6 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                <Settings className="w-12 h-12 mb-4 text-muted-foreground/50" />
                <p>Design Studio Coming Soon</p>
                <p className="text-xs mt-2">Fonts, Margins, Colors</p>
              </div>
            )}
          </div>
        </aside>

        {/* Modals */}
        <VersionControlModal 
          isOpen={isVersionModalOpen} 
          onClose={() => setIsVersionModalOpen(false)} 
        />
        <SmartImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      </div>
    </div>
  );
}
