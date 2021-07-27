const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const prodMode = process.env.NODE_ENV === "production";
const devMode = !prodMode;
console.log('PROD: ', prodMode);

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

const filename = ext => devMode ? `[name].${ext}` : `[name].[fullhash].${ext}`;


// код для Hot Module Reloading (HMR)
const plugins = [
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ];
  if (prodMode) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
// END код для Hot Module Reloading (HMR)


module.exports = {
    context: path.resolve(__dirname, 'src'), // рабочая папка где лежат все исходники 
    mode: 'development',
    entry: ['@babel/polyfill', './app.js'], // точка входа
    output: {
      filename: filename('js'), // сборка js
      path: path.resolve(__dirname, 'public') // куда складывать
    },
    resolve: {
      extensions: ['.js', '.png', '.json'],
      alias: {
        '@models' : path.resolve(__dirname, 'src/models'),
        '@styles' : path.resolve(__dirname, 'src/styles'),
        '@' : path.resolve(__dirname, 'src')
      },
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
        filename: filename('css'),
      }),
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
            test: /\.s[ac]ss$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {},
              },
              "css-loader",
              "sass-loader"
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
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread']
              }
            }
          }
      ],
    },
}