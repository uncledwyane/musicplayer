/**
 * @type {import ('webpack').Configuration}
 */

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isDev = process.env.Node_ENV === 'development'
const proxy = require('./src/api/proxy.js')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}


module.exports = {
    devtool: process.env.Node_ENV === 'production' ? 'none' : 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        port: 8000,
        compress: true,
        open: true,
        proxy: {
            'http://localhost:8000': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          'components': resolve('src/components'),
          'assets': resolve('assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'] // or loader: 'css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s(c|a)ss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: 'url-loader?esModule=false'
            },
            {
                test: /\.(mp3)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.(mp4)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'home',
            template: './src/index.html',
            minify: true,
            chunks: ['main']
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}