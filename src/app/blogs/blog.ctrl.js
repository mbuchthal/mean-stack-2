
require("../app.js");

angular.module("blogapp").controller("BlogCtrl", function (BlogsService, $routeParams, $scope, $http, $log, $location) {
  vm = this;
  vm.delete = deleteBlog;
  vm.patch = patch;
  var updatedGist;

  initialize();

  function initialize() {
    BlogsService
      .get($routeParams.gist_id)
      .then(successHandler, errorHandler);
  };

  function successHandler (response) {
    var data = response.data;
    data = angular.isArray(data) ? data : [data];  //isArray is an angular method
    $scope.gists = response.data;
    vm.filename = Object.keys($scope.gists.files)[0];
    $log.info("response", response);
  };

  function errorHandler(response) {
    $log.error("response", response);
  };

  function deleteBlog (gist) {
    BlogsService.delete(gist).then(function (resp) {
      $location.url("/blogs");
      $log.info("deleted", resp);
    }, function (resp) {
      $log.error("Could not delete " + resp);
    });
  }

  function patch () {
    var filename = Object.keys($scope.gists.files)[0];
    var updatedGist = {
      "id": $scope.gists.id,
      "description": $scope.gists.description,
      "public": true,
      "files": {}
    };

    updatedGist.files[filename] = {
        "content": $scope.gists.files[vm.filename].content
    };



    BlogsService.update(updatedGist).then(function (response) {

      console.log(updatedGist.id);

      $location.url('/blogs/' + updatedGist.id);
      $log.info("response", response);
    }, function (response) {
      errorHandler(response);
    });
  }

});
