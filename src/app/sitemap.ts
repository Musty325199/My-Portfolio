import type { MetadataRoute } from "next";
import { PORTFOLIO_CONTENT } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://musty-portfolio.vercel.app";
  const now = new Date();

  const projectUrls: MetadataRoute.Sitemap = PORTFOLIO_CONTENT.projects.map((project) => ({
    url: `${siteUrl}/work/${project.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: project.isFlagship ? 0.9 : 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
