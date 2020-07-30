const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // mode: "development",
  // devtool: "eval-source-map",
  // 1.Create entry point
  entry: {
    main: "./src/index.ts",
    // you can add here more bundle JS files
  },
  // 2.Create output for compiled TS file - end point
  // output: {
  //   // publicPath: "public", // this is for webpack-dev-server to know where to put output(we should not use this if we're using HtmlWebpackPlugin plugin)
  //   path: path.resolve(__dirname, "public"), //from current dir to public folder
  //   filename: "main.[contentHash].js", //and then main.js
  // },
  // 3.
  resolve: {
    extensions: [".ts", ".js", ".css", ".scss"],
  },
  // 4.
  module: {
    rules: [
      {
        // 1. Create test - when we are compiling './src/index.ts' if ending file .ts exists
        test: /\.ts$/,
        // 2. if the rule above passes our test - meaning ending file .ts exists, then compile .ts file into .js file(which is next rule)
        use: "ts-loader",
        // 3. Lets now restrict where to look for .ts files with 'include' to only 'src' path, else by default it will compile all .ts file from current directory
        include: [path.resolve(__dirname, "src")],
      },
      // // 4. css rule
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      //   include: [path.resolve(__dirname, "src")],
      // },
      // // 5. scss rule
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      //   include: [path.resolve(__dirname, "src")],
      // },
      // 6. html
      {
        test: /\.html/,
        use: ["html-loader"],
      },
      // 7.read files
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
  // // 5.
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, "src/index.html"),
  //   }),
  //   new CleanWebpackPlugin(),
  // ],
};
