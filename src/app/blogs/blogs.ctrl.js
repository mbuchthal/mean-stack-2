require("../app.js");

(function () {
  "use strict";

  // angular.module("blogapp").controller("BlogsCtrl", ["BlogsService", function (BlogsService) {

angular.module("blogapp").controller("BlogsCtrl", function ($scope, $http, $log, token) {
  $http.get("https://api.github.com/users/toalina/gists", {
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

});

//     var vm = this;

//     vm.blogs = [];
//     vm.delete = deleteBlog;

//     initialize();

//     function initialize () {
//       getBlogs();
//     }

//     function getBlogs () {
//       BlogsService.get().then(function (resp) {
//         vm.blogs = resp.data;
//       });
//     }

//     function deleteBlog (blog) {
//       BlogsService.delete(blog).then(function () {
//         getBlogs();
//       });
//     }
//   }]);
}());
