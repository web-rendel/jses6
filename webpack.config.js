const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/app.js', // точка входа
    output: {
        filename: 'bundle.[chunkhash].js', // сборка js
        path: path.resolve(__dirname, 'public') // куда складывать
    },
    devServer: {
        port: 8080,
    },
    plugins: [
        new CleanWebpackPlugin(), // очищает файлы с хешом
        new HtmlWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
}