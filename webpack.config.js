const path = require("path");

module.exports = {
  // 1.Create entry point
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        // 3. Create test - when we are compiling './src/index.ts' if ending file .ts exists
        test: /\.ts$/,
        // 4. if the rule above passes out test - meaning ending file .ts exists, then compile .ts file into .js file(which is next rule)
        use: "ts-loader",
        // 5. Lets now restrict where to look for .ts files with 'include' to only 'src' path, else by default it will compile all .ts file from current directory
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  // 6.
  resolve: {
    extensions: [".ts", ".js"],
  },
  // 2.Create output - end point
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "public",
  },
};
