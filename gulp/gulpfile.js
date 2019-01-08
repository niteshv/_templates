var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var rename          = require('gulp-rename');
var postcss         = require('gulp-postcss');
var reporter        = require('postcss-reporter');
var syntax_scss     = require('postcss-scss');
var stylelint       = require("stylelint");
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var imagemin        = require('gulp-imagemin');
var webp            = require("imagemin-webp");
var extReplace      = require("gulp-ext-replace");
var fileinclude     = require('gulp-file-include');
var browserSync     = require('browser-sync').create();

var paths = {
    css: {
        src:  './src/styles.scss',
        scss: './src/**/*.scss',
        dest: './dist/assets/css',
        sync: './dist/assets/css/*.css'
    },
    js: {
        entry: './src/app.js',
        src:    './src/**/*.js',
        dest:  './dist/assets/scripts',
        sync:  './dist/assets/scripts/*.js'
    },
    img: {
        folder: './src/img',
        src:    './src/img/**/*',
        dest:   './dist/assets/img'
    },
    html: {
        entry: './src/index.html',
        src:    './src/**/*.html',
        dest:  './dist',
        sync:  './dist/*.html'
    },
};

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        files: [
            paths.css.sync,
            paths.js.sync,
            paths.html.sync
        ],
        notify: false
    });
});

gulp.task("scss-lint", function() {
    var processors = [
        stylelint(),
        reporter({
            clearMessages: true,
            throwError: false
        })
    ];
    return gulp.src(
        [
            paths.css.scss
        ]
    )
    .pipe(postcss(processors, {syntax: syntax_scss}));
});

gulp.task('scripts', function() {
    return gulp.src(paths.js.entry)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('html', function() {
    return gulp.src(paths.html.entry)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/components/'
        }))
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('styles', function () {
    var plugins = [
        require('cssnano')({ 
            autoprefixer: false,
            discardComments: {
                removeAll: true
            }
        }),
        require("postcss-reporter")()
    ]; 
    return gulp.src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'normal', precision: 10})
            .on('error', sass.logError)
        )
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.css.dest))
        .pipe(sass({outputStyle: 'compressed', precision: 10})
            .on('error', sass.logError)
        )
        .pipe(postcss(plugins))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task('imgs', function () {
    return gulp.src(paths.img.src,  {base: paths.img.folder})
        .pipe(imagemin({
            progressive: true     
        }))
        .pipe(gulp.dest(paths.img.dest))
        .pipe(imagemin([
            webp({
                quality: 75
            })
        ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('watch', function () {
    gulp.watch(paths.css.scss, gulp.series('styles','scss-lint'));
    gulp.watch(paths.js.src, gulp.series('scripts'));
    gulp.watch(paths.html.src, gulp.series('html'));
    gulp.watch(paths.img.src, gulp.series('imgs'));
});

// Default task
gulp.task('default', gulp.series('styles', gulp.parallel('watch','browser-sync')));