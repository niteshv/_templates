const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'assets/bundle.js',
            publicPath: '/dist/'
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
                                config: { path: 'postcss.config.js' },
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
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
                    loader: 'pug-loader' 
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
            new StyleLintPlugin(),
            // Copy files for site root and images \/
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/assets/img')
                },
                {
                    from: path.resolve(__dirname, 'src/rootfiles'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]),
            // Compress images
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
            // HTML Template file \/
            new HtmlWebPackPlugin({
                hash: false,
                templateParameters: true,
                template: path.resolve(__dirname, 'src/index.pug'),
                filename: path.resolve(__dirname, 'dist/index.html')
            }),
            // Progressive Web App creation of assets and manifest \/
            new WebpackPwaManifest({
                name: 'My Progressive Web App',
                short_name: 'MyPWA',
                description: 'My awesome Progressive Web App!',
                background_color: '#ffffff',
                theme_color: '#3367D6',
                crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                includeDirectory: false,
                fingerprints: false,
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve('src/img/icons/site-icon.png'),
                        sizes: [192, 512]
                    }
                ]
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            watchContentBase: true
        }
    };
};
