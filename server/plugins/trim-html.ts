// Pages ship without client scripts (`features.noScripts`), so markup kept only for hydration or
// for tooling is dead weight. On a math-heavy article it is roughly a third of the HTML.
const removals: RegExp[] = [
  // Vue's fragment and v-if anchors exist for hydration, which never happens.
  /<!--\[-->|<!--\]-->|<!---->/g,
  // KaTeX keeps each formula's TeX source in an annotation that browsers never render.
  /<annotation encoding="application\/x-tex">[\s\S]*?<\/annotation>/g,
  // With the annotation gone, the <semantics> wrapper has nothing left to pair.
  /<\/?semantics>/g,
  // In HTML documents <math> is in the MathML namespace already.
  / xmlns="http:\/\/www\.w3\.org\/1998\/Math\/MathML"/g,
]

const trim = (html: string) => removals.reduce((result, pattern) => result.replace(pattern, ''), html)

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.body = html.body.map(trim)
  })
})
