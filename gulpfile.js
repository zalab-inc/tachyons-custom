'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const cssbeautify = require('gulp-cssbeautify');
const purgecss = require('gulp-purgecss')
const stripCssComments = require('gulp-strip-css-comments');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('dev', function () {
  return gulp.src('src/builder.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssbeautify())
    .pipe(stripCssComments())
    .pipe(concat('tachyions-custom.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function () {
  return gulp.src('src/builder.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(stripCssComments())
    .pipe(concat('tachyions-custom.min.css'))
    .pipe(gulp.dest('dist'));
  });
  
  
gulp.task('build-purge', () => {
  return gulp.src('dist/tachyions-custom.min.css')
    .pipe(purgecss({
      content: ['demo/**/*.html']
    }))
    .pipe(concat('tachyions-custom-purge.min.css'))
    .pipe(gulp.dest('dist'));
})