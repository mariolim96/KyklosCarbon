/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mytheme: {
          p: 'var(--p)', // primary
          pf: 'var(--pf)', // primary faded
          sf: 'var(--sf)', // secondary faded
          af: 'hsl(215, 85%, 48%)', // accent faded
          nf: 'hsl(29, 20%, 68%)', // neutral faded
          b1: 'hsl(220, 14%, 96%)', // base 1
          b2: 'hsl(220, 14%, 89%)', // base 2
          b3: 'hsl(220, 14%, 82%)', // base 3
          bc: 'hsl(220, 0%, 18%)', // base contrast
          pc: 'hsl(111, 40%, 11%)', // primary contrast
          sc: 'hsl(42, 44%, 11%)', // secondary contrast
          ac: 'hsl(228, 87%, 93%)', // accent contrast
          nc: 'hsl(29, 5%, 15%)', // neutral contrast
          inc: 'hsl(255, 6%, 16%)', // info contrast
          suc: 'hsl(152, 31%, 13%)', // success contrast
          wac: 'hsl(39, 47%, 13%)', // warning contrast
          erc: 'hsl(14, 100%, 90%)', // error contrast
          s: 'hsl(45, 70%, 45%)', // secondary
          a: ' hsl(215, 85%, 55%) ', // accent
          n: ' hsl(29, 20%, 75%) ', // neutral
          in: ' hsl(255, 36%, 83%) ', // info
          su: ' hsl(158, 64%, 52%) ', // success
          wa: ' hsl(43, 96%, 56%) ', // warning
          er: 'hsl(0, 85%, 50%) ', // error
        },
      },
    },
    // Other theme configurations...
    borderRadius: {
      default: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1dc922',
          secondary: '#c39b22',
          accent: '#2b7cee',
          neutral: '#ccbfb3',
          'base-100': '#f3f4f6',
          info: '#CBC3E3',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#ec1313',
        },
      },
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
