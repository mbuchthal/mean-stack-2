
require("../app.js");

angular.module("blogapp").controller("BlogCtrl", ["BlogsService", "$routeParams", function (BlogsService, $routeParams) {
  var vm = this;

  initialize();

  function initialize() {
    BlogsService
      .get($routeParams.blog_id)
      .then(function (resp) {
        vm.blog = resp.data;
      });
  }
}]);
