// =============================================================================
// gulpfile.babel.js
// =============================================================================

'use strict';

// TODO figure out css.map not working

// Dependencies
import gulp 			from 'gulp';

import autoprefixer 	from 'gulp-autoprefixer';
import babel			from 'gulp-babel';
import sync 			from 'browser-sync';
import changed 			from 'gulp-changed';
import concat 		    from 'gulp-concat';
import include 			from 'gulp-file-include';
import sass 			from 'gulp-sass';
import sourcemaps 		from 'gulp-sourcemaps';

import del 				from 'del';
import imagemin 		from 'gulp-imagemin';
import nano 			from 'gulp-cssnano';
import rename 			from 'gulp-rename';
import sequence			from 'run-sequence';
import uglify			from 'gulp-uglify';
import uncss 			from 'gulp-uncss';

// File structure
const inputHTML     	= './app/**/*.html';
const inputPartials 	= './app/**/*.tpl';
const inputSass     	= './app/**/*.scss';
const inputJS       	= './app/**/*.js';
const inputFonts		= './app/fonts/**/*';
const inputImages 		= './app/images/**/*.+(png|jpg|gif|svg)';

const output        	= './dist';
const outputPHP			= './dist/**/*.php';
const outputJS 			= './dist/js';

// Options
const sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

// =============================================================================
// Main tasks
// =============================================================================

// Development task
gulp.task('default', ['watch']);

// Production task
gulp.task('prod', ['build']);

// =============================================================================
// Development Tasks
// =============================================================================

// Fire up a server task
gulp.task('sync', () => {
	sync.init({
		server: {
		  baseDir: 'dist'
		}
	});
});

// Build html files from partials
gulp.task('html', () => {
	return gulp
		.src(inputHTML)
		// .pipe(changed(output)) // Turned off for now, doesn't work well with .tpl files
		.pipe(include({
			basepath: '@root'
		}))
		.pipe(gulp.dest(output))
		.pipe(sync.reload({
			stream: true
		}));
});

// Compile sass files with autoprefixer
gulp.task('sass', () => {
	return gulp
		.src(inputSass)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(output))
		.pipe(sync.reload({
			stream: true
		}));
});

// Compile js files
gulp.task('jss', () => {
	return gulp
		.src(inputJS)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(outputJS))
		.pipe(sync.reload({
			stream: true
		}));
});

// Watch for changes
gulp.task('watch', ['sync', 'html', 'sass', 'jss'], () => {
	gulp.watch(inputHTML, ['html']);
	gulp.watch(inputPartials, ['html']);
	gulp.watch(inputSass, ['sass']);
	gulp.watch(inputJS, ['jss']); 
});

// =============================================================================
// Production tasks
// =============================================================================

// Delete the dist folder
gulp.task('del', () => {
	return del
		.sync(output);
});

// Build php files from partials
gulp.task('php', () => {
	return gulp
		.src(inputHTML)
		.pipe(include({
			basepath: '@root'
		}))
		.pipe(rename( (path) => {
			path.extname = '.php'
		}))
		.pipe(gulp.dest(output));
});

// Compile minified css
gulp.task('css', () => {
    return gulp
    	.src(inputSass)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(uncss({
        	html: [outputPHP]
        }))
        .pipe(nano())
        .pipe(gulp.dest(output));
});

// Compile minified js
gulp.task('js', () => {
	return gulp
		.src(inputJS)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(outputJS))
});

// Copy fonts
gulp.task('fonts', () => {
	return gulp
		.src(inputFonts)
		.pipe(gulp.dest(output));
});

// Optimise images
gulp.task('images', () => {
	return gulp
		.src(inputImages)
		.pipe(imagemin())
		.pipe(gulp.dest(output))
});

// Build the distribution files
gulp.task('build', (callback) => {
	sequence('del', 'php',
		['css', 'fonts', 'js', 'images'],
	callback
	)
});


