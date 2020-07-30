const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  // 2.Create output for compiled TS file - end point
  output: {
    // publicPath: "public", // this is for webpack-dev-server to know where to put output(we should not use this if we're using HtmlWebpackPlugin plugin)
    path: path.resolve(__dirname, "public"), //from current dir to public folder
    filename: "[name].main.js", //and then main.js
  },
  // 5.
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
});
