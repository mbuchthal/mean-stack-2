require("../app.js");


(function () {
  "use strict";

  angular.module("blogapp").service("BlogsService", function ($http, token) {
    var urlRoot = "https://api.github.com";

    var Blog = {
      get: function (id) {
        if (angular.isDefined(id)) {
          return $http.get(urlRoot + "/gists/" + id, {
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
        return $http.post(urlRoot + "/gists", model, {
          headers: {
            "Authorization": "token " + token,
          }
        });
      },
      delete: function (model) {
        return $http.delete(urlRoot + "/gists/" + model._id,  {
          headers: {
            Authorization: "token " + token,
          }
        });
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
