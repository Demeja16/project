module.exports = function() {
	$.gulp.task('minify', function(){
  		return $.gulp.src('project/html/*.html')
    	.pipe($.htmlmin({ collapseWhitespace: true }))
    	.pipe($.gulp.dest('build'))
    	.on('end', $.browserSync.reload)
	});
}