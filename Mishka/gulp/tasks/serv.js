module.exports = function() {
	$.gulp.task('serv', function(){
		$.browserSync.init({
			server: {
				baseDir: "./build"
			}
		});
	});
}