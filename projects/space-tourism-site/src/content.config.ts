import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const destinations = defineCollection({
  loader: file('src/content/destinations.json'),
  schema: () =>
    z.object({
      name: z.string(),
      images: z.object({
        png: z.string(),
        webp: z.string(),
      }),
      description: z.string(),
      distance: z.string(),
      travel: z.string(),
    }),
});

const crew = defineCollection({
  loader: file('src/content/crew.json'),
  schema: () =>
    z.object({
      name: z.string(),
      images: z.object({
        png: z.string(),
        webp: z.string(),
      }),
      role: z.string(),
      bio: z.string(),
    }),
});

const technology = defineCollection({
  loader: file('src/content/technology.json'),
  schema: () =>
    z.object({
      name: z.string(),
      images: z.object({
        portrait: z.string(),
        landscape: z.string(),
      }),
      description: z.string(),
    }),
});

export const collections = { destinations, crew, technology };
