import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { z } from 'astro/zod';
/* 
Node.js mehods used
process.cwd() Return Value: This method returns a string specifying the current working directory of the node.js process.
path.join([...paths]) method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
fs.readFileSync(path[, options]) options: encoding, flag
*/

const configSchema = z.object({
    TITLE: z.string().catch('Open Blog Revolution'),
    URL: z.string().url().catch(''),
    BASE: z.string().catch('/'),
    DESCRIPTION: z.string().catch('Free blog template for writers'),
    LANG: z.string().catch('EN'),
    DATE_LANG: z.string().catch('fr'),
    STYLE: z.enum(['sans', 'serif', 'sans-and-serif', 'serif-and-sans']).catch('sans'),
    AUTHOR: z.string().catch('Iko'),
    CONTACT: z.boolean().default(true),
    EMAIL: z.string().email().optional(),
    POST_COVER: z.boolean().default(true),
    POST_THUMBNAILS: z.boolean().default(true),
    HOME_NB_POSTS: z.number().int().positive().catch(6),
    MENU: z.array(z.object({
        label: z.string(),
        url: z.string(),
    })).default([{label: "RSS", url: "rss.xml"}],),
})

let getUseConfigFromFile = (configFileName:string) => {
    const configPath = path.join( process.cwd(), configFileName );
    let yamlObject; 

    try {
        const fileContents = fs.readFileSync(configPath, 'utf8');
        yamlObject = yaml.load(fileContents);
        } catch (error:any) {
            if (error.code === 'ENOENT') {
                return {success: false, data: `Config file not found at path: ${configPath}` };
            } else if (error.name === 'YAMLException') {
                return {success: false, data: `Invalid YAML syntax in ${configPath}: ${error.message}`};
            } else {
                return {success: false, data: `An unexpected error occurred: ${error.message}`};
            }
    }

    if (!yamlObject) {
        return {success: false, data: `YAML is invalid`};
    }
    
    let userConfigFromFile = yamlObject;

    return {success: true, data: userConfigFromFile};
}
 
const configFileName = 'blog-config.yaml';

const userConfig = getUseConfigFromFile(configFileName);

if (!userConfig.success) {
    console.error(`[CONFIG ERROR] ${userConfig.data}`);
    console.log('Reverting to default config')
};


// Parse the inner data if success is true, otherwise parse an empty object
export const CONFIG = userConfig.success ? configSchema.parse(userConfig.data) : configSchema.parse({});

// Export the Type so components can use it
export type ConfigType = z.infer<typeof configSchema>;

