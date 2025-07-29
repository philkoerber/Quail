/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                secondary: {
                    50: '#f8fafc',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                },
                // Minimalist light gray palette
                neutral: {
                    25: '#fcfcfc',
                    50: '#fafafa',
                    75: '#f7f7f7',
                    100: '#f5f5f5',
                    150: '#f0f0f0',
                    200: '#e5e5e5',
                    250: '#e0e0e0',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                }
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            }
        },
    },
    plugins: [],
} 