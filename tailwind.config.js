 /** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
   theme: {
     extend: {
      colors: {
            'grey': '#6C757D',
            'seagreen':'#057B99'
            },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
     },
   },
   plugins: [
    require('flowbite/plugin','flowbite-typography')
    
   ],
 }