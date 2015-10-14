require("angular");
require("angular-route");

(function () {
  var app = angular.module("gisty", []);

  angular.module("gisty").filter("offset", function($filter){
    return function(input, start){
      if(input){
        start = parseInt(start, 10);
        return input.slice(start);
      }
    };
  });

  angular.module("gisty").filter("pager", function($filter){
    return function(results, pagerOb){
      var filteredResults;

      filteredResults = $filter("offset")(results, pagerObj.getOffset());
      filteredResults = $filter("limitTo")(filteredResults, pager.perPage);
      return filteredResults;
    };
  });

  app.controller("GistsCtrl", ["$scope", "$http", function($scope, $http){
    
    $scope.pagination = {
      currentPage: 1,
      perPage: 5,
      getOffset: function(){
        return $scope.pagination.currentPage * $scope.pagination.perPage;
      },
      prevPage: function(){}
    };

    $http.get("https://api.github.com/users/bentongreen/gists", {
      headers: {
        "Authorization": "token ",
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
