
require("../app.js");

angular.module("blogapp").controller("BlogCtrl", function (BlogsService, $routeParams, $scope, $http, $log) {

  initialize();

  function initialize() {
    BlogsService
      .get($routeParams.gist_id)
      .then(successHandler, errorHandler);
  };

  function successHandler (response) {
    var data = response.data;
    data = angular.isArray(data) ? data : [data];  //isArray is an angular method
    console.log(data);
    $scope.gists = response.data;
    $log.info("response", response);
  };

  function errorHandler(response) {
    $log.error("response", response);
  };

});
