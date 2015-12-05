var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/CCObstacles.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('CCObstacles.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .on('error', util.log)
    .pipe(sourcemaps.write('./src/maps/'))
    .pipe(gulp.dest('./'));
});

gulp.task('buildProd', function () {
  var b = browserify({
    entries: './src/CCObstacles.js',
    debug: false
  });
  return b.bundle()
    .pipe(source('CCObstacles.js'))
    .pipe(buffer())
        .pipe(uglify())
        .on('error', util.log)
    .pipe(gulp.dest('./'));
});

gulp.task('test', function () {
    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', util.log);
});
 
gulp.task('watch-test', function () {
    gulp.watch(['src/**', 'test/**'], ['build','test']);
});