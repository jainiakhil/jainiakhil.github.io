export interface TimelineEntry {
  id: string;
  role: string;
  institution: string;
  dates: string;
  description: string;
  type: "education" | "research" | "milestone" | "career";
  skills?: string[];
  longDescription?: string;
  highlights?: string[];
  location?: string;
  images?: string[];
}

export interface ProjectPublicationLink {
  title: string;
  url?: string;
  journal?: string;
  year?: string | number;
  doi?: string;
  arxivUrl?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  images?: string[]; // Multiple carousel images (defaults to [imageUrl] if omitted)
  githubUrl?: string;
  externalUrl?: string;
  featured: boolean;
  date: string;
  methodology?: string;
  challenges?: string;
  outcomes?: string;
  publications?: ProjectPublicationLink[];
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
  category: "FRB" | "Astrometry" | "Machine Learning" | "Instrumentation" | "Transients" | "Software & Computing" | "General" | string;
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
  images: string[];
  longDescription?: string;
  challenges?: string;
  outcomes?: string;
  tags: string[];
  externalUrl?: string;
}

export interface TalkEntry {
  id: string;
  title: string;
  venue: string;
  date: string;
  type: "seminar" | "conference";
  authors?: string;
  talkType?: string;
  externalUrl?: string;
  slidesUrl?: string;
  posterUrl?: string;
  supplementaryUrl?: string;
}

export interface ObservatoryVisit {
  id: string;
  name: string;
  location: string;
  year: string;
  purpose?: string;
  reportUrl?: string;
  slidesUrl?: string;
  posterUrl?: string;
  supplementaryUrl?: string;
}

export interface CasualProject {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  thumbnailUrl: string; // Easily change thumbnail image here
  images: string[];     // Carousel of images to scroll through in popup
  githubUrl?: string;
  externalUrl?: string;
  date: string;
  methodology?: string;
  challenges?: string;
  funFactor?: string; // Optional fun detail
}

