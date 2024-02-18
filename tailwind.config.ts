import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
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
      },
      borderRadius: {
        "6xl": "calc(var(--radius) - 40px)",
        "5xl": "calc(var(--radius) - 32px)",
        "4xl": "calc(var(--radius) - 24px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-oa-gothic)"],
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.32, 0.72, 0, 1)",
        "expo-in-out": "cubic-bezier(0.8, 0, 0.2, 1)",
        "expo-in": "cubic-bezier(0.8, 0, 0.33, 0.33)",
        "expo-out": "cubic-bezier(0.77, 0.77, 0.2, 1)",
      },
      animationTimingFunction: {
        custom: "cubic-bezier(0.32, 0.72, 0, 1)",
        "expo-in-out": "cubic-bezier(0.8, 0, 0.2, 1)",
        "expo-in": "cubic-bezier(0.8, 0, 0.33, 0.33)",
        "expo-out": "cubic-bezier(0.77, 0.77, 0.2, 1)",
      },
      transitionDuration: {
        "2000": "2000ms",
        "5000": "5000ms",
        "10000": "10000ms",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: "hsl(var(--primary)) !important",
            },
            h2: {
              color: "hsl(var(--primary)) !important",
            },
            h3: {
              color: "hsl(var(--primary)) !important",
            },
            h4: {
              color: "hsl(var(--primary)) !important",
            },
            h5: {
              color: "hsl(var(--primary)) !important",
            },
            h6: {
              color: "hsl(var(--primary)) !important",
            },
            p: {
              marginTop: "3rem",
              marginBottom: "3rem",
            },
          },
        },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
