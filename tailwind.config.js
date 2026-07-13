/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12181F',
        'ink-2': '#1B232C',
        paper: '#F5F3EE',
        'paper-dim': '#C9C6BD',
        gold: '#C9A876',
        'gold-dim': '#8F7A54',
        teal: '#5C9A97',
        'teal-dim': '#3C6664',
        line: 'rgba(245,243,238,0.12)',
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
