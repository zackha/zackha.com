import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

// Social preview cards (1200×630), drawn at build time in the site's own colours.
// Charis SIL is an open-licensed revival of Charter, the serif the site uses (see server/assets/og/OFL.txt).
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

const colors = {
  bg: '#111213',
  fgStrong: '#eeeeee',
  muted: '#92989b',
  faint: '#55595c',
  accent: '#39ff14',
}

type Node = { type: string, props: { style?: Record<string, unknown>, children?: Node | string | (Node | string)[] } }
const el = (type: string, style: Record<string, unknown>, children?: Node['props']['children']): Node => ({ type, props: { style, children } })

let fonts: Promise<{ name: string, data: ArrayBuffer, weight: 400 | 700, style: 'normal' }[]> | undefined
const loadFonts = () => fonts ??= Promise.all(([400, 700] as const).map(async (weight) => {
  const data = await useStorage('assets:server').getItemRaw<Buffer>(`og/charis-sil-${weight}.woff`)
  if (!data) throw new Error(`Missing OG image font: og/charis-sil-${weight}.woff`)
  const buffer = Buffer.from(data)
  return { name: 'Charis', data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), weight, style: 'normal' as const }
}))

export interface OgImageContent {
  /** Small line above the title, e.g. the publication date. */
  eyebrow?: string
  title: string
  /** Shown after the name in the top line, as in the site header. */
  section?: string
  subtitle?: string
  /** Leave the name out of the top line, e.g. when the title already is the name. */
  hideName?: boolean
}

export const renderOgImage = async ({ eyebrow, title, section, subtitle, hideName }: OgImageContent) => {
  // Long titles step down so they still fit in at most four lines.
  const titleSize = title.length > 90 ? 52 : title.length > 45 ? 60 : 72

  // Satori sizes boxes as content-box by default; border-box keeps the padding inside the card.
  const tree = el('div', {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: '72px 88px',
    background: colors.bg,
    fontFamily: 'Charis',
  }, [
    el('div', { display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 30 }, [
      el('div', { display: 'flex' }, hideName ? [] : [
        el('span', { color: colors.fgStrong, fontWeight: 700 }, 'Sefa Bulak'),
        ...(section ? [el('span', { color: colors.faint, margin: '0 12px' }, '/'), el('span', { color: colors.muted }, section)] : []),
      ]),
      el('span', { color: colors.accent, fontSize: 26 }, 'zackha.com'),
    ]),
    el('div', { display: 'flex', flexDirection: 'column', width: '100%' }, [
      ...(eyebrow ? [el('div', { color: colors.muted, fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }, eyebrow)] : []),
      el('div', { width: '100%', color: colors.fgStrong, fontSize: titleSize, lineHeight: 1.15, letterSpacing: -0.5 }, title),
      ...(subtitle ? [el('div', { color: colors.muted, fontSize: 34, marginTop: 24 }, subtitle)] : []),
    ]),
  ])

  const svg = await satori(tree as never, { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, fonts: await loadFonts() })
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_IMAGE_WIDTH } }).render().asPng()
}
