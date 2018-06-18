var gulp = 			    require('gulp');
var postcss = 		  require('gulp-postcss');
var sourcemaps = 	  require('gulp-sourcemaps');
var imagemin =      require('gulp-imagemin');
var concat =        require('gulp-concat');
var rename =        require('gulp-rename');
var uglify =        require('gulp-uglify');
var browserSync =   require('browser-sync').create();
var plumber =       require('gulp-plumber');
var stylelint =     require("stylelint");

gulp.task('default', ['watch']);

gulp.task('styles', function () {
  var plugins = [
    require("postcss-import")({
      plugins: [
        require("stylelint")({ /* your options */ })
      ]
    }),
    require("postcss-import-url")(),
    require("rucksack-css")({
        fallbacks: false
    }),
    require("postcss-preset-env")(),
    require('cssnano')({ 
      autoprefixer: false,
      discardComments: {
        removeAll: true
      }
     }),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")()
  ];	
  return gulp.src('./src/assets/css/main.css')
  // .pipe(plumber())  
  .pipe(sourcemaps.init())
  .pipe(postcss(plugins))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/assets/css'))
  .pipe(browserSync.reload({
      stream: true
    }));
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
        './src/assets/scripts/vendor/slick.js',
        // './src/assets/js/plugins.js',
        './src/assets/scripts/main.js'
    ])
    .pipe(plumber())  
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/assets/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/scripts'));

});

// Static server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('watch', ['browserSync', 'styles', 'scripts', 'compimgs'], function (){
    gulp.watch('./src/assets/css/**/*.*', ['styles']);
    gulp.watch('./src/assets/scripts/*.js', ['scripts']);
    gulp.watch('./src/assets/img/**/*.*', ['compimgs']);
});
