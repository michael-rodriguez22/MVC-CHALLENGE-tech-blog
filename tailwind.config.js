module.exports = {
  content: ["./views/**/*.handlebars"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto Slab", "serif"],
    },
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.69)), url('/images/hero.jpg')",
      },
    },
  },
  plugins: [],
}
