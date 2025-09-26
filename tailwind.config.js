module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./*.html"],
  theme: {
    extend: {
      colors: {
        // Enhanced Navy Blue Theme
        primary: "#0f1e3d", // Deeper navy for stronger authority
        secondary: "#1a365d", // Rich navy blue
        accent: "#3182ce", // Navy blue accent for consistency
        
        // Background Colors - Navy themed
        background: "#ffffff", // Clean white
        surface: "#f1f5f9", // Slightly navy-tinted gray
        
        // Text Colors
        'text-primary': "#0f1e3d", // Deep navy for text
        'text-secondary': "#1a365d", // Navy blue for secondary text
        
        // Status Colors - Navy complementary
        success: "#065f46", // Deep green
        warning: "#b45309", // Warm amber
        error: "#991b1b", // Deep red
        
        // Border Colors
        border: "#cbd5e1", // Navy-tinted borders
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'crimson': ['Crimson Text', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      boxShadow: {
        'cta': '0 4px 6px -1px rgba(15, 30, 61, 0.1)',
        'card': '0 1px 3px 0 rgba(15, 30, 61, 0.08)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'lg': '0.5rem',
      },
    },
  },
  plugins: [],
}