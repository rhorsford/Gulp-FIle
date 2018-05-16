'use strict';

var gulp = require('gulp');
var config = require('./config.json');
//zip process
var zip = require('gulp-zip');

gulp.task('zip', function () {
    return gulp.src(config.zipPath.included)
        .pipe(zip(config.zipPath.name))
        .pipe(gulp.dest('./'));
});
