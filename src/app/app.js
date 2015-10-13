require("angular");
require("angular-route");
require('./github-adapter.js');

(function () {
  "use strict";

  var app = angular.module("blogapp", ["ngRoute"]);
  var app = angular.module("blogapp", ["ngRoute", 'github-adapter']);

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
  }]);
}());
