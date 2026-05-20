export interface TimelineEntry {
  id: string;
  role: string;
  institution: string;
  dates: string;
  description: string;
  type: "education" | "research" | "milestone" | "career";
}

export interface ResearchProject {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  externalUrl?: string;
  featured: boolean;
  date: string;
  methodology?: string;
  challenges?: string;
  outcomes?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  journal: string;
  year: number;
  doi?: string;
  arxivUrl?: string;
  adsUrl?: string;
  imageUrl?: string;
  category: "FRB" | "Astrometry" | "Machine Learning" | "Instrumentation" | "General";
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  stars: number;
  languages: { name: string; percentage: number; color: string }[];
  repoUrl: string;
  lastUpdated: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  imageUrl?: string;
}

export interface OutreachActivity {
  id: string;
  title: string;
  organisation: string;
  date: string;
  description: string;
  imageUrl: string;
}
