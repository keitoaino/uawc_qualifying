'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');

gulp.task('serve', ['autoprefix', 'wiredep', 'inject'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['app']
    }
  });

  gulp
    .watch([
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/scripts/**/*.js'
    ],
    [
      'inject',
      'autoprefix',
      browserSync.reload
    ]);

  gulp.watch('bower.json', ['wiredep', browserSync.reload]);
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp
    .src('app/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('inject', function () {
  var sources = gulp.src(
    ['app/scripts/**/*.js', 'app/styles/**/*.css'],
    {read: false}
  );
  var options = {
    relative: true
  };

  gulp
    .src('app/index.html')
    .pipe($.inject(sources, options))
    .pipe(gulp.dest('app'));
});

gulp.task('cdn', function () {
  gulp
    .src('app/index.html')
    .pipe($.googleCdn(require('./bower.json')))
    .pipe(gulp.dest('app'));
});

gulp.task('autoprefix', function () {
  gulp
    .src('app/styles/**/*.css')
    .pipe($.autoprefixer({
        browsers: ['> 2%'],
        cascade: false
      })
    )
    .pipe(gulp.dest('app/styles'));
});
