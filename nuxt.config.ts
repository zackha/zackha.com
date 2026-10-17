// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/style.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#111213' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    },
  },
  content: {
    build: {
      markdown: {
        rehypePlugins: {
          // Cited sources are editorial links; open them in a new tab without the default `nofollow`.
          'rehype-external-links': {
            options: { rel: ['noopener', 'noreferrer'], target: '_blank' },
          },
        },
      },
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },
  nitro: {
    prerender: {
      // Cloudflare serves /page from page.html and redirects /page/ and /page.html to /page,
      // so the generated files must match the canonical URLs (no trailing slash).
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
      failOnError: true,
    },
  },
  runtimeConfig: {
    public: {
      buildDate: new Date().toISOString(),
      siteUrl: 'https://zackha.com',
    },
  },
})
