import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Content collections that load from TinaCMS content directories
const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/projects" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['ongoing', 'completed', 'upcoming']),
    recruiting: z.boolean().optional(),
    shortDescription: z.string().optional(),
    collaborators: z.string().optional(),
    contact: z.string().optional(),
    contactEmail: z.string().optional(),
    image: z.string().optional(),
    publicationUrl: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    order: z.number().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    region: z.string().optional(),
    memberType: z.enum(['current', 'founding', 'alumni']),
    interests: z.string().optional(),
    image: z.string().optional(),
    email: z.string().optional(),
    twitter: z.string().optional(),
    order: z.number().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/page" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDescription: z.string().optional(),
    heroTitle: z.string().optional(),
    heroHighlight: z.string().optional(),
    heroSubtitle: z.string().optional(),
    missionTitle: z.string().optional(),
    missionContent: z.string().optional(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })).optional(),
    teamSectionTitle: z.string().optional(),
    teamSectionSubtitle: z.string().optional(),
    ctaText: z.string().optional(),
    ctaButtonText: z.string().optional(),
    ctaButtonLink: z.string().optional(),
  }),
});

export const collections = { projects, team, pages };
