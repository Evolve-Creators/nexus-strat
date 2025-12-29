/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                canvas: 'var(--bg-main)',
                sidebar: 'var(--bg-sidebar)',
                card: 'var(--bg-card)',
                hover: 'var(--bg-hover)',

                primary: 'var(--text-main)',
                muted: 'var(--text-muted)',
                inverted: 'var(--text-inverted)',

                border: 'var(--border-color)',
                accent: 'var(--accent)',
            }
        },
    },
    plugins: [],
}
