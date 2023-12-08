const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const commonConfig = {
    mode: 'production',
    // 👇 Don't forget to add the new entry point to the array of "splitChunks" chunks
    entry: {
        popup: path.resolve('src/popup/index.jsx'),
        options: path.resolve('src/options/index.jsx'),
        background: path.resolve('src/background/index.js'),
        content_scripts: path.resolve('src/content-scripts/index.jsx'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [tailwindcss, autoprefixer]
                            }
                        }
                    }
                ]
            },
            {
                type: 'assets',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/assets'),
                    to: path.resolve('dist/assets')
                },
                {
                    from: path.resolve('src/manifest.json'),
                    to: path.resolve('dist')
                }
            ]
        }),
        ...getHtmlPlugins(['popup', 'options'])
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return !['content_scripts', 'background', 'options'].includes(chunk.name)
            }
        }
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devtool: false,
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist')
    },
}


function getHtmlPlugins(chunks) {
    return chunks.map(
        chunk =>
            new HtmlPlugin({
                title: 'Nearby Goodreaders',
                filename: `${chunk}.html`,
                chunks: [chunk]
            })
    )
}

module.exports = commonConfig;