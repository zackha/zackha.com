// Pages ship without the Nuxt client bundle (`features.noScripts`), so the greeting is an inline script.
const greeting = `console.info(${[
  '%c Sefa Bulak %c\nCuriosity is a good place to start.\nYou looked closer. That matters.',
  'background:#39ff14;color:#111213;padding:4px 8px;font-weight:bold;',
  'color:#d6d6d6;',
].map(arg => JSON.stringify(arg)).join(',')})`

export const useDeveloperConsole = () => {
  useHead({ script: [{ key: 'developer-console', innerHTML: greeting, tagPosition: 'bodyClose' }] })
}
