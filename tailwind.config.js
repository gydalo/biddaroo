/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    colors: {
      transparent: 'transparent',
      background: '#262626',
      button: '#3E4435',
      header: '#606060',
      'white': '#FFFFFF'
    },
    extend: {
      fontFamily: {
        heading: ['"Instrument Serif"', 'serif'],
        h2: ['"Ysabeau SC"', 'sans-serif'],
        p: ['"Instrument Sans"', 'sans-serif'],
        "button": ['"Ysabeau SC"']
      },
      display: {
        'hidden': 'none',
        'block': 'block',
      },
      fontSize: {
        xs: "0.7rem",
        sm: "1.0rem", 
        lg: "1.5rem", 
        xl: "2.0rem",
        tiny: "0.625rem", // Custom size for very small text (10px)
        huge: "3.5rem", // Custom size for large headings (56px)
        massive: "5rem", // Extra-large font size for hero sections (80px)
      },
      spacing: {
        '12': '2rem', 
        '14': '3rem', 
        '16': '4rem',      // Slightly larger than 15
        '20': '5rem',      // Common size
        '24': '6rem',      // Common size
        '32': '8rem',      // Larger step
        '40': '10rem',     // Larger step
        '48': '12rem',     // Larger step
        '56': '14rem',     // Intermediate size
        '64': '16rem',     // Intermediate size
        '72': '18rem',     // Intermediate size
        '80': '20rem',     // Close to 128
        '96': '24rem',     // Close to 128
        '112': '28rem',    // Close to 128
        '120': '30rem',    // Close to 128
      },

    },
  },
  plugins: [],
}

