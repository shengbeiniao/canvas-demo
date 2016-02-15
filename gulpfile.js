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
  gulp.watch(['canvas/**/*','create/**/*','three/**/*','*.html']).on('change', browserSync.reload);
});
