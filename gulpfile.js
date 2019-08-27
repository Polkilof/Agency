'use strict';

let gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	clean = require('gulp-clean'),
	browser = require('browser-sync').create(),
	sass = require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	prefix = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	changed = require('gulp-changed'),
	rigger = require('gulp-rigger'),
	ghPages = require('gulp-gh-pages');

let path = {
	src: {
		html: './src/**/*.html',
		php: './src/**/*.php',
		inc: './src/inc/**/*.html',
		js: './src/js/*.js',
		js_min: './src/js/**/*.min.js',
		style: {
			sass: './src/sass/**/*.{scss,sass}',
			css: './src/css/**/*.css',
			css_min: './src/css/**/*.min.css',
		},
		css: './src/css',
		img: './src/images/**/*.*',
		fonts: './src/fonts/**/*.*'
	},
	public: {
		folder: './public/',
		html: './public/**/*.html',
		js: './public/js/',
		css: './public/css/',
		style: {
			css: './public/css/**/*.css',
			css_min: './public/css/**/*.min.css',
		},
		img: './public/images/',
		fonts: './public/fonts/'
	}
};

gulp.task('default', gulpsync.sync(['clean', ['html', 'styles', 'minify', 'js', 'js2', 'fonts', 'images', 'browser', 'watch']]));

gulp.task('browser', () => {
	browser.init({
		server: {
			baseDir: path.public.folder,
			injectChanges: true
		}
	});
});

gulp.task('clean', () => {
	return gulp.src(path.public.folder, {read: false})
		.pipe(clean());
});

gulp.task('deploy', function() {
	return gulp.src(path.public.folder+'**/*')
		.pipe(ghPages());
});

gulp.task('html', () => {
	return gulp.src([path.src.html, '!'+path.src.inc, path.src.php])
		.pipe(rigger())
		.pipe(gulp.dest(path.public.folder));
});

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task('styles', () => {
	gulp.src(path.src.style.sass)
		.pipe(sourcemaps.init())
		.pipe(sass()).on('error', swallowError)
		.pipe(prefix('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write('.', {
				includeContent: false,
				sourceRoot: '../../../src/scss'
			}))
		.pipe(gulp.dest(path.src.css))
		.pipe(gulp.dest(path.public.css))
		.pipe(browser.reload({stream: true}));
});

gulp.task('minify', () => {
	return gulp.src([path.src.style.css, path.public.style.css, '!'+path.src.style.css_min, '!'+path.public.style.css_min])
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(path.src.css))
		.pipe(gulp.dest(path.public.css))
		.pipe(browser.reload({stream:true}));
});

gulp.task('js', () => {
	return gulp.src([path.src.js, '!'+path.src.js_min])
		.pipe(gulp.dest(path.public.js))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(path.public.js))
		.pipe(browser.reload({stream:true}));
});
gulp.task('js2', () => {
	return gulp.src(path.src.js_min)
		.pipe(gulp.dest(path.public.js))
		.pipe(uglify())
		.pipe(gulp.dest(path.public.js))
		.pipe(browser.reload({stream:true}));
});

gulp.task('images', () => {
	gulp.src(path.src.img)
		.pipe(changed(path.public.img))
		.pipe(imagemin({progressive: true, optimizationLevel: 0, interlaced: true}))
		.pipe(gulp.dest(path.public.img));
});

gulp.task('fonts', () => {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.public.fonts));
});

gulp.task('watch', () => {
	// Watch .html files
	gulp.watch('src/**/*.html', ['html', browser.reload]);
	gulp.watch("public/*.html").on('change', browser.reload);
	// Watch .sass files
	gulp.watch('src/sass/**/*.scss', ['styles', browser.reload]);
	//gulp.watch('src/css/**/*.css.map', ['styles', browser.reload]);
	//gulp.watch('src/css/**/*.css', ['styles', browser.reload]);
	gulp.watch('src/css/**/*.css', ['minify', browser.reload]);
	// Watch .js files
	gulp.watch('src/js/*.js', ['js', browser.reload]);
	gulp.watch('src/js/*.js', ['js2', browser.reload]);
	// Watch image files
	gulp.watch('src/images/**/*', ['images', browser.reload]);
	// Watch .fonts files
	gulp.watch('src/fonts/**/*.*', ['fonts', browser.reload]);
});