require("angular");
require("angular-route");

(function () {
  var app = angular.module("gisty", []);

  app.controller("GistsCtrl", ["$scope", "$http", function($scope, $http){
    $http.get("https://api.github.com/users/bentongreen/gists", {
      headers: {
        "Authorization": "token dc876ebb349102594a6e6e25193a3f7d5bca1a8a",
      }
    }).then(successHandler, errorHandler);

    function successHandler(response){
      var data = response.data;
      data = angular.isArray(data) ? data: [data];

      $scope.gists = response.data;
      console.info("repsonse", response);
    }

    function errorHandler(response){
      console.info("repsonse", response);
      $scope.error = response.data;
    }

    $scope.message = "hello gisty";
  }]);

 /* var app = angular.module("blogapp", ["ngRoute"]);

  app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/blogs", {
      templateUrl: "partials/blogs/blogs_list.html",
      controller: "BlogsCtrl as vm",
    })
    .when("/blogs/new", {
      templateUrl: "partials/blogs/blog_form.html",
      controller: "BlogFormCtrl as vm",
    })
    .when("/blogs/:blog_id/edit", {
      templateUrl: "partials/blogs/blog_form.html",
      controller: "BlogFormCtrl as vm",
    })
    .when("/blogs/:blog_id", {
      templateUrl: "partials/blogs/blog_details.html",
      controller: "BlogCtrl as vm",
    })
    .otherwise({
      redirectTo: "/blogs"
    });
  }]); */
}());
