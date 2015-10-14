
var gulp = require('gulp');

gulp.task('serve', ['sass', 'ngConfig', 'webpack', 'watch', 'server', 'index', 'partials']);
gulp.task('default', ['sass', 'ngConfig', 'webpack', 'watch', 'server', 'index', 'partials']);
