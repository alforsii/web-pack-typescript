const path = require("path");

module.exports = {
  // 1.Create entry point
  entry: {
    main: "./src/index.ts",
    /* you can add here more bundle JS files for separate bundle*/
    /* ... */
  },
  // 3. Rules for allowed importing files
  resolve: {
    extensions: [".ts", ".js", ".css", ".scss"],
  },
  // 4. Set rules for npm package loaders to compile files accordingly
  module: {
    rules: [
      {
        /**ts-loader */
        // 1. Create test - when we are compiling './src/index.ts' if ending file .ts exists
        test: /\.ts$/,
        // 2. if the rule above passes our test - meaning ending file .ts exists, then compile .ts file into .js file(which is next rule)
        use: "ts-loader",
        // 3. Lets now restrict where to look for .ts files with 'include' to only 'src' path, else by default it will compile all .ts file from current directory
        include: [path.resolve(__dirname, "src")],
      },
      {
        /**html-loader */
        test: /\.html/,
        use: ["html-loader"],
      },
      {
        /**file-loader */
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
          },
        },
      },
    ],
  },
};
