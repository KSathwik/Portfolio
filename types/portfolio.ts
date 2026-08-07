export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "AI/ML" | "Enterprise" | "Backend";
  highlights: string[];
  repoUrl: string;
  liveUrl?: string;
  metrics?: string[];
  architecture?: string[];
}

export interface ExperienceProject {
  name: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  metrics?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  current: boolean;
  projects: ExperienceProject[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  status: string;
  inProgress: boolean;
  credentialUrl?: string;
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  score: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}
