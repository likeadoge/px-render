const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (
  entry,
  tsloader,
  tsconfig
) => ({
  entry,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'output.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    // plugins: [new TsconfigPathsPlugin({ configFile:tsconfig })]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: tsloader }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  }
})