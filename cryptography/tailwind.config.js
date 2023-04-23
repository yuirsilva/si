/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            transitionTimingFunction: {
                'custom': 'cubic-bezier(0.8, 0, 0, 1)'
            }
        },
    },
    plugins: [],
}

