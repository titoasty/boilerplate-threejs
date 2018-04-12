const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env = {}) => {
    return {
        entry: ['babel-polyfill', SRC_DIR + '/scss/index.scss', SRC_DIR + '/js/index.js'],
        output: {
            path: BUILD_DIR,
            filename: 'bundle.js'
        },
        mode: env.prod ? 'production' : 'development',
        performance: {
            hints: false
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['env']
                        }
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(txt|md|glsl)$/,
                    use: 'raw-loader'
                }, {
                    test: /\.eot(\?\S*)?$/,
                    loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
                },
                {
                    test: /\.woff2(\?\S*)?$/,
                    loader: 'url-loader?limit=100000&mimetype=application/font-woff2'
                },
                {
                    test: /\.woff(\?\S*)?$/,
                    loader: 'url-loader?limit=100000&mimetype=application/font-woff'
                },
                {
                    test: /\.ttf(\?\S*)?$/,
                    loader: 'url-loader?limit=100000&mimetype=application/font-ttf'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file-loader"
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url-loader?limit=10000&mimetype=image/svg+xml"
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[hash].[ext]'
                        }
                    }]
                }

            ]
        },
        devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: BUILD_DIR,
            compress: true,
            open: true
        },
        plugins: [
            new webpack.ProvidePlugin({
                'THREE': 'three'
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: path.join(SRC_DIR, 'index.html')
            })
        ]
    };
};