'use strict';
// Gulp
var gulp = require('gulp');
var config = require('./config.json');

//zip process
var rimraf = require('rimraf');


// Clean up
gulp.task('clean-up', function () {
    //removes directory on build

    rimraf(config.cleanupPath.dest , function () {
        console.log('done');
    });
});


