const path = require('path')

module.exports = {
	// Source files
	src: path.resolve(__dirname, '../src'),

	// Config files
	config: path.resolve(__dirname, '../config'),

	// Production build files
	build: path.resolve(__dirname, '../dist'),

	// SASS Variables import
	cssVariables: '@import "../src/components/variables";',

	// Static files that get copied to build folder
	public: path.resolve(__dirname, '../src/rootfiles'),

	// Images Src
	imagesSrc: path.resolve(__dirname, '../src/img'),

	// Images Dist
	imagesDist: path.resolve(__dirname, '../dist/assets/img'),

	// Fonts Src
	fontsSrc: path.resolve(__dirname, '../src/fonts'),

	// Fonts Dist
	fontsDist: path.resolve(__dirname, '../dist/assets/fonts'),

	// Pages
	pages: path.resolve(__dirname, '../src/pages'),

}
