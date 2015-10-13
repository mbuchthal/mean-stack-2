var gulp = require("gulp");
var config = require("../config").partials;

gulp.task("partials", function() {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
})
