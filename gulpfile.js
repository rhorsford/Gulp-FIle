/*
  gulpfile.js
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

// Sass/CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// JavaScript
var uglify = require('gulp-uglify');

// Images
var imagemin = require('gulp-imagemin');

// Stats and Things
var size = require('gulp-size');

//Yargs
var args = require('yargs').argv;

//fs variable
var fs = require('file-system');
var fse = require('fs-extra');

//Path
const path = require('path');


//zip process
var zip = require('gulp-zip');
var rimraf = require('rimraf');

//Gulp Sequence (ordering tasks sequentially)
var gulpSequence = require('gulp-sequence');

//Global variables
var readlineSync = require('readline-sync');
var versionTypes = ['Major', 'Minor', 'Patch'];
var index = readlineSync.keyInSelect(versionTypes, 'What type of Versioning?');


// compile all your Sass
gulp.task('sass', function () {
    gulp.src(['app/assets/**/*.scss', '!app/assets/**/_variables.scss'])
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
        ))
        .pipe(gulp.dest('app/public/'))
        .pipe(minifycss({}
        ))
        .pipe(gulp.dest('app/public/'));

});

gulp.task('zip', function () {
    return gulp.src(['./app/public/*', './app/public/**/**'])
        .pipe(zip('assets.zip'))
        .pipe(gulp.dest('./'));
});

// Uglify JS
gulp.task('uglify', function () {
    gulp.src(['app/assets/**/*.js', 'app/assets/**/**/*.js'])
        .pipe(uglify({}))
        .pipe(gulp.dest('app/public/'));
});

// Images

gulp.task('imagemin', function () {
    gulp.src(['app/assets/**/*.png', 'app/assets/**/**/*.png'])
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('app/public/'));
});


// Stats and Things
gulp.task('stats', function () {
    gulp.src('app/assets/**/*')
        .pipe(size())
        .pipe(gulp.dest('app/public/'));
});

gulp.task('clean-up', function () {
    //removes directory on build

    rimraf('app/public/', function () {
        console.log('done');
    });
});

// Versioning
//@todo: will break down into 1 function to run
gulp.task('increment-Major', function () {
    //docString is the file from which you will get your constant string
    var docString = fs.readFileSync('version.js', 'utf8');

    // Spliting number into a string
    var versionParts = docString.split('.');

    //...Split the version number string into elements so you can bump the one you want
    // var versionParts = oldVersionNumber.split('.');
    var vArray = {
        vMajor: versionParts[0],
        vMinor: versionParts[1],
        vPatch: versionParts[2]
    };

    var periodString = ".";

    var oldVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;


    vArray.vMajor = parseFloat(vArray.vMajor) + 1;

    var MajorVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;


    var oldnumbstr = oldVersionNumber.toString();
    var newnumbstr = MajorVersionNumber.toString();

    require('fs').writeFileSync('version.js', MajorVersionNumber);

    fs.renameSync('app/assets/' + oldnumbstr + '', 'app/assets/' + newnumbstr + ''); //version based on previous

    return gulp.src(['version.js'])
        .pipe(gulp.dest('./'));//creates version.js file in the directory
});

gulp.task('increment-Minor', function () {
    //docString is the file from which you will get your constant string
    var docString = fs.readFileSync('version.js', 'utf8');

    // Spliting number into a string
    var versionParts = docString.split('.');

    //...Split the version number string into elements so you can bump the one you want
    // var versionParts = oldVersionNumber.split('.');
    var vArray = {
        vMajor: versionParts[0],
        vMinor: versionParts[1],
        vPatch: versionParts[2]
    };

    var periodString = ".";

    var oldVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;


    vArray.vMinor = parseFloat(vArray.vMinor) + 1;

    var MinorVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;


    var oldnumbstr = oldVersionNumber.toString();
    var newnumbstrM = MinorVersionNumber.toString();

    require('fs').writeFileSync('version.js', MinorVersionNumber);

    fs.renameSync('app/assets/' + oldnumbstr + '', 'app/assets/' + newnumbstrM + ''); //version based on previous

    return gulp.src(['version.js'])
        .pipe(gulp.dest('./'));//creates version.js file in the directory
});

gulp.task('increment-Patch', function () {
    //docString is the file from which you will get your constant string
    var docString = fs.readFileSync('version.js', 'utf8');

    // Spliting number into a string
    var versionParts = docString.split('.');

    //...Split the version number string into elements so you can bump the one you want
    // var versionParts = oldVersionNumber.split('.');
    var vArray = {
        vMajor: versionParts[0],
        vMinor: versionParts[1],
        vPatch: versionParts[2]
    };

    var periodString = ".";

    var oldVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;


    vArray.vPatch = parseFloat(vArray.vPatch) + 1;

    var PatchVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;

    var oldnumbstr = oldVersionNumber.toString();
    var newnumbstr = PatchVersionNumber.toString();

    require('fs').writeFileSync('version.js', PatchVersionNumber);

    fs.renameSync('app/assets/' + oldnumbstr + '', 'app/assets/' + newnumbstr + ''); //version based on previous

    return gulp.src(['version.js'])
        .pipe(gulp.dest('./'));//creates version.js file in the directory
});

gulp.task('default', function () {

    // watch me getting Sassy
    gulp.watch(['app/assets/**/*.scss', 'app/assets/**/**/*.scss'], function (event) {
        gulp.run('sass');
    });
    // make my JavaScript ugly
    gulp.watch(['app/assets/**/*.js', 'app/assets/**/**/*.js'], function (event) {
        gulp.run('uglify');
    });
    // images
    gulp.watch("app/assets/**/*", function (event) {
        gulp.run('imagemin');
    });
});

// gulp version

gulp.task('version', function (cb) {

    if (versionTypes[index] == 'Major') {
        console.log('lol');
        gulpSequence(['clean-up'], ['increment-Major'], ['sass', 'uglify', 'imagemin'], cb);

        setTimeout(function () {
            gulp.run(['zip']);
        }, 10000)
    }

    else if (versionTypes[index] == 'Minor') {
        console.log('lol2');
        gulpSequence(['clean-up'], ['increment-Minor'], ['sass', 'uglify', 'imagemin'], cb);

        setTimeout(function () {
            gulp.run(['zip']);
        }, 10000)
    }

    else if (versionTypes[index] == 'Patch') {
        console.log('lol3');
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


