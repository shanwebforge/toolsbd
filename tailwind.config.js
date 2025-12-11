/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // All HTML files in root
    "./*.html",
    
    // All HTML files in subdirectories
    "./assets/*.html",
    "./components/*.html",
    "./css/*.html",
    "./daily-use-tools/*.html",
    "./dev-designer-tools/*.html",
    "./dokan-tools/*.html",
    "./educational-tools/*.html",
    "./freelanching-tools/*.html",
    "./media-tools/*.html",
    "./money-tools/*.html",
    "./nav-menu/*.html",
    "./pdf-tools/*.html",
    "./tools/*.html",
    "./tools-for-general-people/*.html",
    "./update-notice/*.html",
    
    // JS files
    "./scripts/*.js",
    "./*.js"
  ],
  darkMode: 'class', // ✅ Added: Enable class-based dark mode
  theme: {
    
    extend: {

      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
      colors: {
        primary: '#3b82f6',      // Blue
        secondary: '#10b981',    // Emerald
        accent: '#9b03a8',       // Purple (your custom color)
        customPurple: '#6b5bcc', // Your specific purple
        customTeal: '#05585e',   // Your teal color
        customPink: '#efb3f1',   // Light pink from gradient
        customBlue: '#b3dbf1',   // Light blue from gradient
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'alkatra': ['Alkatra', 'cursive'], // ✅ Added: For your font
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(135deg, rgba(239,179,241,0.8), rgba(179,219,241,0.8))',
        'gradient-footer': 'linear-gradient(135deg, #efb3f1cc, #b3dbf1cc)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'medium': '0 5px 20px rgba(0, 0, 0, 0.1)',
        'footer': '0 -1px 5px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      }
    },
  },
  plugins: [],
  safelist: [
    // Ensure dynamic classes are included
    'text-purple-600',
    'dark:text-purple-400',
    'bg-purple-600',
    'dark:bg-purple-400',
    'border-purple-600',
    'dark:border-purple-400',
    'hover:text-purple-800',
    'dark:hover:text-purple-300',
    'text-customPurple',
    'bg-customPurple',
    'bg-gradient-custom',
    'bg-gradient-footer',
    'font-alkatra',
  ],
}