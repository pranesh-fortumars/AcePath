"use client";

import { useResumeStore, SectionType, ResumeSection } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { 
  GripVertical, Eye, EyeOff, Plus, ChevronUp, ChevronDown, 
  Trash2, FileText, Briefcase, GraduationCap, Award, Code
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_ICONS: Record<SectionType, React.ReactNode> = {
  PERSONAL_INFO: <FileText className="w-4 h-4 text-blue-500" />,
  SUMMARY: <FileText className="w-4 h-4 text-indigo-500" />,
  CAREER_OBJECTIVE: <FileText className="w-4 h-4 text-indigo-400" />,
  CORE_COMPETENCIES: <Code className="w-4 h-4 text-cyan-500" />,
  EXPERIENCE: <Briefcase className="w-4 h-4 text-emerald-500" />,
  PROJECTS: <Code className="w-4 h-4 text-purple-500" />,
  EDUCATION: <GraduationCap className="w-4 h-4 text-orange-500" />,
  CERTIFICATIONS: <Award className="w-4 h-4 text-yellow-500" />,
  SKILLS: <Code className="w-4 h-4 text-cyan-500" />,
  LANGUAGES: <FileText className="w-4 h-4 text-slate-500" />,
  PUBLICATIONS: <FileText className="w-4 h-4 text-red-500" />,
  VOLUNTEERING: <Award className="w-4 h-4 text-pink-500" />,
  CUSTOM: <FileText className="w-4 h-4 text-gray-500" />
};

export function StructurePanel() {
  const { sections, reorderSections, updateSection, removeSection, addSection } = useResumeStore();

  const handleMoveUp = (index: number) => {
    if (index > 0) reorderSections(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index < sections.length - 1) reorderSections(index, index + 1);
  };

  const handleAddCustom = () => {
    const newSection: ResumeSection = {
      id: `sec_${Date.now()}`,
      type: 'CUSTOM',
      title: 'New Custom Section',
      isVisible: true,
      order: sections.length,
      items: []
    };
    addSection(newSection);
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <h2 className="font-bold text-sm tracking-wide uppercase text-muted-foreground mb-1">Resume Structure</h2>
        <p className="text-xs text-muted-foreground">Manage your sections</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence>
          {sections.map((section, index) => (
            <motion.div 
              key={section.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`group flex flex-col bg-background border rounded-lg overflow-hidden transition-all shadow-sm ${!section.isVisible ? 'opacity-50 grayscale' : 'border-border/50 hover:border-primary/50'}`}
            >
              <div className="flex items-center p-2 gap-2">
                <div className="flex flex-col gap-1 items-center justify-center px-1">
                  <button onClick={() => handleMoveUp(index)} disabled={index === 0} className="text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground">
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <GripVertical className="w-3 h-3 text-muted-foreground/30 cursor-grab" />
                  <button onClick={() => handleMoveDown(index)} disabled={index === sections.length - 1} className="text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground">
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center shrink-0">
                    {SECTION_ICONS[section.type]}
                  </div>
                  <input 
                    type="text" 
                    value={section.title}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                    className="flex-1 bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary rounded-sm px-1 min-w-0 truncate"
                  />
                </div>
                
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-7 h-7"
                    onClick={() => updateSection(section.id, { isVisible: !section.isVisible })}
                  >
                    {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-red-400" />}
                  </Button>
                  {section.type !== 'PERSONAL_INFO' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-7 h-7 text-red-500 hover:bg-red-500/10"
                      onClick={() => removeSection(section.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-border/50 bg-muted/20 space-y-3">
        <Button onClick={handleAddCustom} variant="outline" className="w-full gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5">
          <Plus className="w-4 h-4" /> Add Section
        </Button>
      </div>
    </div>
  );
}
