// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/style.css'],
  features: {
    // Every page is static content: ship HTML and inlined CSS only. No hydration, no payload,
    // no JS chunks; links are prefetched/prerendered through speculation rules instead.
    noScripts: 'production',
    inlineStyles: true,
  },
  experimental: {
    // Without client navigation nothing reads the app manifest; don't emit it.
    appManifest: false,
    // Render 404.html from error.vue at build time. The default is an empty SPA shell, which
    // stays blank without client scripts; Cloudflare serves this file for unknown URLs.
    prerenderErrorPages: true,
  },
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
        // Render $...$ and $$...$$ to MathML at build time. Browsers lay it out natively with the
        // system math font, so pages need neither KaTeX's stylesheet nor its web fonts.
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {
            options: { output: 'mathml', throwOnError: false, strict: 'ignore' },
          },
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
