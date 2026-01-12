// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';


// 2. Define your collection(s)

const posts = defineCollection({
    loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/posts" }),
    schema: ({ image }) => z.object({
        status: z.preprocess((val) => val === null ? undefined : val, z.enum(['published', 'draft']).default('draft')),
        title: z.preprocess((val) => val === null ? undefined : val, z.string().default('Post title')),
        description: z.preprocess((val) => val === null ? undefined : val, z.string().default('Post description')),
        pubDate: z.preprocess((val) => val === null ? undefined : val, z.date().default(new Date('2025-01-01'))),
        author: z.preprocess((val) => val === null ? undefined : val, z.string().default('Anonymous')),
        tags: z.preprocess((val) => val === null ? undefined : val, z.array(z.string()).default(['tag'])),

        cover: z.object({
            title: z.string().optional(),
            src: z.string().optional(),
            alt: z.string().optional()
        }).optional()

    }),
});


// 3. Export a single `collections` object to register your collection(s)
export const collections = { posts };

