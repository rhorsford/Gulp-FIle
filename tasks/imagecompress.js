// Gulp
var gulp = require('gulp');
var config = require('./config.json');
// Images
var imagemin = require('gulp-imagemin');


// Images
gulp.task('imagemin', function () {
    gulp.src(config.imagePath.src)
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest(config.imagePath.dest));
});