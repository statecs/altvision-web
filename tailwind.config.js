/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  // Only emit hover: styles on devices that can actually hover, so a tap on
  // touch screens doesn't leave buttons stuck in their hover state.
  future: { hoverOnlyWhenSupported: true },
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}" // Add this line
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['Fraunces', 'Georgia', 'serif'],
  			sans: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
  			mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace']
  		},
  		colors: {
  			paper: {
  				DEFAULT: '#F4F7FC',
  				deep: '#E4ECF8'
  			},
  			ink: {
  				DEFAULT: '#131C2B',
  				soft: '#5A6B84'
  			},
  			azure: {
  				DEFAULT: '#345A85',
  				deep: '#22405F',
  				bright: '#5B8FDC'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		// Strong curves — the built-in CSS easings are too weak to feel intentional.
  		transitionTimingFunction: {
  			'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
  			'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			// Height is tolerated here (no transform equivalent for accordions);
  			// the opacity ramp masks the reflow.
  			'accordion-down': {
  				from: {
  					height: '0',
  					opacity: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)',
  					opacity: '1'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)',
  					opacity: '1'
  				},
  				to: {
  					height: '0',
  					opacity: '0'
  				}
  			},
        'slide-up': {
        '0%': {
          transform: 'translateY(20px)',
          opacity: '0'
        },
        '100%': {
          transform: 'translateY(0)',
          opacity: '1'
        },
      },
        marquee: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 200ms cubic-bezier(0.23, 1, 0.32, 1)',
  			'accordion-up': 'accordion-up 200ms cubic-bezier(0.23, 1, 0.32, 1)',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        marquee: 'marquee 55s linear infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
