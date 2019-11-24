module.exports = function() {
	$.gulp.task('less', function(){
		return $.gulp.src('project/less/main.less')
			.pipe($.gp.sourcemaps.init())
			.pipe($.gp.less())
			.pipe($.gp.autoprefixer({
			browsers: ['last 10 versions']
			}))
			.on("error", $.gp.notify.onError({
				message: "Error: <%= error.message %>",
				title: "style"
			}))
			.pipe($.gp.csso())
			.pipe($.gp.sourcemaps.write())
			.pipe($.gulp.dest('build/css/'))
			.pipe($.browserSync.reload({
				stream:true
		}));
	});
}