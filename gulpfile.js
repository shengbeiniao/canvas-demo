'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('proxy', function() {
  browserSync.init({
    proxy: 'localhost:9000',
    files: ['app/**/*','app/!bower_components'],
    port: 3000
  });
});


// Static server
gulp.task('static', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  gulp.watch(['index.html','stylesheets/*','app/**/*','app/!bower_components']).on('change', browserSync.reload);
});