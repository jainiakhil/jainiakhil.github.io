import {
  timelineData,
  projectsData,
  publicationsData,
  githubData,
  awardsData,
  outreachData,
} from "src/data/mockData";
import {
  TimelineEntry,
  ResearchProject,
  Publication,
  GitHubRepo,
  Award,
  OutreachActivity,
} from "src/types/portfolio";

const CMS_PROVIDER = process.env.NEXT_PUBLIC_CMS_PROVIDER || "local";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

// Helper fetcher for Strapi APIs
async function fetchStrapi<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour in ISR
    });
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const data = await res.json();
    return data.data as T;
  } catch (error) {
    console.warn(`CMS Fetch Error for ${endpoint}, falling back to static local data:`, error);
    return fallback;
  }
}

export const dataService = {
  async getTimeline(): Promise<TimelineEntry[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<TimelineEntry[]>("timelines?sort=dates:desc", timelineData);
    }
    return Promise.resolve(timelineData);
  },

  async getProjects(): Promise<ResearchProject[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<ResearchProject[]>("projects?populate=*&sort=date:desc", projectsData);
    }
    return Promise.resolve(projectsData);
  },

  async getProjectBySlug(slug: string): Promise<ResearchProject | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug);
  },

  async getPublications(): Promise<Publication[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<Publication[]>("publications?populate=*&sort=year:desc", publicationsData);
    }
    return Promise.resolve(publicationsData);
  },

  async getGitHubRepos(): Promise<GitHubRepo[]> {
    // In production, you can directly fetch this from GitHub API:
    // https://api.github.com/users/{username}/repos
    // For now we support our clean typed mock data or Strapi
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<GitHubRepo[]>("github-repos", githubData);
    }
    return Promise.resolve(githubData);
  },

  async getAwards(): Promise<Award[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<Award[]>("awards?sort=year:desc", awardsData);
    }
    return Promise.resolve(awardsData);
  },

  async getOutreach(): Promise<OutreachActivity[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<OutreachActivity[]>("outreaches?populate=*&sort=date:desc", outreachData);
    }
    return Promise.resolve(outreachData);
  },
};
