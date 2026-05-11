import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zypherolab.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      customPages: [
        'https://zypherolab.com/',
        'https://zypherolab.com/servicii-web',
        'https://zypherolab.com/preturi-web',
        'https://zypherolab.com/studii-de-caz',
        'https://zypherolab.com/contact',
        'https://zypherolab.com/blog',
        'https://zypherolab.com/en/',
        'https://zypherolab.com/en/web-services',
        'https://zypherolab.com/en/web-pricing',
        'https://zypherolab.com/en/case-studies',
        'https://zypherolab.com/en/contact',
        'https://zypherolab.com/en/blog',
      ],
      i18n: {
        defaultLocale: 'ro',
        locales: {
          ro: 'ro-RO',
          en: 'en-US',
        },
      },
    }),
  ],
  build: {
    format: 'directory',
  },
  trailingSlash: 'ignore',
});
