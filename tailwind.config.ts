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
    borderRadius: {
      full: "10000px", // 48px
      "5xl": "3.0rem", // 48px
      "4xl": "2.0rem", // 32px
      "3xl": "1.5rem", // 24px
      "2xl": "1.0rem", // 16px
      xl: "0.75rem", // 12px
      lg: "0.5rem", // 8px
      md: "0.375rem", //6px
      DEFAULT: "0.25rem", // 4px
      sm: "0.125rem", // 2px
      none: "unset", // 2px
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
        "primary-alt": {
          DEFAULT: "hsl(var(--primary-alt))",
          foreground: "hsl(var(--primary-alt-foreground))",
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "lights-on": {
          from: {
            opacity: "0",
            "clip-path": "inset(5%)",
            transform: "scale(111.11%)",
          },
          to: { opacity: "1", "clip-path": "inset(0)", transform: "scale(1)" },
        },
        "ken-burns": {
          "0%": {
            opacity: "0",
            filter: "brightness(1) blur(20px)",
          },
          "10%": {
            opacity: "1",
            filter: "brightness(2) blur(10px)",
          },
          "100%": {
            opacity: "1",
            filter: "brightness(1) blur(0)",
          },
        },
        "gradient-mask": {
          from: {
            mask: "linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 150% 0 /  400% no-repeat",
            opacity: "0",
          },
          to: {
            mask: "linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 0 / 400% no-repeat",
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "lights-on": "lights-on 2s ease-out",
        "ken-burns": "ken-burns 2s ease-in",
        "gradient-mask": "gradient-mask 3s ease-out",
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
              color: "hsl(var(--foreground)) !important",
            },
            h2: {
              color: "hsl(var(--foreground)) !important",
            },
            h3: {
              color: "hsl(var(--foreground)) !important",
            },
            h4: {
              color: "hsl(var(--foreground)) !important",
            },
            h5: {
              color: "hsl(var(--foreground)) !important",
            },
            h6: {
              color: "hsl(var(--foreground)) !important",
            },
            b: {
              color: "hsl(var(--foreground)) !important",
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
