const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'dist/assets/'),
            filename: 'bundle.js',
            publicPath: '/assets/'
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
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            interpolate: true
                        }
                    }
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new StyleLintPlugin(),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, 'dist/assets/img')
            }]),
            new ImageminPlugin({
                //disable: process.env.NODE_ENV !== 'production', // Disable during development
                pngquant: {
                    quality: '95-100'
                }
            }),
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: path.resolve(__dirname, 'dist/index.html')
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            watchContentBase: true
        }
    };
};
