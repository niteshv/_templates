const paths = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
		path: paths.build,
		filename: 'assets/js/[name].js',
		publicPath: '/',
	},
	plugins: [
		// Extracts CSS into separate files
		// Note: style-loader is for development, MiniCssExtractPlugin is for production
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
			chunkFilename: '[id].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
							postcssOptions: {
								config: paths.config + '/postcss.config.js',
							},
						}
					},
					{
						loader: 'sass-loader', options: {
							sourceMap: false, additionalData: paths.cssVariables, sassOptions: {
								includePaths: [
									paths.src
								]
							}
						}
					},
				],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), "..."],
		// Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
		// instead of having their own. This also helps with long-term caching, since the chunks will only
		// change when actual code changes, not the webpack runtime.
		runtimeChunk: {
			name: 'runtime',
		},
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
})
