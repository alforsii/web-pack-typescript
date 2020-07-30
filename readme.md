# Steps

## 1) Create basic webpack template to start

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

## 2) So far everything is working fine. Lets start a little project to see what else we need to add to our webpack.config.js

#### 1. Add following form to our main index.html file in public folder :

```
 <h2>Sign up</h2>
    <form>
      <label for="name">Your name</label>
      <input type="text" id="name" required />
      <label for="email">Your email</label>
      <input type="email" id="email" required />
      <label for="age">Your age</label>
      <input type="number" id="age" required />
      <button>submit</button>
    </form>
```

#### 2. Create:

- `form.ts` in src and copy paste following code into it:

```
export const formData = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll("input");
  let values: { [prop: string]: string } = {};

  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
};

// in JS code above looks something like this...

// export const formData = (form) => {
//   const inputs = form.querySelectorAll("input");
//   let values = {};

//   inputs.forEach((input) => {
//     values[input.id] = input.value;
//   });
//   return values;
// };
```

- Now lets import form from form.js:

```
import { formData } from "./form";

const form = document.querySelector("form")!; // ! - means that this form definitely return a value which is not null, else TS gives use error

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = formData(form);
  console.log("data", data);
});
```

Looks like everything ok, but no...Our app crashed :( :

`ERROR in ./src/index.ts Module not found: Error: Can't resolve './form' in '/Users/ashrafzhonkurbonaliev/Documents/my-github/web-pack-typescript/src' @ ./src/index.ts 1:0-34 5:17-25`

Why ?
Well, if we read the error code it says `Can't resolve './form'...`, which means that our webpack doesn't know how to resolve the file that we're trying to import. Again to fix this we need to add to webpack.config.js file property :

- ```
  resolve: {
        extensions: [".ts", ".js"],
      },
  ```
  Now if we restart the server since we update config file it should resolve the issue we had!

#### 3. Enable sourceMap for dev`s for debugging

- enable `"sourceMap": true /* Generates corresponding '.map' file. */,` in tsconfig.json
- add `devtool:"eval-source-map"` or `devtool:"source-map"` to webpack.config.js (recommended "eval-source-map" since it's quicker for development)

#### 4. Add development mode in to webpack.config.js:

`mode: "development",`

#### 5. Add css,style,sass loaders and html-webpack-plugin to compile our style and html files dynamically to public folder

```
npm i style-loader css-loader html-webpack-plugin -D
```

- First `sass-loader` compiles styles into css
- Secondly `css-loader` Translates CSS into CommonJS
- Thirdly `style-loader` Creates `style` nodes from JS strings (injects compiled css files(into JS) into DOM.)

#### 6. Add html-loader and file-loader in order to be able to select images from src folder

```
npm i html-loader file-loader -D
```

- As you can tell now `html-loader` compiles images from /src file into public folder.

#### 7. Add clean-webpack-plugin

```
npm i clean-webpack-plugin
```

Which cleans up our unused `main.[contentHash].js` files. Since we're using `HtmlWebpackPlugin` and contentHash to get dynamic JS files into our compiled html file with uniq contentHash number.

#### 8. Separate webpack.config into dev and prod configs

```
- npm i webpack-merge
```

- Create webpack.dev and webpack.prod and separate configs for different environment.

#### 9. Install mini-css-extract-plugin to separate style between dev and production

```
npm i -D mini-css-extract-plugin
```

- This plugin help us to inject styles into DOM before it gets loaded. It comes with it's own loader

- We use this for production
