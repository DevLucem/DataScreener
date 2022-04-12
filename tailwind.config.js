module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      fore: "#333859",
      back: "#10162a",
      accent: "#484c6a",
      primary: "#00c97e",
      white: "#ffffff",
      black: "#000000",
      gray: "#5c6070",
      danger: "#ff3939",
    },
    extend: {},
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
