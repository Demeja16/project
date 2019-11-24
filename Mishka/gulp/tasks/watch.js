module.exports = function() {
	$.gulp.task('watch', function(){
		$.gulp.watch('project/less/**/*.less', $.gulp.series('less'));
		$.gulp.watch('project/html/**/*.html', $.gulp.series('minify'));
		$.gulp.watch('project/js/**/*.js', $.gulp.series('scripts'));
	});
}