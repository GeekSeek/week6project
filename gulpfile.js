'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(reload({stream: true}));
	});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public'  
  })
});

gulp.task('watch', () => {
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/*.js', ['scripts']);
	gulp.watch('./public/*.html', reload);
	});

gulp.task('scripts', () => {
	gulp.src('./dev/scripts/main.js')
			.pipe(sourcemaps.init())
	    .pipe(babel({
	      presets: ['es2015']
	    }))
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest('./public/scripts'))
	    .pipe(reload({stream: true}));
	});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);
