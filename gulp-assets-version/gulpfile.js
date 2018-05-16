'use strict';
// Gulp
var gulp = require('gulp');
var assetsVersionReplace = require('gulp-assets-version-replace');
var gulpCopy = require('gulp-copy');
var sourceFiles = [ 'app/*', 'app/**' ];
var destination = './dist';
var staticPath = 'app/';
var basePath = './dist/';
var globs = {
    dist: 'dist/',
    css:  basePath + 'css/',
    css_all:  basePath + 'css/*.css',
    js:  basePath + 'js/',
    js_all:  basePath + 'js/*.js',
};


gulp.task('assetsVersionReplace', function () {
    gulp.src([globs.css_all, globs.js_all]

        , {base: staticPath}
    )
        .pipe(assetsVersionReplace({
            replaceTemplateList: [
                'views/index.html'
            ]
        }))
        .pipe(gulp.dest(globs.dist));
});

gulp.task('Copy', function () {

    gulp.src(sourceFiles)
        .pipe(gulp.dest(destination));
});

gulp.task('default', function() {


    gulp.run(['Copy'], 'assetsVersionReplace');

});