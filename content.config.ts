import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    research: defineCollection({
      type: 'page',
      source: 'research/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        updated: z.date().optional(),
        type: z.enum(['publication', 'working-paper', 'research-note']).default('research-note'),
        authors: z.array(z.string()).default(['Sefa Bulak']),
        keywords: z.array(z.string()).default([]),
        image: z.object({
          src: z.string(),
          alt: z.string(),
          width: z.number().optional(),
          height: z.number().optional(),
        }).optional(),
        venue: z.string().optional(),
        doi: z.string().optional(),
      }),
    }),
  },
})
