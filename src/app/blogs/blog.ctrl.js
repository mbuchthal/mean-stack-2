
require("../app.js");

// angular.module("blogapp").controller("BlogCtrl", function (BlogsService, $routeParams) {
//   var vm = this;

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

  // initialize();

  // function initialize() {
  //   BlogsService
  //     .get($routeParams.blog_id)
  //     .then(function (resp) {
  //       // vm.blog = resp.data;

  //       console.log(resp);

  //       vm.blog = {};
  //       vm.blog.content = '';

  //       for (files in resp.files) {
  //         vm.blog.content += resp.files[file].content;
  //       }

  //       vm.blog.date = resp.updated_at;
  //       vm.blog.author = resp.owner.login;

  //     });
  // }



