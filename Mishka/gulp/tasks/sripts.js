module.exports = function() {
	$.gulp.task('scripts', function(){
		return $.gulp.src(['project/js/*.js'])
			.pipe($.uglify())
			.pipe($.gulp.dest(['build/js/']))
			.pipe($.browserSync.reload({
				stream:true
		}));
	});
}