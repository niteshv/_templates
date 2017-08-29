var gulp = require('gulp');
var postcss = require('gulp-postcss');
var atImport = require("postcss-import");
var nested = require('postcss-nested');
var scss = require('postcss-scss');
var flexbox = require('postcss-flexbox');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var conditionals = require('postcss-conditionals');
var cssmixins = require('postcss-mixins');
var simplevars = require('postcss-simple-vars');
var calc = require('postcss-calc');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', ['watch']);

gulp.task('css', function () {
    var processors = [
        atImport,
        cssmixins,
        conditionals,
        nested,
        simplevars,
        calc,
        flexbox,
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./src/assets/scss/main.css')
        .pipe(postcss(processors, {syntax: scss}))
        .pipe(gulp.dest('./dist/assets/css'));
});

/* Compress images task */
gulp.task('compimgs', () => {
    return gulp.src('./src/assets/img/**/*.*',  {base: './src/assets/img/'})
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./dist/assets/img/'));
});

/* Scripts task */
gulp.task('scripts', function() {
    return gulp.src([
        /* Add your JS files here, they will be combined in this order */
        './src/assets/js/plugins.js',
        './src/assets/js/main.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'));

});

gulp.task('build', function() {
  gulp.src('./src/assets/js/vendor/*.js')
  .pipe(gulp.dest('./dist/assets/js/vendor'));
  gulp.src('./src/assets/fonts/*.*')
  .pipe(gulp.dest('./dist/assets/fonts'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['css', 'scripts', 'compimgs'], function (){
    gulp.watch('./src/assets/scss/**/*.*', ['css']);
    gulp.watch('./src/assets/js/*.js', ['scripts']);
    gulp.watch('./src/assets/img/**/*.*', ['compimgs']);
});
