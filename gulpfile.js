var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var vueify = require('gulp-vueify');

// Lets bring es6 to es5 with this.
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up 
// into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify 
// handle es6 including imports.
gulp.task('es6', function() {
	browserify({ debug: true })
		.transform(babelify)
		.require("./app/main.js", { entry: true })
		.bundle()
		.on('error',gutil.log)
		.pipe(source('bundle.js'))
    	.pipe(gulp.dest('./'));
});

gulp.task('vueify', function () {
  return gulp.src('components/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch',function() {
	gulp.watch(['./app/**/*.js', './app/**/*.vue'],['es6','vueify'])
});
 
gulp.task('default', ['es6','watch','vueify']);
