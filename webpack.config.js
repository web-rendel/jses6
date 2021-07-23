const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'), // рабочая папка где лежат все исходники 
    mode: 'development',
    entry: './app.js', // точка входа
    output: {
        filename: 'bundle.[chunkhash].js', // сборка js
        path: path.resolve(__dirname, 'public') // куда складывать
    },
    resolve: {
        extensions: ['.js', '.png', '.json'],
        alias: {
            
        }
    },
    devServer: {
        port: 8080,
    },
    plugins: [
        new CleanWebpackPlugin(), // очищает файлы с хешом
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif)$/i,
                use: ["file-loader"],
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/i,
                use: ["file-loader"],
            },
            {
              test: /\.xml$/i,
              use: ['xml-loader']
            }
            ,
            {
              test: /\.csv$/i,
              use: ['csv-loader']
            }
        ],
    },
}