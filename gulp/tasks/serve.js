
var gulp = require("gulp");
var config = require("../config").server;
var server = require("gulp-express");

gulp.task("server", function() {
  server.run(["server.js"]);

  // restart the server when it changes
  gulp.watch(["server.js"], [server.run]);
});
