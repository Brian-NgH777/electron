tailwind.config = {
  content: ['./index.html'],
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    themes: [
      {
        viact: {
          primary: '#6419E6',
          secondary: '#D926A9',
          accent: '#36D399',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {},
    },
  },
}
