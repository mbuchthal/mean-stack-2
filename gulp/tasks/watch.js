
var gulp = require("gulp");
var config = require("../config");

gulp.task("watch", function() {
  gulp.watch(config.javascript.src, ["jshint", "webpack"]);
  gulp.watch(config.sass.src, ["sass"]);
});
