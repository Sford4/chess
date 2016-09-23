'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	watch = require('gulp-watch');




gulp.task("concatScripts", function() {
	return gulp.src(['js/jquery-3.1.0.min.js', 'chess.js'])
	.pipe(maps.init())
	.pipe(concat("app.js"))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", function() {
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));

})

gulp.task("compileSass", function() {
	return gulp.src("scss/application.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
})

gulp.task('watch', function () {
	return watch(['scss/**/*.scss', './Chess.js', './index.html', './Chess.css'], function() {
		gulp.run('default');
		console.log("string");
	});
})	

gulp.task('default', ['concatScripts', 'minifyScripts', 'compileSass']);