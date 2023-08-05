/** @type {import('tailwindcss').Config} */
// import getPalette from 'tailwindcss-palette-generator'
// // const palette = getPalette({
// //   pro: 'hsl(var(--p))',
// // })
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p: 'hsl(var(--p))', // primary hsl(122, 75%, 45%)
        pf: 'hsl(var(--pf))', // primary focus  hsl(122, 75%, 45%)
        pc: 'hsl(var(--pc))', // primary content hsl(111, 40%, 11%)

        s: 'hsl(var(--s))', // secondary hsl(45, 70%, 45%)
        sf: 'hsl(var(--sf))', // secondary focus  hsl(45, 70%, 38%)
        sc: 'hsl(var(--sc))', // secondary content hsl(42, 44%, 11%)

        a: ' hsl(var(--a)) ', // accent hsl(215, 85%, 55%)
        af: 'hsl(var(--af))', // accent focus hsl(215, 85%, 48%)
        ac: 'hsl(var(--ac))', // accent content hsl(228, 87%, 93%)

        n: ' hsl(var(--n)) ', // neutral hsl(29, 20%, 75%)
        nf: 'hsl(var(--nf))', // neutral focus hsl(29, 20%, 68%)
        nc: 'hsl(var(--nc))', // neutral content hsl(29, 5%, 15%)

        b1: 'hsl(var(--b1))', // base 1 hsl(220, 14%, 96%)
        b2: 'hsl(var(--b2))', // base 2 hsl(220, 14%, 89%)
        b3: 'hsl(var(--b3))', // base 3 hsl(220, 14%, 82%)
        bc: 'hsl(var(--bc))', // base content hsl(220, 0%, 18%)

        in: ' hsl(var(--in)) ', // info hsl(255, 36%, 83%)
        inc: 'hsl(var(--inc))', // info content hsl(255, 6%, 16%)

        suc: 'hsl(var(--suc))', // success content hsl(152, 31%, 13%)
        su: ' hsl(var(--su)) ', // success hsl(158, 64%, 52%)

        wa: ' hsl(var(--wa)) ', // warning hsl(43, 96%, 56%)
        wac: 'hsl(var(--wac))', // warning content hsl(39, 47%, 13%)

        er: 'hsl(var(--er)) ', // error hsl(0, 85%, 50%)
        erc: 'hsl(var(--erc))', // error content hsl(14, 100%, 90%)
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
          // 'primary-focus': '#1dc922',
          'primary-content': '#142711',
          secondary: '#f5c73d',
          'secondary-focus': '#f3bd1b',
          'secondary-content': '#2e2614',

          accent: '#2b7cee',
          'accent-focus': '#1269e2',
          'accent-content': '#dee4fd',

          neutral: '#ccbfb3',
          'neutral-focus': '#bead9d',
          'neutral-content': '#282624',

          'base-100': '#f3f4f6',
          'base-200': '#e5e7eb',
          'base-300': '#d1d5db',
          'base-content': '	#2e2e2e',
          info: '#CBC3E3',
          'info-content': '#28262b',
          success: '#36D399',
          'success-content': '#172b22',
          warning: '#e49d3a',
          'warning-content': '#2f2314',
          error: '#ec1313',
          'error-content': '#ffd8cc',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-text-case': 'uppercase', // set default text transform for buttons
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem', // border radius of tabs
        },
      },
      // {
      //   mytheme: {
      //     primary: '#34D399',
      //     'primary-focus': '#6EE7B7',
      //     'primary-content': '#FFFFFF',

      //     secondary: '#059669',
      //     'secondary-focus': '#22D3EE',
      //     'secondary-content': '#FFFFFF',

      //     accent: '#60A5FA',
      //     'accent-focus': '#FBBF24',
      //     'accent-content': '#FFFFFF',

      //     neutral: '#6B7280',
      //     'neutral-focus': '#374151',
      //     'neutral-content': '#FFFFFF',

      //     'base-100': '#FFFFFF',
      //     'base-200': '#F3F4F6',
      //     'base-300': '#E5E7EB',
      //     'base-content': '#374151',

      //     info: '#22D3EE',
      //     'info-content': '#FFFFFF',

      //     success: '#6EE7B7',
      //     'success-content': '#FFFFFF',

      //     warning: '#FBBF24',
      //     'warning-content': '#FFFFFF',

      //     error: '#F97316',
      //     // Add more colors as needed

      //     '--rounded-box': '1rem',
      //     '--rounded-btn': '0.5rem',
      //     '--rounded-badge': '1.9rem',
      //     '--animation-btn': '0.25s',
      //     '--animation-input': '0.2s',
      //     '--btn-text-case': 'uppercase',
      //     '--btn-focus-scale': '0.95',
      //     '--border-btn': '1px',
      //     '--tab-border': '1px',
      //     '--tab-radius': '0.5rem',
      //   },
      // },
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
