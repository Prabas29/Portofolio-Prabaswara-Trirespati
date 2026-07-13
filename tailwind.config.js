/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Clean dark theme with a bright blue accent. Token names are kept from
        // the original design; `gold`/`gold-dim` now carry the blue accent so
        // every existing class picks up the new color automatically.
        ink: '#0E1420', // deep navy — page background
        'ink-2': '#182234', // lighter navy — card background
        paper: '#E8EDF4', // near-white — primary text
        'paper-dim': '#94A3B8', // slate — secondary text
        gold: '#4F9CF9', // bright blue — primary accent
        'gold-dim': '#2F6FC0', // deeper blue — borders / bullets / hover
        teal: '#3FC5D8', // cyan — data accent
        'teal-dim': '#2A8A99', // deeper cyan — pill borders
        line: 'rgba(232,237,244,0.12)', // subtle light divider on dark
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1080px',
      },
    },
  },
  plugins: [],
}
