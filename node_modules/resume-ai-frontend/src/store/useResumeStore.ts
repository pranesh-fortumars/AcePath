import { create } from "zustand";

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  // Extended fields
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
  category?: string; // e.g. Programming, Soft Skills
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

export interface ResumeState {
  personalInfo: PersonalInfo;
  careerTarget: CareerTarget;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];

  // Actions
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
}

export const useResumeStore = create<ResumeState>((set) => ({
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolioUrl: "",
    summary: "",
  },
  careerTarget: {
    targetRole: "",
    preferredIndustry: "",
    expectedSalary: "",
    remotePreference: true,
  },
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
  certifications: [],

  setPersonalInfo: (info) =>
    set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),
    
  setCareerTarget: (target) =>
    set((state) => ({ careerTarget: { ...state.careerTarget, ...target } })),

  addExperience: (exp) =>
    set((state) => ({ experiences: [...state.experiences, exp] })),
    
  updateExperience: (id, updatedExp) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExp } : exp
      ),
    })),
    
  removeExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),
    
  reorderExperiences: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.experiences);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { experiences: result };
    }),

  addEducation: (edu) =>
    set((state) => ({ educations: [...state.educations, edu] })),

  updateEducation: (id, updatedEdu) =>
    set((state) => ({
      educations: state.educations.map((edu) =>
        edu.id === id ? { ...edu, ...updatedEdu } : edu
      ),
    })),

  removeEducation: (id) =>
    set((state) => ({
      educations: state.educations.filter((edu) => edu.id !== id),
    })),

  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  removeSkill: (id) =>
    set((state) => ({ skills: state.skills.filter((s) => s.id !== id) })),

  addProject: (proj) => set((state) => ({ projects: [...state.projects, proj] })),
  updateProject: (id, updatedProj) => set((state) => ({
    projects: state.projects.map((proj) => proj.id === id ? { ...proj, ...updatedProj } : proj)
  })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

  addCertification: (cert) => set((state) => ({ certifications: [...state.certifications, cert] })),
  updateCertification: (id, updatedCert) => set((state) => ({
    certifications: state.certifications.map((cert) => cert.id === id ? { ...cert, ...updatedCert } : cert)
  })),
  removeCertification: (id) => set((state) => ({ certifications: state.certifications.filter(c => c.id !== id) })),
}));
