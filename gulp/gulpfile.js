/* File: gulpfile.js */

// grab our packages
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  })
})

/* Sass task */
gulp.task('sass', function () {
    return sass('assets/scss/main.scss', { sourcemap: true, style: 'compressed' })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write('map'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))    
});

gulp.task('compimgs', () => {
    return gulp.src('assets/img-src/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/img'));
});

/* Scripts task */
gulp.task('scripts', function() {
    return gulp.src([
        /* Add your JS files here, they will be combined in this order */
        'assets/js/src/jquery.easing.min.js',
        'assets/js/src/plugins.js',
        'assets/js/src/main.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('assets/js/src/*.js', ['scripts']);
    gulp.watch('assets/img-src/**/*.*', ['compimgs']);
    gulp.watch('*.html', browserSync.reload); 
});
