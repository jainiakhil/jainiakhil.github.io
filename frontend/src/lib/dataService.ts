import {
  timelineData,
  projectsData,
  publicationsData,
  githubData,
  awardsData,
  outreachData,
  casualProjectsData,
  talksData,
  observatoryVisitsData,
} from "src/data/mockData";
import {
  TimelineEntry,
  ResearchProject,
  Publication,
  GitHubRepo,
  Award,
  OutreachActivity,
  CasualProject,
  TalkEntry,
  ObservatoryVisit,
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

// GitHub language colour mapping
const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  CUDA: "#76B900",
  Rust: "#dea584",
  Shell: "#89e051",
  TeX: "#3D6117",
};

function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return date.toLocaleDateString("en-AU", { month: "short", year: "numeric" });
    return date.toLocaleDateString("en-AU", { month: "short", year: "numeric" });
  } catch {
    return "Recently";
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

  async getCasualProjects(): Promise<CasualProject[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<CasualProject[]>("casual-projects?populate=*&sort=date:desc", casualProjectsData);
    }
    return Promise.resolve(casualProjectsData);
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
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<GitHubRepo[]>("github-repos", githubData);
    }

    try {
      const res = await fetch("https://api.github.com/users/jainiakhil/repos?sort=updated&per_page=100", {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Filter out forks if desired, or sort by most recently updated
          const repos: GitHubRepo[] = data
            .filter((item: any) => !item.fork)
            .map((item: any) => {
              const langName = item.language || "Code";
              const langColor = LANGUAGE_COLORS[langName] || "#C47D2E";

              return {
                id: `gh-${item.id}`,
                name: item.name,
                description: item.description || "Public astronomical software and computational tools created by Akhil Jaini.",
                stars: item.stargazers_count ?? 0,
                languages: [
                  {
                    name: langName,
                    percentage: 100,
                    color: langColor,
                  },
                ],
                repoUrl: item.html_url,
                lastUpdated: formatRelativeTime(item.pushed_at || item.updated_at),
              };
            });

          if (repos.length > 0) return repos;
        }
      }
    } catch (err) {
      console.warn("GitHub live API fetch error, falling back to mock data:", err);
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

  async getTalks(): Promise<TalkEntry[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<TalkEntry[]>("talks?sort=date:desc", talksData);
    }
    return Promise.resolve(talksData);
  },

  async getObservatoryVisits(): Promise<ObservatoryVisit[]> {
    if (CMS_PROVIDER === "strapi") {
      return fetchStrapi<ObservatoryVisit[]>("observatory-visits?sort=year:desc", observatoryVisitsData);
    }
    return Promise.resolve(observatoryVisitsData);
  },
};
