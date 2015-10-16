
require("../app.js");

angular.module("blogapp").controller("BlogCtrl", function (BlogsService, $routeParams, $scope, $http, $log, $location) {
  vm = this;
  vm.delete = deleteBlog;
  if (!(vm.filename)) vm.filename;

  initialize();

  function initialize() {
    BlogsService
      .get($routeParams.gist_id)
      .then(successHandler, errorHandler);
  };

  function successHandler (response) {
    var data = response.data;
    data = angular.isArray(data) ? data : [data];  //isArray is an angular method
    //console.log(data);
    $scope.gists = response.data;
    // $scope.filename = Object.keys($scope.gists.files)[0];
    vm.filename = Object.keys($scope.gists.files)[0];

    $log.info("response", response);
    console.log(Object.keys($scope.gists.files)[0]);
    console.log($scope.gists.files[vm.filename].content);
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
});


