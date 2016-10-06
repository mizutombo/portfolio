(function(module) {
  var githubObj = {};

  objGitHub.allGitHub = [];

  objGitHub.requestGitHub = function(callback) {
    $.ajax({
      url: '/github/users/mizutombo/repos' +
            '?per_page=10&sort=updated'),
      success: function(data) {
        objGitHub.allGitHub = data;
        callback();
      }
    });
  };

objGitHub.withAttribute = function(myAttr) {
  return objGitHub.allGitHub.filter(function(attrGitHub) {
    return attrGitHub[myAttr];
  });
};

  module.objGitHub = objGitHub;
})(window);
