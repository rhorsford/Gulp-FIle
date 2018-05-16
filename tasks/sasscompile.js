/*
  gulpfile1.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in `/gulp`. Any files in that directory
  get automatically required below.
  To add a new task, simply add a new task file that directory.
  `/gulp/tasks.js` specifies the default set of
  tasks to run when you run `gulp`.
*/

'use strict';
// Gulp
var gulp = require('gulp');
var config = require('./config.json');
// Sass/CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');


// compile all your Sass
gulp.task('sass', function () {
    gulp.src(config.stylingPath.src)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
        ))
        .pipe(gulp.dest(config.stylingPath.dest))
        .pipe(minifycss({}
        ))
        .pipe(gulp.dest(config.stylingPath.dest));

});

