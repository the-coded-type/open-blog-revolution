// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';


// 2. Import loader(s)
// import { glob } from 'astro/loaders';
// We don’t need to use the glob here, as we are importing only md/mdx files, which are the default astro content

// 3. Define your collection(s)

const posts = defineCollection({
    type: 'content', // It's good practice to explicitly state the type
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




// 4. Export a single `collections` object to register your collection(s)
export const collections = { posts };