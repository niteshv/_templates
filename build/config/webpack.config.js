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
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
    return templateFiles.map(item => {
        // Split names and extension
        const parts = item.split('.')
        const name = parts[0]
        const extension = parts[1]
        // Create new HtmlWebPackPlugin with options
        return new HtmlWebPackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.pug`)
        })
    })
}
const htmlPlugins = generateHtmlPlugins(setup.pages.pagesSrc);

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
                    from: path.resolve(__dirname, setup.paths.imagesSrc ),
                    to: path.resolve(__dirname, setup.paths.imagesDist )
                },
                {
                    from: path.resolve(__dirname, setup.paths.rootFilesSrc ),
                    to: path.resolve(__dirname, setup.paths.rootFilesDist )
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
