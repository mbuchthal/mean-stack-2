require("../app.js");


(function () {
  "use strict";

  angular.module("blogapp").service("BlogsService", function ($http, token) {
    var urlRoot = "/api/blogs";

    var Blog = {
      get: function (id) {
        if (angular.isDefined(id)) {
          return $http.get("https://api.github.com/gists/" + id, {
              headers: {
                "Authorization": "token " + token,
              }
          });
        } else {
          // return $http.get(urlRoot);
          console.warn();
        }
      },
      update: function (model) {
        return $http.put(urlRoot + "/" + model._id, model);
      },
      create: function (model) {
        return $http.post(urlRoot, model);
      },
      delete: function (model) {
        return $http.delete(urlRoot + "/" + model._id);
      }
    };
    return Blog;
  });
}());



  // $http.get("https://api.github.com/users/toalina/gists", {
  //   headers: {
  //     "Authorization": "token " + token,
  //   }
  // }).then(successHandler, errorHandler);
