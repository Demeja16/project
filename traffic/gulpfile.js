const gulp = require("gulp");
const less = require("gulp-less");
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const mincss = require('gulp-clean-css');
const minjs = require("gulp-uglify");
const del = require("del");
const htmlmin = require('gulp-htmlmin');
const serv = require('browser-sync').create();
// const notify = require("gulp-notify");
const tinpng = require('gulp-tinypng-extended');
const webp = require('gulp-webp');
const svgo = require('gulp-svgo');
const svgstore = require('gulp-svgstore');

/*Functions for watcher*/
	function html(){
		return gulp.src("dev/html/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))//minify HTML and reload BrowserSync server
		.pipe(gulp.dest("build/"))//puts .html in build folder
		.on("end", serv.reload);//reload page
	}
	function styles() {
		return gulp.src("dev/less/main.less")
			.pipe(less())//compile less in css
			.pipe(autoprefixer({
		 		browsers: ['> 0.1%']
		 	}))//vendor prefix for properties
		 	.pipe(gulp.dest("build/css")) //puts main.css in css folder
		 	.pipe(mincss({
		 		level:2
		 	}))//minimize main.css
		 	.pipe(rename("main.min.css"))//rename main.css to main.min.css
			.pipe(gulp.dest("build/css")) //puts main.min.css in css folder
			.pipe(serv.stream());//draw css without page reload
	}
	function scripts() {
		return gulp.src("dev/js/*.js")
		.pipe(minjs({
			toplevel:true
		}))//uglify .js files(minify)
		.pipe(gulp.dest("build/js"))//puts main.js in js folder
		.pipe(serv.stream());//reload page
	}

/*Watcher function*/
	function watch(){
		serv.init({
	        server: {
	            baseDir: "./build"
	        }
	    });//initializes server in build folder

		gulp.watch('./dev/less/**/*.less', styles);//watch all .less files in /dev/less folder
		gulp.watch('./dev/js/**/*.js', scripts);//watch all .js files in /dev/js folder
		gulp.watch('./dev/html/*.html', html);//watch all .html files in /dev/html folder
	}

/*Build functions*/
	function tinypng(){
		return gulp.src('dev/img/src/**/*.{png,jpg,jpeg}')
        .pipe(tinpng({
            key: 'vk4MjNSJ4ueyHE97MrY8IAl95xPgNEVR'//paste your own API key here(key in your acciunt on https://tinypng.com/dashboard/api)
        }))//minify all .png, .jpg, .jpeg images
        .pipe(gulp.dest('build/img'));
	}
	function webpimg(){
		return gulp.src("build/img/**/*.{png,jpg}")
		.pipe(webp({quality: 90}))
		.pipe(gulp.dest("build/img"));
	}
	function minsvg(){
		return gulp.src("dev/img/svg/**/*.svg")
		.pipe(svgo())
		.pipe(gulp.dest("build/img"));
	}
	function sprite(){
		return gulp.src("dev/img/inlinesvg/*.svg")
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"));
	}

/*Clean functions*/
	function cleanall(){
		return del(['build/*']);
	}
	function cleanimg(){
		return del(['build/img/*']);
	}


/*Tasks for watcher*/
	// gulp.task("html", html);
	// gulp.task("styles", styles);
	// gulp.task("scripts", scripts);

/*Watcher Task*/
	gulp.task("watch", watch);

/*Build tasks*/
	gulp.task('tinypng', gulp.series(cleanimg, tinypng));
	gulp.task("webp", webpimg);
	gulp.task("minsvg", minsvg);
	gulp.task("sprite", sprite);

	gulp.task('img', gulp.series(cleanimg, tinypng, webpimg, minsvg, sprite));

	