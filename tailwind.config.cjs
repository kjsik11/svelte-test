module.exports = {
  content: ['./src/app.html', './src/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
