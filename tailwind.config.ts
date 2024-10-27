/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugin: {
		textOpacity: true,
	},
	// NOTE: Update this to include the paths to all of your component files.
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {},
	},

	plugins: [],
}
