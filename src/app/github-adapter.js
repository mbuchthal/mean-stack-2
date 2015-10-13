'use strict'

require('angular');
require('angular-cookies');

var Github = require('github-api');

angular.module('github-adapter', ['ng', 'ngCookies']).factory('$githubUser', [
  '$q', '$rootScope', function($q, $rootScope) {
    return function(user) {
      var userPromiseAdapter;
      userPromiseAdapter = {
        notifications: function() {
          var deferred;
          deferred = $q.defer();
          user.notifications(function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
          return deferred.promise;
       },
        gists: function() {
          var deferred;
          deferred = $q.defer();
          user.gists(function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
          return deferred.promise;
        },
        orgRepos: function(name) {
          var deferred;
          deferred = $q.defer();
          user.orgRepos(name, function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
          return deferred.promise;
        },
        orgs: function() {
          var deferred;
          deferred = $q.defer();
          user.orgs(function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
          return deferred.promise;
        },
        repos: function() {
          var deferred;
          deferred = $q.defer();
          user.repos(function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
          return deferred.promise;
        },
        show: function(username) {
          var deferred;
          deferred = $q.defer();
          user.show(username, function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
          return deferred.promise;
        },
        userGists: function(username) {
          var deferred;
          deferred = $q.defer();
          user.userGists(username, function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
          return deferred.promise;
        },
        userRepos: function(username) {
          var deferred;
          deferred = $q.defer();
          user.userRepos(username, function(err, data) {
            $rootScope.$apply(function() {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(data);
              }
            });
          });
         return deferred.promise;
        }
      };
      return userPromiseAdapter;
    };
  }
]).factory('$githubGist', [
  '$q', '$cookies', function($q, $cookies) {
    return function(gistId) {
      var gist, gistPromiseAdapter, github;
      github = new Github({
        token: $cookies.get('gh') || '9d5ec5f98c4536b3168a534e8439aa335943574d',
        auth: 'oauth'
      });
      gist = github.getGist(gistId);
      gistPromiseAdapter = {
        create: function(options) {
          var deferred;
          deferred = $q.defer();
          gist.create(options, function(err, res) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
          return deferred.promise;
        },
        "delete": function() {
          var deferred;
          deferred = $q.defer();
          gist["delete"](function(err, res) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
          return deferred.promise;
        },
        fork: function() {
          var deferred;
          deferred = $q.defer();
          gist.fork(function(err, gist) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(gist);
            }
          });
          return deferred.promise;
        },
        read: function() {
          var deferred;
          deferred = $q.defer();
          gist.read(function(err, gist) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(gist);
            }
          });
          return deferred.promise;
        },
        update: function(options) {
          var deferred;
          deferred = $q.defer();
          gist.update(options, function(err, gist) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(gist);
            }
          });
          return deferred.promise;
        }
      };
      return gistPromiseAdapter;
    };
  }
]).factory('$sassMeisterGist', [
  '$q', '$cookies', '$githubGist', function($q, $cookies, $githubGist) {
    return {
      create: function(scope, cb) {
        var content, files, sass;
        files = {};
        sass = scope.app.sass;
        sass = sass.replace(/(^\/\/ [\-]{3,4}\n(?:\/\/ .+\n)*\/\/ [\-]{3,4}\s*)*/, '');
        sass = "" + (buildFrontmatter(scope.app.dependencies)) + sass;
        files["SassMeister-input." + scope.app.syntax] = {
          content: sass
        };
        if (scope.app.css.length !== 0) {
          files['SassMeister-output.css'] = {
            content: scope.app.css
          };
        }
        if (scope.app.html) {
          files["SassMeister-input-HTML." + scope.app.htmlSyntax] = {
            content: scope.app.html
          };
          files['SassMeister-rendered.html'] = {
            content: scope.app.renderedHTML
          };
        }
        content = {
          description: 'Generated by SassMeister.com.',
          files: files
        };
        return $githubGist().create(content).then(cb);
      },
      update: function(id, scope, cb) {
        var content, ext, filename, files, sass;
        files = {};
        sass = scope.app.sass;
        sass = sass.replace(/(^\/\/ [\-]{3,4}\n(?:\/\/ .+\n)*\/\/ [\-]{3,4}\s*)*/, '');
        sass = "" + (buildFrontmatter(scope.app.dependencies)) + sass;
        if (scope.sassFileName.substr(-4, 4) !== scope.app.syntax) {
          files[scope.sassFileName] = {
            content: null
          };
          scope.sassFileName = "" + (scope.sassFileName.substr(0, scope.sassFileName.length - 4)) + scope.app.syntax;
        }
        files[scope.sassFileName] = {
          content: sass
        };
        files[scope.cssFileName] = {
          content: scope.app.css
        };
        if (scope.app.html) {
          if (!scope.htmlFileName) {
            scope.htmlFileName = "SassMeister-input-HTML." + scope.app.htmlSyntax;
          } else {
            filename = scope.htmlFileName.split('.');
            ext = filename.pop();
            if (ext !== scope.app.htmlSyntax) {
              files[scope.htmlFileName] = {
                content: null
              };
              scope.htmlFileName = (filename.join('.')) + "." + scope.app.htmlSyntax;
            }
          }
          files[scope.htmlFileName] = {
            content: scope.app.html
          };
          files[scope.renderedHtmlFileName] = {
            content: scope.app.renderedHTML
          };
        }
        content = {
          files: files
        };
        return $githubGist(id).update(content).then(cb);
      },
      fork: function(id, cb) {
        return $githubGist(id).fork().then(cb);
      }
    };
  }
]);