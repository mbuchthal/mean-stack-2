

require("../app.js");

angular.module("blogapp").controller("BlogCtrl", ["BlogsService", "$routeParams", function (BlogsService, $routeParams) {
  var vm = this;

  initialize();

  function initialize() {
    BlogsService
      .get($routeParams.blog_id)
      .then(function (resp) {
        console.log(resp);

        vm.blog = {};
        vm.blog.content = '';
        for(file in resp.files) {
          vm.blog.content += resp.files[file].content;
        }

        vm.blog.date = resp.updated_at;
        vm.blog.author = resp.owner.login;
      });
  }
}]);