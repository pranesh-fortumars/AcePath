"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { 
  Download, Eye, Maximize2, Zap, LayoutTemplate, 
  History, Settings, PenTool, Bot, Activity, Menu 
} from "lucide-react";

// Placeholder components (will be built out in subsequent steps)
import { StructurePanel } from "./components/StructurePanel";
import { EditorPanel } from "./components/EditorPanel";
import { CopilotPanel } from "./components/CopilotPanel";
import { AtsPanel } from "./components/AtsPanel";
import { VersionControlModal } from "./components/VersionControlModal";

export default function UltimateResumeBuilder() {
  const [activeRightPanel, setActiveRightPanel] = useState<'copilot' | 'design' | 'versions'>('copilot');
  const [isAtsPanelOpen, setIsAtsPanelOpen] = useState(true);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

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
        
        <div className="flex items-center gap-2">
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
          
          {/* Bottom Panel: ATS Telemetry (Docked) */}
          {isAtsPanelOpen && (
            <div className="h-[250px] border-t border-border/50 bg-card shrink-0 flex flex-col relative z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
              <AtsPanel onClose={() => setIsAtsPanelOpen(false)} />
            </div>
          )}
          {!isAtsPanelOpen && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsAtsPanelOpen(true)}
              className="absolute bottom-4 right-4 z-20 gap-2 bg-card shadow-xl rounded-full"
            >
              <Activity className="w-4 h-4 text-emerald-500" /> Show ATS Telemetry
            </Button>
          )}
        </main>

        {/* Right Panel: AI Copilot & Design Studio (25%) */}
        <aside className="w-[350px] border-l border-border/50 bg-card flex flex-col shrink-0 relative z-10 shadow-xl shadow-black/5">
          {/* Right Panel Tabs */}
          <div className="h-12 border-b border-border/50 flex items-center px-2 gap-1 bg-muted/30">
            <Button 
              variant={activeRightPanel === 'copilot' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveRightPanel('copilot')}
              className="flex-1 gap-2"
            >
              <Bot className="w-4 h-4 text-purple-500" /> Copilot
            </Button>
            <Button 
              variant={activeRightPanel === 'design' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setActiveRightPanel('design')}
              className="flex-1 gap-2"
            >
              <PenTool className="w-4 h-4 text-pink-500" /> Design
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col">
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

      </div>

      {isVersionModalOpen && (
        <VersionControlModal onClose={() => setIsVersionModalOpen(false)} />
      )}
    </div>
  );
}
