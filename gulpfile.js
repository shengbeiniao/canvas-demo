'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('static', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  gulp.watch(['**/*','!bower_components','!node_modules']).on('change', browserSync.reload);
});