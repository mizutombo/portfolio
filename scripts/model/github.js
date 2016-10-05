(function(module) {
  var githubObj = {};

  objGitHub.allGitHub = [];

  objGitHub.requestGitHub = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/mizutombo/repos',
      headers: {Authorization: 'token ' + githubToken},
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
