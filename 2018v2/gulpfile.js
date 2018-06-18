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

var paths = {
    css: {
        src: './src/components/main.scss',
        scss: './src/components/**/*.scss',
        dest: './dist/assets/css',
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


// gulp.task('watch', ['styles'], function() {
//     gulp.watch(paths.css.scss, ['styles']);  
// });
  
// gulp.task('default', ['watch']);
  