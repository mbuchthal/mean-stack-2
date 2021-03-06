require("angular");
require("angular-route");


(function () {
  "use strict";

  var app = angular.module("blogapp", ["gisty.config", "ngRoute"]);

  app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/blogs", {
      templateUrl: "partials/blogs/blogs_list.html",
      controller: "BlogsCtrl as vm",
    })
    .when("/blogs/new", {
      templateUrl: "partials/blogs/blog_form.html",
      controller: "BlogFormCtrl as vm",
    })
    .when("/blogs/edit/:gist_id", {
      templateUrl: "partials/blogs/blog_edit_form.html",
      controller: "BlogCtrl as vm",
    })
    .when("/blogs/:gist_id", {
      templateUrl: "partials/blogs/blog_details.html",
      controller: "BlogCtrl as vm",
    })
    .otherwise({
      redirectTo: "/blogs"
    });
  }]);
}());
