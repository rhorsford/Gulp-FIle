
'use strict';
// Gulp
var gulp = require('gulp');
var config = require('./config.json');
//Gulp Sequence (ordering tasks sequentially)
var gulpSequence = require('gulp-sequence');

//Version select
var readlineSync = require('readline-sync');
var versionTypes = ['Major', 'Minor', 'Patch'];
var index = readlineSync.keyInSelect(versionTypes, 'What type of Versioning?');


gulp.task('default', function () {

    // watch me getting Sassy
    gulp.watch(config.stylingPath.watch , function (event) {
        gulp.run('sass');
    });
    // make my JavaScript ugly
    gulp.watch(config.jsPath.src, function (event) {
        gulp.run('uglify');
    });
    // images
    gulp.watch(config.imagePath.watch, function (event) {
        gulp.run('imagemin');
    });
});

// gulp version

gulp.task('version', function (cb) {

    if (versionTypes[index] == 'Major') {
        gulpSequence(['clean-up'], ['increment-Major'], ['sass', 'uglify', 'imagemin'], cb);

        setTimeout(function () {
            gulp.run(['zip']);
        }, 10000)
    }

    else if (versionTypes[index] == 'Minor') {
        gulpSequence(['clean-up'], ['increment-Minor'], ['sass', 'uglify', 'imagemin'], cb);

        setTimeout(function () {
            gulp.run(['zip']);
        }, 10000)
    }

    else if (versionTypes[index] == 'Patch') {
        gulpSequence(['clean-up'], ['increment-Patch'], ['sass', 'uglify', 'imagemin'], cb);

        setTimeout(function () {
            gulp.run(['zip']);
        }, 10000)
    }

    else if (versionTypes[index] == null) {
        console.log('Ok, not building.');
        process.exit(1);
    }

    return index;

});