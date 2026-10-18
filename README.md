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
image:                     # optional, used for social previews
  src: /research/a-research-title/cover.png
  alt: Image description.
  width: 1200
  height: 630
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

## Performance

Pages ship as plain HTML with inlined CSS: no client JavaScript (`features.noScripts`), no web fonts (system serif stack), no external stylesheets. Links are prefetched with speculation rules.

## Deploy

The site is fully prerendered and served by Cloudflare Workers static assets on `zackha.com` (see `wrangler.jsonc`).

```sh
pnpm preview   # generate and serve locally with the Workers runtime
pnpm deploy    # generate and deploy to Cloudflare
```

Set `NUXT_PUBLIC_SITE_URL` at build time if the domain is not `https://zackha.com`.
