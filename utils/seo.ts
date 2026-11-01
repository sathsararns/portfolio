import site from "@/data/site.config.json";
import { achievements } from "@/data/achievements.data";
import { GITHUB, LINKEDIN } from "@/data/constants.data";
import type { Project } from "@/data/projects.data";

export { site };

export function pageUrl(route = "/"): string {
  const relative = route.replace(/^\/+|\/+$/g, "");
  return new URL(relative ? relative + "/" : "", site.url).href;
}

export function publicUrl(source: string): string {
  if (/^https?:\/\//.test(source)) return source;
  const basePath = new URL(site.url).pathname.replace(/\/$/, "");
  const relative = source.startsWith(basePath + "/") ? source.slice(basePath.length) : source;
  return new URL(relative.replace(/^\/+/, ""), site.url).href;
}

export function projectMetadata(project: Project) {
  const metadata = (site.projects as Record<string, { title: string; description: string }>)[project.slug];
  return metadata ?? {
    title: project.title + " | " + site.name,
    description: project.details.introduction.slice(0, 157).replace(/\s+\S*$/, "") + "...",
  };
}

const person = {
  "@type": "Person",
  "@id": site.url + "#person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  image: publicUrl("/my_photo.jpeg"),
  sameAs: [LINKEDIN, GITHUB],
  award: achievements.map((item) => [item.award, item.event, item.year].filter(Boolean).join(" - ")),
};

export function homeStructuredData(projects: readonly Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      { "@type": "WebSite", "@id": site.url + "#website", name: site.name + " Portfolio", url: site.url, publisher: { "@id": person["@id"] } },
      { "@type": "ProfilePage", "@id": site.url + "#profile", url: site.url, name: site.title, description: site.description, inLanguage: "en", mainEntity: { "@id": person["@id"] }, isPartOf: { "@id": site.url + "#website" } },
      { "@type": "ItemList", name: "Recent works", itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.title, url: pageUrl("projects/" + project.slug) })) },
    ],
  };
}

export function projectStructuredData(project: Project) {
  const url = pageUrl("projects/" + project.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CreativeWork", "@id": url + "#project", name: project.title, description: projectMetadata(project).description, url, image: publicUrl(project.banner), creator: { "@type": "Person", "@id": person["@id"], name: site.name, url: site.url }, keywords: project.details.technologies, ...(project.githubUrl ? { sameAs: [project.githubUrl] } : {}) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Portfolio", item: site.url },
        { "@type": "ListItem", position: 2, name: project.title, item: url },
      ] },
    ],
  };
}
