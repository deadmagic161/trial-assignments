var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  rename = require ('gulp-rename'),
  short = require('postcss-short'),
  assets = require ('postcss-assets'),
  browserSync = require('browser-sync').create();


gulp.task('default', ['css', 'watch']);


gulp.task('default', ['dev']);
gulp.task('dev', ['build-dev', 'browser-sync', 'watch']);

gulp.task('build-dev',['html', 'css-dev', 'assets']);

gulp.task('css-dev', function() {
  var processors = [
    short,
    assets ({
      loadPath: ['src/assets/img'],
      relatiTo: 'src/styles/'
    }),
  ];
    return gulp.src('./src/styles/*.css')
          .pipe(postcss(processors))
          .pipe(rename('styleOut.css'))
          .pipe(postcss([
              autoprefixer({ browsers: ['> 1%', 'IE 9', 'IE 10']})
          ]))
          .pipe(gulp.dest('./build/styles/'));
});

gulp.task('html', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('browser-sync', function() {
  return browserSync.init({
    server: {
      baseDir: './build/'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/*.css', ['css-dev']);
  gulp.watch('./src/index.html', ['html']);
  gulp.watch('./src/**/*.*', browserSync.reload);
});


gulp.task('assets', function() {
  return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('./build/assets/'));
});


