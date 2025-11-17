import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

/* 
Node.js mehods used

process.cwd() Return Value: This method returns a string specifying the current working directory of the node.js process.
path.join([...paths]) method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
fs.readFileSync(path[, options]) options: encoding, flag
*/

let getUseConfigFromFile = (configFileName) => {
    const configPath = path.join( process.cwd(), configFileName );
    let yamlObject; 

    try {
        const fileContents = fs.readFileSync(configPath, 'utf8');
        yamlObject = yaml.load(fileContents);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return {configError: `Config file not found at path: ${configPath}` };
            } else if (error.name === 'YAMLException') {
                return {configError: `Invalid YAML syntax in ${configPath}: ${error.message}`};
            } else {
                return {configError: `An unexpected error occurred: ${error.message}`};
            }
    }

    if (!yamlObject || !yamlObject.CONFIG) {
        return {configError: `YAML is missing a CONFIG key or is invalid`};
    }

    if (yamlObject.CONFIG.length === 0) {
        return {configError: 'YAML CONFIG array is empty'};
    }
    
    let userConfigFromFile = {};
    yamlObject.CONFIG.forEach(el => {
        Object.assign(userConfigFromFile, el)
    });

    return userConfigFromFile;
}
 
const DEFAULT_CONFIG = {
    TITLE: 'My blog',
    URL: 'www.url.com',
    DESCRIPTION: 'This is a blog about so many things',
    LANG: 'EN',
    AUTHOR: 'John Doe',
    CONTACT: true,
    EMAIL: 'contact@contact.com',
    COVER: false,
    POST_COVER: true,
    POST_THUMBNAILS: true,
    HOME_NB_POSTS: 4,
    MENU: [
        {
        label: "RSS",
        url: "rss.xml"}]
};

const createConfig = (defaultConfig, userConfig) => {
    let config = {};
    // Was the config loaded from the yaml
    if (userConfig.configError) {
        config = { ...defaultConfig };
        return config;
    } else {
        // 
        const HOME_NB_POSTS = Math.abs(Math.floor(userConfig.HOME_NB_POSTS));
        userConfig.HOME_NB_POSTS = HOME_NB_POSTS;
        config = {...defaultConfig, ...userConfig};
        return config;
    }
}
const userConfig = getUseConfigFromFile('blog-config.yaml');

if (userConfig.configError) {
    console.error(`[CONFIG ERROR] ${userConfig.configError}`);
    console.log('Reverting to default config')
};

export const CONFIG = createConfig(DEFAULT_CONFIG, userConfig);



