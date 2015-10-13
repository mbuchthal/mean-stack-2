require("../app.js");
require('../github-adapter.js');

(function () {
  "use strict";

  angular.module("blogapp").service("BlogsService", ["$http", '$githubGist', function ($http, $githubGist) {
    var urlRoot = "/api/blogs";

    var Blog = {
      get: function (id) {
        if (angular.isDefined(id)) {
          return $githubGist(id).read();
        } else {
          //return $http.get(urlRoot);
          console.warn('root url');
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
  }]);
}());
