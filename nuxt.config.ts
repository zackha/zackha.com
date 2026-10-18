// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync, readFileSync } from 'node:fs'

// Social preview cards are not linked from any page, so the crawler can't find them; list them.
// Articles that set their own `image` in front matter don't need one.
const cardSlugs = readdirSync('content/research')
  .filter(file => file.endsWith('.md'))
  .filter(file => !/^image:/m.test(readFileSync(`content/research/${file}`, 'utf8').split(/^---$/m)[1] ?? ''))
  .map(file => file.slice(0, -3))

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
        // Credits shared links on X to this account.
        { name: 'twitter:site', content: '@ZHatlen' },
        { name: 'twitter:creator', content: '@ZHatlen' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'application/atom+xml', title: 'Sefa Bulak — Research', href: '/feed.xml' },
      ],
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
      routes: [
        '/',
        '/sitemap.xml',
        '/robots.txt',
        '/feed.xml',
        '/og/home.png',
        ...cardSlugs.map(slug => `/og/${slug}.png`),
      ],
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
