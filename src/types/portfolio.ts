export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  architecture?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  website?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  contact: Contact;
}

export interface Command {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
}

export interface FileSystem {
  [key: string]: any;
}

export interface TerminalState {
  currentPath: string;
  history: string[];
  output: string[];
  isLoading: boolean;
}