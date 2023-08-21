import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import inliner from 'gulp-inline-source';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import webpack from 'webpack-stream';
import * as dartSass from 'sass';

import { paths, imageminOptions, webpackOptions } from './config.js';

const sass = gulpSass(dartSass);

const compileStyles = () => {
  return gulp
    .src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build.css));
}

const minifyHtml = () => {
  return gulp
    .src(paths.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(inliner())
    .pipe(gulp.dest(paths.build.html));
}

const optimizeImages = () => {
  return gulp
    .src(paths.src.img)
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(paths.build.img));
}

const concatJs = () => {
  return gulp
    .src(paths.src.js)
    .pipe(webpack(webpackOptions))
    .pipe(gulp.dest(paths.build.js));
}

const watch = () => {
  gulp.watch(paths.src.html, minifyHtml);
  gulp.watch(paths.src.scss, compileStyles);
  gulp.watch(paths.src.img, optimizeImages);
  gulp.watch(paths.src.js, concatJs);
}

gulp.task('build', gulp.parallel(compileStyles, minifyHtml, optimizeImages, concatJs));
gulp.task('watch', watch);
