"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

export function SmartImportModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { setPersonalInfo, createNewResume } = useResumeStore();

  if (!isOpen) return null;

  const handleUpload = () => {
    if (!file) return;
    setIsParsing(true);
    
    // Simulate complex AI OCR extraction
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        completeExtraction();
      } else {
        setProgress(currentProgress);
      }
    }, 400);
  };

  const completeExtraction = () => {
    // 1. Create a new independent resume container
    createNewResume(`Imported: ${file?.name || "Resume"}`);
    
    // 2. Inject mock parsed data into the active workspace buffer
    setPersonalInfo({
      fullName: "Alex Rivera",
      jobTitle: "Senior DevOps Engineer",
      email: "alex.r@example.com",
      phone: "+1 555-0198",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/arivera",
      github: "github.com/arivera-dev",
      summary: "Results-driven DevOps Engineer with 7+ years of experience in architecting scalable AWS infrastructure, automating CI/CD pipelines, and reducing deployment times by 40%."
    });
    
    // In a real app, we would update experiences, skills, etc. here via the store

    setTimeout(() => {
      setIsParsing(false);
      setProgress(0);
      setFile(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border/50 overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-border/50 bg-muted/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Smart AI Import</h2>
            <p className="text-sm text-muted-foreground">Upload your existing resume to auto-fill the builder.</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {!isParsing ? (
            <div className="space-y-4">
              <label 
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${file ? 'border-purple-500 bg-purple-500/5' : 'border-border hover:bg-muted/30'}`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileText className="w-8 h-8 text-purple-500 mb-2" />
                      <p className="text-sm font-semibold text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-semibold text-foreground">Click to upload PDF or DOCX</p>
                      <p className="text-xs text-muted-foreground mt-1">Maximum file size 5MB</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button 
                  onClick={handleUpload} 
                  disabled={!file}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Start Extraction
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Extracting Data...</span>
                  <span className="text-purple-500">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <p className="text-xs text-center text-muted-foreground max-w-[250px]">
                Our NLP engine is analyzing structure, extracting entities, and mapping keywords to the workspace.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
