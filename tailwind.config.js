/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1CAE81',
        secondary: 'rgba(255, 255, 255, 0.5)',
        third: 'rgba(28, 174, 129, 0.61)',
        textPrimary: '#333',
        textSecondary: '#A6A3B8',
        home: ' radial-gradient(33.78% 33.78% at 80.44% 37.45%, #FB7C07 26.56%, #FB7C07 75.52%) radial-gradient(32.03% 47.83% at 70.25% 50.04%, #FFA26B 26.5%, #1CAE81 76.56%)',
        orange: '#FFA26B',
        textThird: '#A6A3B8',
        inputBg: 'rgba(217, 217, 217, 0.45)',
        cardBg: 'rgba(255, 255, 255, 0.6)',
      },
      fontFamily: {
        montez: "'Montez', 'cursive'",
        righteous: 'Righteous',
      },
      backgroundImage: {
        hero: "url('/asset/sell/music.png')",
      },
    },
  },
  plugins: [],
};
