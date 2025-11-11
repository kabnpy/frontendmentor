import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const paintings = defineCollection({
  loader: file('src/content/paintings.json'),
  schema: () =>
    z.object({
      slug: z.string(),
      name: z.string(),
      year: z.number(),
      description: z.string(),
      source: z.string(),
      artist: z.object({
        image: z.string(),
        name: z.string(),
      }),
      images: z.object({
        thumbnail: z.string(),
        hero: z.object({
          small: z.string(),
          large: z.string(),
        }),
        gallery: z.string(),
      }),
    }),
});

export const collections = { paintings };
