export const useDeveloperConsole = () => {
  onMounted(() => {
    console.info(
      '%c Sefa Bulak %c\nCuriosity is a good place to start.\nYou looked closer. That matters.',
      'background:#39ff14;color:#111213;padding:4px 8px;font-weight:bold;',
      'color:#d6d6d6;',
    )
  })
}
