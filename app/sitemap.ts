import type { MetadataRoute } from "next";
import { getAllAssets, getStages } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.uxvault.in";
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/kit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/process`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    }
  ];

  // Add stage pages
  const stages = getStages();
  stages.forEach((stage) => {
    routes.push({
      url: `${baseUrl}/process/${stage.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    });
  });

  // Add asset detail pages
  const assets = getAllAssets();
  assets.forEach((asset) => {
    routes.push({
      url: `${baseUrl}/assets/${asset.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    });
  });

  return routes;
}
