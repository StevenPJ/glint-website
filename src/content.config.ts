import { defineCollection, z } from "astro:content";

// For now, we're using static content in pages
// TinaCMS collections will be enabled after cloud setup

// Placeholder collections that match our TinaCMS schema
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['ongoing', 'completed', 'upcoming']),
    shortDescription: z.string().optional(),
    collaborators: z.string().optional(),
    contact: z.string().optional(),
    contactEmail: z.string().optional(),
    image: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    order: z.number().optional(),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    journal: z.string(),
    year: z.number(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    doi: z.string().optional(),
    link: z.string().optional(),
    pubType: z.enum(['journal', 'poster', 'abstract', 'other']).optional(),
    order: z.number().optional(),
  }),
});

const team = defineCollection({
  type: 'content',
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

export const collections = { projects, publications, team };
