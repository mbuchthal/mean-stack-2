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
              Authorization: "token " + token,
            }
          });
        } else {
          // return $http.get(urlRoot);
          console.warn();
        }
      },
      update: function (model) {
        return $http.patch(urlRoot + "/gists/" + model.id, model, {
          headers: {
            Authorization: "token " + token,

          }
        });
      },
      create: function (model) {
        return $http.post(urlRoot + "/gists", model, {
          headers: {
            Authorization: "token " + token,
          }
        });
      },
      delete: function (model) {
        return $http.delete(urlRoot + "/gists/" + model.id, {
          headers: {
            Authorization: "token " + token,
          }
        });
      }
    };
    return Blog;
  });
}());
