const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  // 2.Create output for compiled TS file - end point
  output: {
    // publicPath: "public", // this is for webpack-dev-server to know where to put output(we should not use this if we're using HtmlWebpackPlugin plugin)
    path: path.resolve(__dirname, "public"), //from current dir to public folder
    filename: "[name].[contentHash].js", //and then main.js
  },
  // 5.
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].contentHash.css" }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
  ],
  module: {
    rules: [
      // 4. css rule
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
});
