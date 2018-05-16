
'use strict';
// Gulp
var gulp = require('gulp');


//fs variable
var fs = require('file-system');


//Variables for Versioning
var docString = fs.readFileSync('version.js', 'utf8');
var versionParts = docString.split('.');
var vArray = {
    vMajor: versionParts[0],
    vMinor: versionParts[1],
    vPatch: versionParts[2]
};

var periodString = ".";

var oldVersionNumber = vArray.vMajor + periodString +
    vArray.vMinor + periodString +
    vArray.vPatch;

var oldnumbstr = oldVersionNumber.toString();

var config = require('./config.json');

// Versioning
gulp.task('increment-Major', function () {
    vArray.vMajor = parseFloat(vArray.vMajor) + 1;

    var MajorVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;

    var newnumbstr = MajorVersionNumber.toString();

    require('fs').writeFileSync('version.js', MajorVersionNumber);

    renameSequence(newnumbstr);
});


gulp.task('increment-Minor', function () {

    vArray.vMinor = parseFloat(vArray.vMinor) + 1;

    var MinorVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;

    var newnumbstr = MinorVersionNumber.toString();

    require('fs').writeFileSync('version.js', MinorVersionNumber);

    renameSequence(newnumbstr);
});

gulp.task('increment-Patch', function () {

    vArray.vPatch = parseFloat(vArray.vPatch) + 1;

    var PatchVersionNumber = vArray.vMajor + periodString +
        vArray.vMinor + periodString +
        vArray.vPatch;

    var newnumbstr = PatchVersionNumber.toString();

    require('fs').writeFileSync('version.js', PatchVersionNumber);

    renameSequence(newnumbstr);
});

function renameSequence(newnumbstr) {
    fs.renameSync('app/assets/' + oldnumbstr + '', 'app/assets/' + newnumbstr + ''); //version based on previous

    return gulp.src(['version.js'])
        .pipe(gulp.dest('./'));//creates version.js file in the directory
}

