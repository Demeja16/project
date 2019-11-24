'use strict';

global.$ = {
	gulp: require('gulp'),
	gp: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	htmlmin: require('gulp-htmlmin'),
	uglify: require('gulp-uglify'),

	path: {
		tasks: require('./gulp/config/tasks.js')
	}
};

$.path.tasks.forEach(function (taskPath) {
	require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
	$.gulp.parallel('less','scripts'),
	$.gulp.parallel('watch', 'serv')
));