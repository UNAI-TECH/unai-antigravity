import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Core blacks
        void: "hsl(var(--black-void))",
        "black-deep": "hsl(var(--black-deep))",
        "black-base": "hsl(var(--black-base))",
        "black-elevated": "hsl(var(--black-elevated))",
        
        // Metal blue spectrum
        "metal-blue": {
          900: "hsl(var(--metal-blue-900))",
          700: "hsl(var(--metal-blue-700))",
          500: "hsl(var(--metal-blue-500))",
          400: "hsl(var(--metal-blue-400))",
          300: "hsl(var(--metal-blue-300))",
        },
        
        // Metal purple spectrum
        "metal-purple": {
          900: "hsl(var(--metal-purple-900))",
          700: "hsl(var(--metal-purple-700))",
          500: "hsl(var(--metal-purple-500))",
          400: "hsl(var(--metal-purple-400))",
          300: "hsl(var(--metal-purple-300))",
        },
        
        // Energy accents
        energy: {
          blue: "hsl(var(--energy-blue))",
          purple: "hsl(var(--energy-purple))",
          plasma: "hsl(var(--energy-plasma))",
        },
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        "ambient-sm": "var(--shadow-ambient-sm)",
        "ambient-md": "var(--shadow-ambient-md)",
        "ambient-lg": "var(--shadow-ambient-lg)",
        "glow-blue": "var(--glow-blue-soft)",
        "glow-blue-strong": "var(--glow-blue-strong)",
        "glow-purple": "var(--glow-purple-soft)",
        "glow-purple-strong": "var(--glow-purple-strong)",
        "glow-plasma": "var(--glow-plasma)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-metal": "linear-gradient(135deg, hsl(var(--metal-blue-500)), hsl(var(--metal-purple-500)))",
        "gradient-metal-soft": "linear-gradient(135deg, hsl(var(--metal-blue-700)), hsl(var(--metal-purple-700)))",
        "gradient-energy": "linear-gradient(90deg, hsl(var(--energy-blue)), hsl(var(--energy-purple)))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      transitionTimingFunction: {
        "float": "cubic-bezier(0.22, 1, 0.36, 1)",
        "inertia": "cubic-bezier(0.16, 1, 0.3, 1)",
        "magnetic": "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
