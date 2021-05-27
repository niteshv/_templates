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

	// Assets (src + dist)
	assets: path.resolve(__dirname, '../dist/assets'),
	
	images: {
		src: path.resolve(__dirname, '../src/img'),
		dist: path.resolve(__dirname, '../dist/assets/img'),
	},

	downloads: {
		src: path.resolve(__dirname, '../src/downloads'),
		dist: path.resolve(__dirname, '../dist/assets/downloads'),
	},

	fonts: {
		src: path.resolve(__dirname, '../src/fonts'),
		dist: path.resolve(__dirname, '../dist/assets/fonts'),
	},


	// Pages
	pages: path.resolve(__dirname, '../src/pages'),

}
