const path = require('path');
const webDir = 'web/';
const srcdir = 'web/src/';
const cssSrcDir = 'web/src/css/';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': [
      path.resolve(srcdir, 'app.js'),
      path.resolve(srcdir, 'App.scss')
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(webDir, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {

            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: 'web/src/icons', to: `icons` },
        { from: 'web/src/images', to: `images` },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      $j: 'jquery'
    })
  ],
}