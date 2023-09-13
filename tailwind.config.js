/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                "open-sans": ["Open Sans", "sans-serif"],
            },
            keyframes: {
                circle: {
                    "0%": { opacity: 1 },
                    "40%": { opacity: 1 },
                    "100%": { width: "200%", height: "200%", opacity: 0 },
                },
                stuckMoveDown: {
                    "0%": {
                        transform: "translateY(-100%)",
                    },
                    "100%": {
                        transform: "translateY(0)",
                    },
                },
                blink: {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
            colors: {
                primary: "#bd8b1b",
                hover: "#E6BC67",
                initial: "initial",
                sidebar: "#bd8b1b",
            },
            backgroundImage: {
                "cta-button":
                    "linear-gradient(90deg,rgba(189, 139, 27, 1) 6%,rgba(235, 206, 100, 1) 50%,rgba(189, 139, 27, 1) 100%)",
            },
            spacing: {
                header: 90,
            },
        },
    },
    plugins: [],
};
