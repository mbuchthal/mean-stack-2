require("../app.js");
require("../filters/pager.filter.js");

(function () {
  "use strict";

  // angular.module("blogapp").controller("BlogsCtrl", ["BlogsService", function (BlogsService) {

angular.module("blogapp").controller("BlogsCtrl", function ($scope, $http, $log, token) {

  $scope.pagination = {
    currentPage: 0,
    perPage: 2,
    getOffset: function () {
      return $scope.pagination.currentPage * $scope.pagination.perPage;
    },
    prevPage: function () {
      $scope.pagination.currentPage--;
    },
    nextPage: function () {
      $scope.pagination.currentPage++;
    }
  };

  $http.get("https://api.github.com/users/mbuchthal/gists", {
    headers: {
      "Authorization": "token " + token,
    }
  }).then(successHandler, errorHandler);

  function successHandler (response) {
    var data = response.data;
    data = angular.isArray(data) ? data : [data];  //isArray is an angular method

    $scope.gists = response.data;
    $log.info("response", response);
  };

  function errorHandler(response) {
    $log.error("response", response);
  };

  // function deleteG


});


}());
