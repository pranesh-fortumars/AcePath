import { create } from "zustand";

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string; // Markdown or plain text with bullet points
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
  level?: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface ResumeState {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  // Actions
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (startIndex: number, endIndex: number) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experiences: [],
  educations: [],
  skills: [],

  setPersonalInfo: (info) =>
    set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),
    
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
}));
