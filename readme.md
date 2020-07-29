# Steps

### 1. Install packages to begin with project

```
sudo nmp i -g typescript
```

- creates global typescript package

```
tsc --init
```

- creates tsconfig.json file.

```
npm init or npm init -y
```

- creates package.json file.

```
npm i webpack webpack-cli ts-loader -D
```

- install webpack devDependencies to compile and bundle all our code together into one file.
- install webpack-cli to interact with webpack via command line.
- install ts-loader to help webpack to compile TypeScript into JavaScript(without it webpack doesn't know how to compile TS to JS).

```
npm i typescript -D
```

- install local typescript in order typescript to work properly with webpack.

### 2. Create:

- `public` and `src` folder in main root folder along with other files.
- `index.html` in the public folder
- `index.ts` in src folder
- `webpack.config.js` in the root

### 3. Create webpack config:

```
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
  // 2.Create output - end point
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
};
```

#### 4. Add "webpack" script tag in our package.json file like so:

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

#### 5. Now we can test:

- add `console.log("Hello Wold! This is a test from index.ts file using webpack.");` to index.ts in src folder.
- run on command line:

```
npm run build
```

Our first webpack bundle is done. Good job 👏! Now we should be able to see in `"./public"` bundled `main.js`.

#### 6. Install live server for development, so we don't have to rerun the server manually.

```
npm i webpack-dev-server -D
```

- and create script tag for that in package.json

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server",
    "build": "webpack"
  },
```

- add something to index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web pack</title>
  </head>
  <body>
    <h2>Hello webpack beginners!</h2>

    <!-- our script for now -->
    <script src="./main.js"></script>
  </body>
</html>
```

- run:

```
npm run dev
```

Now if we go to browser `http://localhost:8080/public/`, we should see text:

## Hello webpack beginners!

If we inspect our browser console we have our `console.log`: Hello Wold! This is a test from index.ts file using webpack.

#### 7. So far everything looks like working file, but if we make any changes in the index.ts our terminal shows that webpack is compiling but we don't see them in the browser, and it's not rebuilding our code into `main.js` anymore. It's because webpack-dev-server re-compiles TS file and stores resulting JS in memory, and does not put it in actual file. So, for that we need to modify our `webpack.config.js` file and tell webpack-rev-server where to put complied TS result :

- add `publicPath: "public",` in output object in webpack.config.js