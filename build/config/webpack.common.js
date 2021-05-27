const path = require('path')
const paths = require('./paths')
const fs = require('fs');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintBarePlugin = require('stylelint-bare-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Generate html pages
const htmlPlugins = generateHtmlPlugins(paths.pages);

module.exports = {
	// Where webpack looks to start building the bundle
	entry: {
		critical: paths.src + '/critical.js',
		other: paths.src + '/other.js'
	},
	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: 'assets/js/[name].js',
		publicPath: '/',
	},

	// Show minimal stats
	stats: 'minimal',

	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),
		// Stylelint
		new StylelintBarePlugin({
			configFile: paths.config + '/stylelint.config.js'
		}),
		// Copies files from target to destination folder
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.public,
					to: paths.build
				},
				{
					from: paths.images.src,
					to: paths.images.dist
				},
				// {
				//   from: paths.fontsSrc,
				//   to: paths.fontsDist
				// },
			],
		}),
	]
		// Generate html pages
		.concat(htmlPlugins),

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},

			// Styles: Inject CSS into the head with source maps
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true, importLoaders: 1 }
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								config: paths.config + '/postcss.config.js',
							},
						}
					},
					{
						loader: 'sass-loader', options: {
							sourceMap: true, additionalData: paths.cssVariables, sassOptions: {
								includePaths: [
									paths.src
								]
							}
						}
					},
				],
			},

			// Images
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				exclude: [
					paths.fonts.src
				],
			},

			// Fonts and SVGs: Inline files
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				include: [
					paths.fonts.src
				],
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]'
				},
			},

			// SVGs: Inline files
			{
				test: /\.svg$/,
				exclude: [
					paths.fonts.src
				],
				type: 'asset/inline'
			},

			// Compile pug files
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true,
					self: true,
				}
			},
		],
	},
}


// Generate html pages
// Loop through pages folder and build pug templates to html pages
function generateHtmlPlugins(templateDir) {
	// Read files in template directory
	const templateFiles = walkDir(templateDir);
	return templateFiles.map(item => {
		// Split names
		const parts = item.split('.')
		const name = parts[0]

		// Create new HtmlWebPackPlugin with options
		return new HtmlWebPackPlugin({
			template: path.resolve(__dirname, `${templateDir}/${name}.pug`),
			filename: `${name}.html`,
			DATA: require(`../src/content/content.json`)
		})
	})
}

// Function to walk through files and directories at a given path
function walkDir(rootDir) {
	const paths = [];
	// A recursive function
	// - If a path is a file it will add to an array to be returned
	// - If a path is a directory it will call itself on the directory
	function walk(directory, parent) {
		const dirPath = path.resolve(__dirname, directory);
		const templateFiles = fs.readdirSync(dirPath);
		// Check each path found, add files to array and call self on directories found
		templateFiles.forEach(file => {
			const filepath = path.resolve(__dirname, directory, file);
			const isDirectory = fs.lstatSync(filepath).isDirectory();
			if (isDirectory) {
				// File is a directory
				const subDirectory = path.join(directory, file);
				if (parent) {
					// Join parent/file before passing so we have correct path
					const parentPath = path.join(parent, file);
					walk(subDirectory, parentPath);
				} else {
					walk(subDirectory, file);
				}
			} else {
				if (parent) {
					// Parent exists, join it with file to create the path
					const fileWithParent = path.join(parent, file);
					paths.push(fileWithParent);
				} else {
					paths.push(file);
				}
			}
		});
	}
	// Start our function, it will call itself until there no paths left
	walk(rootDir);
	return paths;
}