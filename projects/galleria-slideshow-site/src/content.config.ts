import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const gallery = defineCollection({
  loader: file('src/content/paintings.json'),
  schema: ({ image }) =>
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
          small: image(),
          large: image(),
        }),
        gallery: image(),
      }),
    }),
});

export const collections = { gallery };
