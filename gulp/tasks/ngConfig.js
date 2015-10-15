var gulp = require("gulp");
var ngConfig = require("gulp-ng-config");
var config = require("../config").ngConfig;
var fs = require("fs");

gulp.task("ngConfig", function() {
  var tokenFile = config.dest  + "/token.txt";  // !!! .txt?

  // Create a temp file with the token stored in it
  //fs.writeFileSync(tokenFile, '{"token": "' + process.env.GITHUBTOKEN + '"}');
  fs.writeFileSync(tokenFile, '{"token": "' + "c5e7199d1f6fd489c2e5fb841e6dd4269484eb6d" + '"}');

  // Generate the token config file
  gulp.src(tokenFile)
    .pipe(ngConfig("gisty.config"))
    .pipe(gulp.dest(config.dest));

});
