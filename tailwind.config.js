/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				caudex: ["Caudex", "serif"],
				arizonia: ["Arizonia", "cursive"],
			},
			colors: {
				primary: "#2A2A2A",
				secondary: "#669bbc",
				accent: "#0077b6",
			},
			backgroundImage: {
				"brush-stroke-pattern": "url('./src/assets/paint_stroke.png')",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ["light"],
	},
};
