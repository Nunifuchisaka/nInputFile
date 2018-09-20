var gulp = require('gulp'),
    browserSync = require("browser-sync").create(),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');


/*
## browser sync
*/

gulp.task("browser-sync", function(){
  browserSync.init({
    proxy: "n-input-file.lcl:8888",
    startPath: "demo"
  });
});

gulp.task("bs-reload", function(){
  browserSync.reload();
});



/*
## StyleSheet
*/

gulp.task('scss_compile', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
      cascade: false
    }))
    .pipe(gulp.dest('dst'))
    .pipe(browserSync.stream());
});


gulp.task('js_compile', function() {
  gulp.src([
      'src/js/110_header.js',
      'src/js/410_View.js',
      'src/js/990_footer.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('jquery.nInputFile.js'))
    .pipe(gulp.dest('dst'))
    .pipe(uglify({output:{comments: /^!/}}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dst'))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.sourcemap'}))
    .pipe(gulp.dest('dst'))
    .pipe(browserSync.stream());
});


gulp.task("default", ["browser-sync"], function(){
  
  gulp.watch("src/scss/**/*.scss", ["scss_compile"]);
  gulp.watch("src/js/**/*.js", ["js_compile"]);
  gulp.watch("demo/**/*.html", ["bs-reload"]);
  
});
