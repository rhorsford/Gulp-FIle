// Gulp
var gulp = require('gulp');
var config = require('./config.json');

// JavaScript
var uglify = require('gulp-uglify');

gulp.task('uglify', function () {
    gulp.src(config.jsPath.src)
        .pipe(uglify({}))
        .pipe(gulp.dest(config.jsPath.dest));
});