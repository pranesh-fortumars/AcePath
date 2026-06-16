"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

export function SmartImport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const setPersonalInfo = useResumeStore((state) => state.setPersonalInfo);
  const addExperience = useResumeStore((state) => state.addExperience);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulating AI parsing delay for the UI flow
    setTimeout(() => {
      // Mock extracted data
      setPersonalInfo({
        fullName: "Extracted Name",
        jobTitle: "Senior AI Engineer",
        email: "extracted@example.com",
        phone: "+1 987 654 321",
        location: "New York, NY"
      });
      addExperience({
        id: Date.now().toString(),
        company: "Tech Corp (Extracted)",
        role: "Lead Developer",
        startDate: "Jan 2020",
        endDate: "Present",
        description: "• Architected microservices\n• Improved performance by 40%"
      });
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  return (
    <div className="mb-6 p-5 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden">
      <div className="absolute -right-10 -top-10 text-primary/10 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
      <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
        <UploadCloud className="w-5 h-5" />
        AI Smart Import
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Upload your existing resume (PDF/DOCX) or connect LinkedIn. Our AI will instantly extract and populate the fields below.
      </p>
      
      <input
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <div className="flex gap-3">
        <Button 
          variant="default" 
          className="flex-1 shadow-md shadow-primary/20"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing PDF...</>
          ) : (
            <><FileText className="w-4 h-4 mr-2" /> Upload Resume</>
          )}
        </Button>
        <Button variant="outline" className="flex-1 bg-white">
          Import from LinkedIn
        </Button>
      </div>
    </div>
  );
}
