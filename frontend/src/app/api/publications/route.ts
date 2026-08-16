import { NextResponse } from "next/server";
import { publicationsData } from "src/data/mockData";
import { Publication } from "src/types/portfolio";

const ADS_API_TOKEN = process.env.ADS_API_TOKEN || process.env.NEXT_PUBLIC_ADS_API_TOKEN;
const ADS_LIBRARY_ID = "6AWkqcbzTQWau_usyl5V8Q";

export async function GET() {
  if (!ADS_API_TOKEN) {
    return NextResponse.json(publicationsData);
  }

  try {
    // 1. Fetch bibcodes from ADS library
    const libRes = await fetch(
      `https://api.adsabs.harvard.edu/v1/biblib/libraries/${ADS_LIBRARY_ID}`,
      {
        headers: {
          Authorization: `Bearer ${ADS_API_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!libRes.ok) {
      console.warn("ADS Library API responded with error:", libRes.status);
      return NextResponse.json(publicationsData);
    }

    const libData = await libRes.json();
    const bibcodes: string[] = libData.documents || [];

    if (!bibcodes || bibcodes.length === 0) {
      return NextResponse.json(publicationsData);
    }

    // 2. Fetch rich metadata for documents in library
    const searchRes = await fetch(
      `https://api.adsabs.harvard.edu/v1/search/query?q=docs(library/${ADS_LIBRARY_ID})&fl=bibcode,title,author,abstract,year,pub,doi,doctype,identifier&rows=100&sort=date+desc`,
      {
        headers: {
          Authorization: `Bearer ${ADS_API_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!searchRes.ok) {
      return NextResponse.json(publicationsData);
    }

    const searchData = await searchRes.json();
    const docs = searchData.response?.docs || [];

    const publications: Publication[] = docs.map((doc: any, index: number) => {
      const authors = Array.isArray(doc.author)
        ? doc.author.slice(0, 8).join(", ") + (doc.author.length > 8 ? ", ... & " + doc.author[doc.author.length - 1] : "")
        : "Jaini, A.";
      
      const title = Array.isArray(doc.title) ? doc.title[0] : (doc.title || "Untitled Paper");
      const abstract = doc.abstract || "Abstract available via NASA ADS.";
      const year = parseInt(doc.year, 10) || new Date().getFullYear();
      const journal = doc.pub || "Astrophysics Publication";
      const doi = Array.isArray(doc.doi) ? doc.doi[0] : doc.doi;
      const arxivId = doc.identifier?.find((id: string) => id.startsWith("arXiv:"))?.replace("arXiv:", "");

      return {
        id: `ads-${doc.bibcode || index}`,
        title,
        authors,
        abstract,
        journal,
        year,
        doi,
        arxivUrl: arxivId ? `https://arxiv.org/abs/${arxivId}` : undefined,
        adsUrl: `https://ui.adsabs.harvard.edu/abs/${doc.bibcode}/abstract`,
        category: title.toLowerCase().includes("astrometry") ? "Astrometry" : title.toLowerCase().includes("frb") || title.toLowerCase().includes("fast radio burst") ? "FRB" : "General",
      };
    });

    return NextResponse.json(publications.length > 0 ? publications : publicationsData);
  } catch (err) {
    console.error("Error fetching NASA ADS library:", err);
    return NextResponse.json(publicationsData);
  }
}
