require("../app.js");

(function () {
  "use strict";
  angular.module("blogapp").controller("BlogFormCtrl", ["BlogsService", "$routeParams", "$location", function (BlogsService, $routeParams, $location) {
    var vm = this;

    vm.save = saveForm;

    vm.blog = {};

    initialize();

    function initialize () {
      if ($routeParams.blog_id) {
        BlogsService.get($routeParams.blog_id).then(function (resp) {
          vm.blog = resp.data;
        });
      }
    }

    function saveForm () {
      var method;

      method = $routeParams.blog_id ? "update" : "create";
      BlogsService[method](vm.blog).then(function (resp) {
        $location.path("/blogs/" + resp.data._id);
      });
    }
  }]);
}());
