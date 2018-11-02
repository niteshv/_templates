var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var rename          = require('gulp-rename');
var postcss         = require('gulp-postcss');
var reporter        = require('postcss-reporter');
var syntax_scss     = require('postcss-scss');
var stylelint       = require("stylelint");
var cleanCSS        = require("gulp-clean-css");
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');

var paths = {
    css: {
        src: './src/components/main.scss',
        scss: './src/components/**/*.scss',
        dest: './dist/assets/css'
    },
    js: {
        src: './src/scripts',
        dest: './dist/assets/scripts'
    }
};

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
    return gulp.src([
        /* Add your JS files here, they will be combined in this order */
        // './src/assets/scripts/vendor/slick.js',
        // './src/assets/js/plugins.js',
        './src/scripts/main.js'
    ])
    .pipe(plumber())  
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));

});


gulp.task('styles', function () {
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
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.css.dest));
});


gulp.task('watch', function () {
    gulp.watch(paths.css.scss, gulp.series('styles','scss-lint'));
    gulp.watch(paths.js.src, gulp.series('scripts'));
  });


// Default task
gulp.task('default', gulp.series('styles', 
gulp.parallel('watch')
));