# bricklayer

Simple gulp-based static site builder. Compiles modular HTML, Sass, and JS.

## Installation 

To use bricklayer, create a folder for your project
```
mkdir <your project name>
```
Clone the repo
```
git clone https://github.com/mrozilla/bricklayer
```

Make sure you've got [node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) installed and install dependencies
```
npm i
```
After installing bricklayer, update your ```package.json``` file with your credentials.

## Development

For development purposes bricklayer comes with a set of gulp tasks to speed up your building process. 
- The HTML files are built from the partials using [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) and minified using [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin). 
- The Sass base gets compiled into ```main.css``` using [gulp-sass](https://github.com/dlmanning/gulp-sass) and [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) while the sourcemaps are created by [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps). 
- The JS files get compiled into ```main.js``` using [gulp-babel](https://github.com/babel/gulp-babel) and [gulp-concat](https://github.com/contra/gulp-concat). 
- A [browser-sync](https://github.com/Browsersync/browser-sync) server is fired up. 
- Any change to the ```app``` files triggers a browser refresh.

To start the development server, run
```
gulp
```
### Partials

The partials files are ending in ```.tpl``` and are sourced ```@root``` by default. Create as many as you want, modular is the new black. The partials are included in the final file using the ```@@include``` syntax:
```
@@include('app/partials/nav.tpl')
```
You can pass props to the partial call provided they are included in the ```.tpl``` file:
```
@@include('app/partials/head.tpl', {
    "title": "Home page",
    "description": "I am a main page"
})
```
You can read about more advanced stuff to do here in the [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) repo.
### File structure
The default file structure is as following:
```
.
│   gulpfile.babel.js
│   ...
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
    ├───stylesheets
    ├───...
    index.php

```

> Update the globs in the ```gulpfile.babel.js``` if you make any changes to the file structure

```
// Input files
const input				= './app/'
const inputHTML     	= './app/**/*.html';
const inputPartials 	= './app/**/*.tpl';
const inputSass     	= './app/**/*.scss';
const inputJS       	= './app/**/*.js';
const inputFonts		= './app/fonts/**/*';
const inputImages 		= './app/images/**/*.+(png|jpg|gif|svg)';

// Output files
const output        	= './dist/';
const outputHTML		= './dist/**/*.html';
const outputJS			= './dist/**/*.js';
```

## Production

For production purposes bricklayer comes with a set of gulp tasks to prepare the files to be deployed.
- The ```dist``` folder gets wiped to avoid any artifacts. 
- The HTML files are built from the partials using [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include), minified using [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin), and renamed to ```.php``` using [gulp-rename](https://github.com/hparra/gulp-rename). 
- The Sass base gets compiled into ```main.css``` using [gulp-sass](https://github.com/dlmanning/gulp-sass) and [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) and minified using [gulp-uncss](https://github.com/ben-eb/gulp-uncss) and [gulp-cssnano](https://github.com/ben-eb/gulp-cssnano).
- The JS files get compiled into ```main.js``` using [gulp-babel](https://github.com/babel/gulp-babel), [gulp-concat](https://github.com/contra/gulp-concat), and minified using [gulp-uglify](https://github.com/terinjokes/gulp-uglify). 
- The images are optimised using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin). 
- The fonts are moved to the ```dist``` folder.

To create the production files, run
```
gulp prod
```
## Deployment
For deployment purposes bricklayer uses [vinyl-ftp](https://github.com/morris/vinyl-ftp) to connect to your FTP server. You probably want to deploy only after running the ```gulp prod``` command.

First update the ftp options with your host information
```
const conn = ftp.create({
	host: 'host', // Replace with your host's address
	port: 'port', // Replace with the port your host's ftp server is listening (21 is the default)
	user: user,
	password: password,
	parallel: 10,
	log: gutil.log
});
```

To deploy your build, run
```
gulp deploy USER=<your username> PWD=<your password>
```
The username and the password is taken from the terminal for a reason, don't include them in your gulp files, especially if you're uploading your project to a public repo.

## License
MIT © [mrozilla](http://mrozilla.cz)