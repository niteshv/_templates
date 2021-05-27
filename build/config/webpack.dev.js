const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	// Set the mode to development or production
	mode: 'development',

	// Control how source maps are generated
	devtool: 'inline-source-map',

	// Spin up a server for quick development
	devServer: {
		historyApiFallback: true,
		contentBase: paths.build,
		open: false,
		hot: true,
		port: 8080,
		proxy: [
			{
				context: "/",
				target: "https://localhost:51047/",
			}
		]
	},

	plugins: [
		// Only update what has changed on hot reload
		new webpack.HotModuleReplacementPlugin(),
	],
})
