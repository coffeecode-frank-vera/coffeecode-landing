import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pricing' }),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    name: z.string(),
    sub: z.string(),
    subEn: z.string().optional(),
    price: z.string(),
    priceEn: z.string().optional(),
    priceNote: z.string(),
    priceNoteEn: z.string().optional(),
    featured: z.boolean().default(false),
    isCustom: z.boolean().default(false),
    cta: z.string(),
    ctaEn: z.string().optional(),
    body: z.string().optional(),
    bodyEn: z.string().optional(),
    features: z.array(z.string()),
    featuresEn: z.array(z.string()).optional(),
  }),
});

export const collections = { pricing };
