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
        // SWAPPING BLUE FOR NEON ORANGE
        // Using a high-saturation Orange-Red for that 'Security Alert' vibe
        'seagreen': '#FF4D00' 
      },
      dropShadow: {
        // Adding a Neon Glow effect specifically for your new theme
        'neon': '0 0 10px rgba(255, 77, 0, 0.5)',
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography') // Fixed the syntax for multiple requires
  ],
}