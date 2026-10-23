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

Pages ship as plain HTML with inlined CSS: no client JavaScript (the `noScripts` route rule), no web fonts (system serif stack), no external stylesheets. Links are prefetched with speculation rules. The room is the one exception: its two pages hydrate.

## Room

`/room` is a voice room that exists only while I am in it. I open it at `/room/host` with a password, which that browser then remembers; guests join as listeners, raise a hand, and talk once I invite them. Each guest's browser calls mine directly (WebRTC), and mine mixes what everyone hears (`app/composables/useRoomHost.ts`). A Durable Object (`worker/room.ts`) only knows whether I am in and passes each call's first message, so it runs on the free plan. Up to 10 people.

I and anyone on stage can share a browser tab's audio (stereo, 128 kbps, so music sounds like music) or a screen; the browser offers to bring the screen's sound along, and a screen share replaces any audio share, so there is only ever one share to manage. Stopping the screen leaves its sound playing. The room has one shared audio and one shared screen at a time; microphones stay free. A speaker's screen reaches the others through my browser, which also decides who may share (`app/composables/useCapture.ts`). Sharing needs a browser with `getDisplayMedia`: desktop browsers, and Safari on iOS 27 for screens; sound comes from a tab in Chromium-based desktop browsers (Chrome, Edge), and with a whole screen in Chrome on Windows and recent macOS.

Whether I am in is written into the pages as they are served: `/room` opens on the right sentence, and the home page shows a Live link in its footer only while the room is open. Elements marked `data-when="open"` or `data-when="closed"` are shown or hidden accordingly.

When a direct call can't be made, say between two devices on the same home network or from a strict corporate one, the browser falls back to Cloudflare's TURN relay. The Durable Object hands short-lived relay credentials to each person it lets in and revokes them when they leave; without a TURN key, calls use STUN alone.

```sh
npx wrangler secret put ROOM_PASSWORD        # once; use a long random one
npx wrangler secret put TURN_KEY_ID          # from Cloudflare Realtime > TURN Keys
npx wrangler secret put TURN_KEY_API_TOKEN
```

The room needs the Worker, so try it with `pnpm preview`, with the same three values in `.dev.vars`; under `pnpm dev` it stays closed.

## Deploy

The site is fully prerendered and served by Cloudflare Workers static assets on `zackha.com`; a small Worker answers the room's socket and fills in `/` and `/room` (see `wrangler.jsonc`).

```sh
pnpm preview   # generate and serve locally with the Workers runtime
pnpm deploy    # generate and deploy to Cloudflare
```

Set `NUXT_PUBLIC_SITE_URL` at build time if the domain is not `https://zackha.com`.
