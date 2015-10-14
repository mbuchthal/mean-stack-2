require("./app.js");

angular.module("blogapp").filter("offset", function ($filter) {
  return function (input, start) {
    if (input) {
      start = parseInt(start, 10);
      return input.slice(start);
    }
  };
});
