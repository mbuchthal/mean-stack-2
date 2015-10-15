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

      BlogsService[method](newGist).then(function (resp) {
        $http.post("https://api.github.com/gists", newGist, {
          headers: {
            Authorization: "token " + token
          }
        }).then(successHandler, errorHandler);
        $location.url('/#/blogs/' + data.id);
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
