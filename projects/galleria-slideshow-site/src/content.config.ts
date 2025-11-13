import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const paintings = defineCollection({
  loader: file('src/content/paintings.json'),
  schema: ({image}) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      year: z.number(),
      description: z.string(),
      source: z.string(),
      artist: z.object({
        image: image(),
        name: z.string(),
      }),
      images: z.object({
        thumbnail: image(),
        hero: z.object({
          small: z.string(),
          large: z.string(),
        }),
        gallery: image(),
      }),
    }),
});

export const collections = { paintings };
