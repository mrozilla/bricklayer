# bricks

Simple gulp-based static site build tool. Compiles modular HTML, Sass, and JS.

## Usage 

To use bricks, create a folder for you project, clone the repo, and run
```
npm install
```

## Development

For development purposes bricks comes with a set of gulp tasks to speed up your building process. The HTML files are build from the partials. The Sass base gets compiled into ```main.css``` The JS files get compiled into ```main.js``` and minified using UglifyJS. A browser-sync server is fired up. Any change to the ```app``` files triggers a browser-sync update.

To start the development server, simply run
```
gulp
```
### Partials

The partials are included in the final file using the ```@@include``` syntax:
```
@@include('app/partials/nav.tpl')
```
You can pass props to the partial file:
```
@@include('app/partials/head.tpl', {
    "title": "Home page",
    "description": "I am a main page"
})
```
The partials files are ending in ```.tpl``` and are sourced @root by default. Create as many as you want, modular is the new black.

The file structure is as following:
```
.
│   gulpfile.babel.js
│
├───app
│   ├───images
│   ├───js
│   ├───partials
│   │   head.tpl
│   │   nav.tpl
│   │   scripts.tpl
│   │   ...
│   ├───stylesheets
│   │   ├───partials
│   │   main.scss
│   ├───...
│   index.html
│   
└───dist
    ├───images
    ├───js
    ├───partials
    ├───stylesheets
    ├───...
    index.php

```

> Update the globs in the ```gulpfile.babel.js``` if you make any changes in the file structure

```
// File structure
const inputHTML         = './app/**/*.html';
const inputPartials     = './app/**/*.tpl';
const inputSass         = './app/**/*.scss';
const inputJS           = './app/**/*.js';
const inputFonts        = './app/fonts/**/*';
const inputImages       = './app/images/**/*.+(png|jpg|gif|svg)';

const output            = './dist';
const outputPHP         = './dist/**/*.php';
const outputJS          = './dist/js';
```

## Production

For production purposes bricks comes with a set of gulp tasks to prepare the files to be deployed. The HTML files are build from the partials and renamed to ```.php```. The ```dist``` folder gets wiped to avoid any artifacts. The Sass base gets compiled into ```main.css``` which gets reduced and minified using unCSS and CSSnano. The JS files get compiled into ```main.js``` and minified using UglifyJS. The images are optimised using gulp-imagemin. The fonts are moved to the ```dist``` folder.

To create the production files, run
```
gulp prod
```