// tailwind.config.js
module.exports = {
  content: [
    "./*.html",          // Todos los archivos HTML en la raíz
    "./js/**/*.js",      // Todos los JS (aunque Trainers.js usa su propio CSS)
    "!./js/Trainers.js"  // Excluir Trainers.js si quieres, ya que no usa Tailwind
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados de IronPulse (los que usas en TODAS las páginas)
        'blackPulse': '#0a0a0a',
        'orangePulse': '#FF5F1F',
        'greyPulse': '#777777', // O el que prefieras (#8a8580, #6b7280, etc.)
        // Si quieres agregar el rojo de los gradientes:
        'redPulse': '#ef4444',
      },
      fontFamily: {
        // Alias para tus fuentes
        'display': ['"Bebas Neue"', 'sans-serif'], // Para títulos enormes
        'athletic': ['Oswald', 'sans-serif'], // Para textos deportivos (tu clase .font-athletic)
        'sans': ['Oswald', 'sans-serif'], // Fuente por defecto (opcional)
      },
      // Si quieres añadir la animación de gradiente que usas mucho:
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}