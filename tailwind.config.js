/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p: 'hsl(var(--p))', // primary
        pf: 'hsl(var(--pf))', // primary faded  hsl(122, 75%, 45%)
        // darker value of pf
        sf: 'hsl(var(--sf))', // secondary faded  hsl(45, 70%, 38%)
        af: 'hsl(var(--af))', // accent faded hsl(215, 85%, 48%)
        nf: 'hsl(var(--nf))', // neutral faded hsl(29, 20%, 68%)
        b1: 'hsl(var(--b1))', // base 1 hsl(220, 14%, 96%)
        b2: 'hsl(var(--b2))', // base 2 hsl(220, 14%, 89%)
        b3: 'hsl(var(--b3))', // base 3 hsl(220, 14%, 82%)
        bc: 'hsl(var(--bc))', // base contrast hsl(220, 0%, 18%)
        pc: 'hsl(var(--pc))', // primary contrast hsl(111, 40%, 11%)
        sc: 'hsl(var(--sc))', // secondary contrast hsl(42, 44%, 11%)
        ac: 'hsl(var(--ac))', // accent contrast hsl(228, 87%, 93%)
        nc: 'hsl(var(--nc))', // neutral contrast hsl(29, 5%, 15%)
        inc: 'hsl(var(--inc))', // info contrast hsl(255, 6%, 16%)
        suc: 'hsl(var(--suc))', // success contrast hsl(152, 31%, 13%)
        wac: 'hsl(var(--wac))', // warning contrast hsl(39, 47%, 13%)
        erc: 'hsl(var(--erc))', // error contrast hsl(14, 100%, 90%)
        s: 'hsl(var(--s))', // secondary hsl(45, 70%, 45%)
        a: ' hsl(var(--a)) ', // accent hsl(215, 85%, 55%)
        n: ' hsl(var(--n)) ', // neutral hsl(29, 20%, 75%)
        in: ' hsl(var(--in)) ', // info hsl(255, 36%, 83%)
        su: ' hsl(var(--su)) ', // success hsl(158, 64%, 52%)
        wa: ' hsl(var(--wa)) ', // warning hsl(43, 96%, 56%)
        er: 'hsl(var(--er)) ', // error hsl(0, 85%, 50%)
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
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('@mertasan/tailwindcss-variables')],
}
