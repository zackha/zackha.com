# Sefa Bulak

Personal site and research archive, built with Nuxt and Nuxt Content. Requires Node.js 22.5+.

## Development

```sh
pnpm install
pnpm dev
```

## Writing research

Add a Markdown file to `content/research/`. Every file there is published; keep drafts elsewhere.

```md
---
title: "A Research Title"
description: "A one-sentence summary."
date: 2026-10-06
updated: 2026-10-06        # optional, change whenever the article changes
type: research-note        # publication | working-paper | research-note
keywords: [keyword]        # optional
image:                     # optional social preview, 1200×630 JPEG or PNG
  src: /research/a-research-title/og.jpg
  alt: Image description.
  width: 1200
  height: 630
pdf: /research/a-research-title/paper.pdf  # optional, also exposed to Google Scholar
zenodo: https://zenodo.org/records/0000000  # optional
doi: 10.5281/zenodo.0000000                 # optional
seo:
  title: "Short Search Title"  # optional, ~60 characters
---

## Abstract

Write the article here.
```

Put the article's media in `public/research/<slug>/`. Export images as WebP no wider than 1280px and give their size, so the page reserves space while they lazy-load:

```md
![Image description.](/research/a-research-title/01.webp){width="1280" height="850"}
```

Math (`$...$`, `$$...$$`) is rendered to MathML at build time and typeset by the browser.

## Sharing and search

Every page has Open Graph and Twitter card tags. An article without an `image` gets a title card generated at build time (`/og/<slug>.png`, drawn by `server/utils/ogImage.ts`); the home page uses `/og/home.png`. Articles also carry Google Scholar (Highwire) tags and `ScholarlyArticle` structured data, and are listed in `/sitemap.xml` and the Atom feed at `/feed.xml` (linked as RSS in the home page footer; `/rss.xml` and `/atom.xml` redirect to it).

## Performance

Pages ship as plain HTML with inlined CSS: no client JavaScript (`features.noScripts`), no web fonts (system serif stack), no external stylesheets. Links are prefetched with speculation rules.

## Deploy

The site is fully prerendered and served by Cloudflare Workers static assets on `zackha.com` (see `wrangler.jsonc`).

```sh
pnpm preview   # generate and serve locally with the Workers runtime
pnpm deploy    # generate and deploy to Cloudflare
```

Set `NUXT_PUBLIC_SITE_URL` at build time if the domain is not `https://zackha.com`.
