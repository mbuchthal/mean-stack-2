require("../app.js");
require("./offset.filter.js");

angular.module("blogapp").filter("pager", function ($filter) {
  return function(results, pagerObj) {
    var filteredResults;

    filteredResults = $filter("offset")(results, pagerObj.getOffset());
    filteredResults = $filter("limitTo")(filteredResults, pagerObj.perPage);
    console.log(filteredResults);
    return filteredResults;

  };
});
