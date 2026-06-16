"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";
import { ExperienceEditor } from "@/components/builder/ExperienceEditor";
import { SmartImport } from "@/components/builder/SmartImport";
import { CareerTargetEditor } from "@/components/builder/CareerTargetEditor";
import { ProjectEditor } from "@/components/builder/ProjectEditor";

export default function ResumeBuilderPage() {
  const { personalInfo, setPersonalInfo, experiences } = useResumeStore();

  return (
    <div className="h-full flex gap-6">
      {/* Editor Sidebar */}
      <div className="w-[450px] shrink-0 flex flex-col gap-6 overflow-y-auto pb-8 pr-2">
        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Resume Builder</h2>
          <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-2" /> Preview</Button>
        </div>

        <SmartImport />

        {/* Personal Info Form Snippet */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3 mb-4 border-border/50">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Personal Details</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">First & Last Name</label>
              <input type="text" value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ fullName: e.target.value })} className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Jane Doe" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Job Title</label>
              <input type="text" value={personalInfo.jobTitle} onChange={(e) => setPersonalInfo({ jobTitle: e.target.value })} className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Software Engineer" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ email: e.target.value })} className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="jane@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <input type="tel" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ phone: e.target.value })} className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+1 234 567 890" />
            </div>
          </div>
        </Card>

        {/* Extended Inputs for ATS 2.0 */}
        <CareerTargetEditor />

        {/* Experience Section */}
        <ExperienceEditor />

        {/* Projects Section */}
        <ProjectEditor />

      </div>

      {/* Live Preview Area */}
      <div className="flex-1 bg-muted/30 rounded-2xl border border-border/50 flex flex-col relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <Button size="sm" className="shadow-lg shadow-primary/20 rounded-full">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
        
        {/* Actual Preview Sheet (A4 format) */}
        <div className="flex-1 overflow-auto p-8 flex justify-center">
          <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl shadow-black/5 rounded-sm p-12 text-slate-900 border border-slate-200 shrink-0">
             {/* Header */}
             <div className="text-center border-b pb-6 mb-6">
               <h1 className="text-4xl font-bold tracking-tight text-slate-900">{personalInfo.fullName || "Your Name"}</h1>
               <p className="text-lg text-slate-600 mt-1">{personalInfo.jobTitle || "Job Title"}</p>
               <div className="flex justify-center gap-4 text-sm text-slate-500 mt-4">
                 {personalInfo.email && <span>{personalInfo.email}</span>}
                 {personalInfo.email && personalInfo.phone && <span>•</span>}
                 {personalInfo.phone && <span>{personalInfo.phone}</span>}
                 {personalInfo.phone && personalInfo.location && <span>•</span>}
                 {personalInfo.location && <span>{personalInfo.location}</span>}
               </div>
             </div>

             {/* Experience Section in Preview */}
             {experiences.length > 0 && (
               <div className="mb-6">
                 <h2 className="text-xl font-bold tracking-tight text-slate-900 border-b border-slate-300 pb-2 mb-4 uppercase tracking-wider text-sm">Experience</h2>
                 <div className="space-y-4">
                   {experiences.map((exp) => (
                     <div key={exp.id}>
                       <div className="flex justify-between items-baseline">
                         <h3 className="font-bold text-slate-900">{exp.role}</h3>
                         <span className="text-sm font-medium text-slate-500">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                       </div>
                       <p className="text-slate-700 font-medium text-sm mb-1">{exp.company}</p>
                       <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>

    </div>
  );
}
