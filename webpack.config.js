const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

// код для Hot Module Reloading (HMR)
const prodMode = process.env.NODE_ENV === "production";
const devMode = !prodMode;

console.log(devMode);
const plugins = [
    new MiniCssExtractPlugin({
      filename: prodMode ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: prodMode ? "[id].css" : "[id].[contenthash].css",
    }),
  ];
  if (prodMode) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
// END код для Hot Module Reloading (HMR)


const optimization = () => {
    const config = {
      splitChunks: {
        chunks: 'all'
      }
    }
  
    if (prodMode) {
      config.minimizer = [
        new OptimizeCssAssetWebpackPlugin(),
        new TerserWebpackPlugin()
      ]
    }
  
    return config
  }


module.exports = {
    context: path.resolve(__dirname, 'src'), // рабочая папка где лежат все исходники 
    mode: 'development',
    entry: './app.js', // точка входа
    output: {
        filename: prodMode ? "[name].js" : "[name].[contenthash].js", // сборка js
        path: path.resolve(__dirname, 'public') // куда складывать
    },
    resolve: {
        extensions: ['.js', '.png', '.json'],
        alias: {
            '@models' : path.resolve(__dirname, 'src/models'),
            '@styles' : path.resolve(__dirname, 'src/styles'),
            '@' : path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 8080,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: prodMode  // если сборка на прод минифицируем
            }
        }),
        new CleanWebpackPlugin(), // очищает файлы с хешом

        new copyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'), 
                    to: path.resolve(__dirname, 'public')
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: prodMode ? "[name].css" : "[name].[contenthash].css",
            chunkFilename: prodMode ? "[id].css" : "[id].[contenthash].css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {},
                    },
                    "css-loader",
                  ],
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