module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      'mob': { 'max': '1024px' }
    },
    extend: {
      keyframes: {
        scaleup: {
          "50%": { transform: 'scale(0.5)' },
          // '100%': { transform: 'scale(1)' }
        }
      }
      ,
      animation: {
        scaleup: 'scaleup 1s ease-in'
      }
    },
    fontFamily: {
      "cursive": ['La Belle Aurore', 'cursive'],
      // font-family: 'Nunito', sans-serif;
      "nunito": ['Nunito', 'sans-serif']
    }
  },
  plugins: [],
};
