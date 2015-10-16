require("../app.js");

(function () {
  "use strict";

  angular.module("blogapp").controller("BlogFormCtrl", ["BlogsService", "$routeParams", "$location", "$http", "token", "$log", function (BlogsService, $routeParams, $location, $http, token, $log) {

    var vm = this;
    vm.save = saveForm;
    vm.blog = {
      filename: "",
      description: "",
      content: ""
    };

    initialize();

    function initialize() {
      if ($routeParams.blog_id) {
        BlogsService.get($routeParams.blog_id).then(successHandler, setBlog(data, response),errorHandler);
      }
    }

    function setBlog (gist, response) {
      vm.blog = {
        description: gist.description,
        content: response.data,
        author: gist.owner.login,
        date: $filter("date")(gist.updated_at),
        comments: gist.comments + " comments",
        id: gist.id
      }
    }

    function saveForm () {
      var method;
      var x = vm.blog.filename;

      var newGist = {
        "description": vm.blog.description,
        "public": true,
        "files": {}
      };

      newGist.files[x] = {
          "content": vm.blog.content
      };

      method = $routeParams.blog_id ? "update" : "create";

      BlogsService[method](newGist).then(function (response) {
        successHandler(response);
        $location.url('/#/blogs/' + vm.gists.id);
        $log.info("response", response);
      }, function (response) {
        errorHandler(response);
      });

      function successHandler (response) {
        var data = response.data;
        data = angular.isArray(data) ? data : [data];  //isArray is an angular method
        vm.gists = response.data;
        $log.info("response", response);
      };

      function errorHandler(response) {
        $log.error("response", response);
      };
    };
  }]);
}());
