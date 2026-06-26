"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { X, History, Clock, GitCommit, Copy, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VersionControlModal({ onClose }: { onClose: () => void }) {
  const { versions, restoreVersion, saveVersion } = useResumeStore();

  const handleRestore = (id: string) => {
    if (confirm("Are you sure you want to restore this version? This will overwrite your current unsaved edits.")) {
      restoreVersion(id);
      onClose();
    }
  };

  const handleSaveCurrent = () => {
    const label = prompt("Enter a label for this version:", "V" + (versions.length + 1) + " - Custom Edit");
    if (label) {
      saveVersion(label);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-6 bg-muted/20">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" />
            Resume Version History
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Bar */}
        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-card">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Auto-saves occur every 5 minutes.
          </p>
          <Button onClick={handleSaveCurrent} className="gap-2 shadow-lg shadow-primary/20">
            <GitCommit className="w-4 h-4" /> Save Current Snapshot
          </Button>
        </div>

        {/* Timeline List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          <div className="relative border-l-2 border-muted pl-6 space-y-8 py-2 ml-4">
            
            {/* Current Draft */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[33px] top-1 ring-4 ring-background"></div>
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-primary text-base">Current Draft (Unsaved)</h3>
                  <span className="text-xs font-medium text-muted-foreground">Right Now</span>
                </div>
                <p className="text-sm text-muted-foreground">This is your active editing workspace.</p>
              </div>
            </div>

            {/* Past Versions */}
            {versions.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No past versions found. Save a snapshot to see it here.</p>
            ) : (
              versions.map((v) => (
                <div key={v.id} className="relative group">
                  <div className="absolute w-3 h-3 bg-muted-foreground/30 group-hover:bg-indigo-500 rounded-full -left-[31px] top-1.5 ring-4 ring-background transition-colors"></div>
                  <div className="bg-card border border-border/50 hover:border-indigo-500/50 p-4 rounded-xl transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                          <GitCommit className="w-4 h-4 text-indigo-500" /> {v.label}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-xs font-medium text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(v.timestamp).toLocaleString()}</span>
                          <span className="flex items-center gap-1"><Target className="w-3 h-3 text-emerald-500" /> ATS: {v.metrics.atsScore}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="gap-2" onClick={() => handleRestore(v.id)}>
                        <RotateCcw className="w-3.5 h-3.5" /> Restore This Version
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Copy className="w-3.5 h-3.5" /> Duplicate
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

function Target(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
