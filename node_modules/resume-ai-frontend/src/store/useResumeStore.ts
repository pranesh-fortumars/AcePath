import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  industry?: string;
  location?: string;
  employmentType?: string;
  teamSize?: number;
  revenueImpact?: string;
  costSavings?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  level?: string;
}

export interface Project {
  id: string;
  projectName: string;
  role: string;
  technologies: string;
  description: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  url?: string;
}

export interface CareerTarget {
  targetRole: string;
  preferredIndustry: string;
  expectedSalary: string;
  remotePreference: boolean;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolioUrl?: string;
  summary: string;
}

// ==========================================
// BUILDER 2.0 DYNAMIC ARCHITECTURE
// ==========================================

export type SectionType = 
  | 'PERSONAL_INFO' | 'SUMMARY' | 'CAREER_OBJECTIVE' | 'CORE_COMPETENCIES' 
  | 'EXPERIENCE' | 'PROJECTS' | 'EDUCATION' | 'CERTIFICATIONS' 
  | 'SKILLS' | 'LANGUAGES' | 'PUBLICATIONS' | 'VOLUNTEERING' | 'CUSTOM';

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  order: number;
  items: any[]; // Dynamic payload
}

export interface ResumeVersion {
  id: string;
  timestamp: string;
  label: string;
  sections: ResumeSection[];
  designConfig: DesignConfig;
  metrics: {
    atsScore: number;
    keywordDensity: number;
    impactScore: number;
  };
}

export interface DesignConfig {
  fontFamily: string;
  primaryColor: string;
  layout: 'classic' | 'modern' | 'creative' | 'executive';
  spacing: 'compact' | 'normal' | 'relaxed';
}

export interface ResumeState {
  // Legacy Fields (Kept for compatibility)
  personalInfo: PersonalInfo;
  careerTarget: CareerTarget;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];

  // Builder 2.0 Dynamic Engine Fields
  sections: ResumeSection[];
  versions: ResumeVersion[];
  designConfig: DesignConfig;
  
  // Legacy Actions
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setCareerTarget: (target: Partial<CareerTarget>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (startIndex: number, endIndex: number) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  addProject: (proj: Project) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Builder 2.0 Dynamic Actions
  addSection: (section: ResumeSection) => void;
  updateSection: (id: string, section: Partial<ResumeSection>) => void;
  removeSection: (id: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  
  // Version Control
  saveVersion: (label: string) => void;
  restoreVersion: (versionId: string) => void;
  
  // Design Studio
  updateDesign: (config: Partial<DesignConfig>) => void;
}

// Default Base Sections Template
const DEFAULT_SECTIONS: ResumeSection[] = [
  { id: 'sec-personal', type: 'PERSONAL_INFO', title: 'Personal Information', isVisible: true, order: 0, items: [] },
  { id: 'sec-summary', type: 'SUMMARY', title: 'Professional Summary', isVisible: true, order: 1, items: [] },
  { id: 'sec-exp', type: 'EXPERIENCE', title: 'Work Experience', isVisible: true, order: 2, items: [] },
  { id: 'sec-proj', type: 'PROJECTS', title: 'Technical Projects', isVisible: true, order: 3, items: [] },
  { id: 'sec-edu', type: 'EDUCATION', title: 'Education', isVisible: true, order: 4, items: [] },
  { id: 'sec-skills', type: 'SKILLS', title: 'Core Competencies', isVisible: true, order: 5, items: [] },
];

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      // Legacy State
      personalInfo: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", github: "", portfolioUrl: "", summary: "" },
      careerTarget: { targetRole: "", preferredIndustry: "", expectedSalary: "", remotePreference: true },
      experiences: [],
      educations: [],
      skills: [],
      projects: [],
      certifications: [],

      // Builder 2.0 State
      sections: DEFAULT_SECTIONS,
      versions: [],
      designConfig: { fontFamily: 'Inter', primaryColor: '#000000', layout: 'classic', spacing: 'normal' },

      // Legacy Actions
      setPersonalInfo: (info) => set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),
      setCareerTarget: (target) => set((state) => ({ careerTarget: { ...state.careerTarget, ...target } })),
      addExperience: (exp) => set((state) => ({ experiences: [...state.experiences, exp] })),
      updateExperience: (id, updatedExp) => set((state) => ({ experiences: state.experiences.map((exp) => exp.id === id ? { ...exp, ...updatedExp } : exp) })),
      removeExperience: (id) => set((state) => ({ experiences: state.experiences.filter((exp) => exp.id !== id) })),
      reorderExperiences: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.experiences);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { experiences: result };
      }),
      addEducation: (edu) => set((state) => ({ educations: [...state.educations, edu] })),
      updateEducation: (id, updatedEdu) => set((state) => ({ educations: state.educations.map((edu) => edu.id === id ? { ...edu, ...updatedEdu } : edu) })),
      removeEducation: (id) => set((state) => ({ educations: state.educations.filter((edu) => edu.id !== id) })),
      addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
      removeSkill: (id) => set((state) => ({ skills: state.skills.filter((s) => s.id !== id) })),
      addProject: (proj) => set((state) => ({ projects: [...state.projects, proj] })),
      updateProject: (id, updatedProj) => set((state) => ({ projects: state.projects.map((proj) => proj.id === id ? { ...proj, ...updatedProj } : proj) })),
      removeProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),
      addCertification: (cert) => set((state) => ({ certifications: [...state.certifications, cert] })),
      updateCertification: (id, updatedCert) => set((state) => ({ certifications: state.certifications.map((cert) => cert.id === id ? { ...cert, ...updatedCert } : cert) })),
      removeCertification: (id) => set((state) => ({ certifications: state.certifications.filter(c => c.id !== id) })),

      // Builder 2.0 Actions
      addSection: (section) => set((state) => ({ sections: [...state.sections, section] })),
      updateSection: (id, updatedSection) => set((state) => ({
        sections: state.sections.map(sec => sec.id === id ? { ...sec, ...updatedSection } : sec)
      })),
      removeSection: (id) => set((state) => ({ sections: state.sections.filter(sec => sec.id !== id) })),
      reorderSections: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.sections);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { sections: result.map((s, idx) => ({ ...s, order: idx })) };
      }),

      // Version Control
      saveVersion: (label) => set((state) => {
        const newVersion: ResumeVersion = {
          id: `v_${Date.now()}`,
          timestamp: new Date().toISOString(),
          label,
          sections: state.sections,
          designConfig: state.designConfig,
          metrics: { atsScore: Math.floor(Math.random() * 20) + 80, keywordDensity: 85, impactScore: 92 } // Mock telemetry
        };
        return { versions: [newVersion, ...state.versions] };
      }),
      restoreVersion: (versionId) => set((state) => {
        const target = state.versions.find(v => v.id === versionId);
        if (!target) return state;
        return { sections: target.sections, designConfig: target.designConfig };
      }),

      // Design Studio
      updateDesign: (config) => set((state) => ({ designConfig: { ...state.designConfig, ...config } }))
    }),
    {
      name: "resume-ai-builder-v2"
    }
  )
);
