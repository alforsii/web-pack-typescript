const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  // 2.Create output for compiled TS file - for dev mode
  output: {
    path: path.resolve(__dirname, "public"), //from current dir to public folder
    filename: "[name].bundle.js", //and then main.bundle.js - [name] comes from entry point(from webpack.common.js entry:{ name...})
  },
  // 5.
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        // 4. css rule
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: [path.resolve(__dirname, "src")],
      },
      {
        // 5. scss rule
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
});
