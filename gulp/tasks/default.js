
var gulp = require('gulp');

gulp.task('serve', ['sass', 'webpack', 'watch', 'server', 'index', 'partials']);
gulp.task('default', ['sass', 'webpack', 'watch', 'server', 'index', 'partials']);
