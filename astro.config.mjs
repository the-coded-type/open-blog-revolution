// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { CONFIG as rawConfig } from "./src/js/load-config.js";

/** @type {any} */
const CONFIG = rawConfig;

import { remarkExtendImage, remarkExtendBlockquote } from "./src/js/plugins/remark-plugins";


const site = process.env.SITE_URL || CONFIG.URL;
const base = process.env.BASE_URL || CONFIG.BASE || '/'

export default defineConfig({
  site: site,
  base: base,

  devToolbar: {
      enabled: false
    },

  integrations: [sitemap(), mdx(
    {
      remarkPlugins: [remarkExtendImage, remarkExtendBlockquote]
    }
  )],
  vite: {
    resolve: {
      alias: {
        "@config": "src/js/load-config.js"
      }
    }
  }
});