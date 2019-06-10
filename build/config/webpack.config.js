const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Import paths and options  
const setup = require('./setup.config');

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
            filename: `${name}.html`
        })
    })
}
const htmlPlugins = generateHtmlPlugins(setup.pages.pagesSrc);

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

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: setup.paths.entry,
        output: {
            path: path.resolve(__dirname, setup.paths.dist),
            filename: setup.paths.fileName
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },

                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: { path: './config/postcss.config.js' },
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                data: setup.paths.cssVariables,
                                includePaths: [
                                    path.join(__dirname, setup.paths.src)
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|png)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 25000,
                        },
                    },
                },
                {
                    test: /\.svg$/,
                    use: "file-loader",
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    query: {
                        pretty: true
                    }
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            interpolate: true,
                            attrs: false
                        }
                    }
                }
            ]
        },
        plugins: [
            // Delete all files in dist \/
            new CleanWebpackPlugin(),
            // Css file for site \/
            new MiniCssExtractPlugin({
                filename: "assets/[name].css"
            }),
            new StyleLintPlugin({
                configFile: path.resolve(__dirname, './../config/stylelint.config.js')
            }),
            // Copy files for site root and images \/
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, setup.paths.imagesSrc),
                    to: path.resolve(__dirname, setup.paths.imagesDist)
                },
                {
                    from: path.resolve(__dirname, setup.paths.rootFilesSrc),
                    to: path.resolve(__dirname, setup.paths.rootFilesDist)
                }
            ]),
            // Compress images
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
            // Progressive Web App creation of assets and manifest \/
            new WebpackPwaManifest({
                name: setup.siteDetails.siteName,
                short_name: setup.siteDetails.siteNameShort,
                description: setup.siteDetails.siteDescription,
                background_color: setup.siteDetails.siteBackgroundColor,
                theme_color: setup.siteDetails.siteThemeColor,
                crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                includeDirectory: false,
                fingerprints: false,
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve(setup.siteDetails.siteIconSrc),
                        sizes: [192, 512]
                    }
                ]
            })
        ]
            // Generate html pages
            .concat(htmlPlugins),
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, setup.paths.dist),
            openPage: path.resolve(__dirname, setup.paths.dist),
            watchContentBase: true
        }
    };
};
