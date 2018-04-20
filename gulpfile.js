'use strict';
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var filter = require('gulp-filter');
var fs = require('fs');
var gIf = require('gulp-if');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var license = require('gulp-license');
var riot = require('gulp-riot');
var minifier = require('gulp-uglify/minifier');
var uglify = require('uglify-js-harmony');
var useref = require('gulp-useref');


gulp.task('html', ['clean'], function() {
  var htmlFilter = filter('**/*.html', {restore: true});
  return gulp.src(['src/index.html'])
    .pipe(useref())
    .pipe(gIf(['*.js', '!*.min.js'], minifier({}, uglify))) // FIXME
    .pipe(htmlFilter)
    .pipe(htmlmin({
      removeComments: false,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyJS: uglify
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('riot-tag', ['html'], function() {
  return gulp.src('src/tags/*.tag')
    .pipe(riot())
    .pipe(concat('tags.js'))
    .pipe(babel({}))
    .pipe(minifier({}, uglify))
    .pipe(license('gpl3', {
      tiny: false,
      project: 'color-operation-ui',
      year: '2016-2017',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', ['html'], function() {
  return gulp.src(['src/scripts/color-converter.js', 'src/scripts/script.js',])
    .pipe(concat('script.js'))
    .pipe(minifier({}, uglify))
    .pipe(license('gpl3', {
      tiny: false,
      project: 'color-operation-ui',
      year: '2016-2017',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('vendor', ['html'], function() {
  return gulp.src(['node_modules/riot/riot.min.js','node_modules/riot-mui/build/js/riot-mui-min.js','src/scripts/fix.js','node_modules/color-ops/index.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', ['html'], function() {
  return gulp.src(['src/*.css'])
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(license('gpl3', {
      tiny: false,
      project: 'color-operation-ui',
      year: '2016-2017',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src('src/fonts/*')
    .pipe(filter('**/*.{otf,eot,svg,ttf,woff,woff2}'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sources', ['riot-tag', 'scripts', 'styles', 'vendor'], function() {
  gulp.start();
});

gulp.task('watch', function(){
   gulp.watch('./src/tags/*.tag',['riot-tag']);
   gulp.watch('./src/scripts/*.js',['scripts']);
   gulp.watch('./src/*.css',['styles']);
   gulp.watch('./src/*.html',['html']);
});

gulp.task('build', ['sources', 'fonts']);