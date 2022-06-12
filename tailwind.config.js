const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    screens: {
      'mbm': '375px',
      // => @media (min-width: 375px)

      'mbl': '425px',
      // => @media (min-width: 425px)

      'sm': '640px',
      // => @media (min-width: 640px)

      'md': '768px',
      // => @media (min-width: 768px)

      'lg': '1024px',
      // => @media (min-width: 1024px)

      'xl': '1280px',
      // => @media (min-width: 1280px)

      '2xl': '1536px',
      // => @media (min-width: 1536px)

      '3xl': '2560px'
      // => @media (min-width: 2560px)
    },
    colors: {
      ...colors,
      'mpPurple1' : '#901A92',
      'mpPurple2' : '#921A95',
      'mpDarkPurple' : '#971C9A',
      'mpGradientInit' : 'rgba(164,77,170,1)',
      'mpGradientMiddle' : 'rgba(153,51,186,1)',
      'mpGradientEnd' : 'rgba(142,28,201,1)',
      'mpGrey' : '#767676',
      'mpGreyLink' : '#747242',
      'mpLightGrey' : '#D1D1D1'
    }
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('flowbite/plugin')
  ]
}
