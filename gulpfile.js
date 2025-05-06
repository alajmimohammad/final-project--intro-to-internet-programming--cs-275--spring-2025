const gulp = require('gulp');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');

// Paths
const paths = {
  html: 'app/html/**/*.html',
  css: 'app/css/**/*.css',
  js: 'app/js/**/*.js'
};

// Validate HTML 
gulp.task('validateHTML', () => {
  return gulp.src(paths.html);
});

// Validate CSS
gulp.task('validateCSS', () => {
  return gulp.src(paths.css)
    .pipe(stylelint({
      reporters: [{ formatter: 'string', console: true }]
    }));
});

// Validate JS
gulp.task('validateJS', () => {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Compress HTML
gulp.task('compressHTML', () => {
  return gulp.src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('prod/html'));
});

// Compress CSS
gulp.task('compressCSS', () => {
  return gulp.src(paths.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest('prod/css'));
});

// Compress JS
gulp.task('compressJS', () => {
  return gulp.src(paths.js)
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(gulp.dest('prod/js'));
});

// Dev task
gulp.task('default', gulp.parallel('validateHTML', 'validateCSS', 'validateJS'));

// Build task
gulp.task('build', gulp.parallel('compressHTML', 'compressCSS', 'compressJS'));
