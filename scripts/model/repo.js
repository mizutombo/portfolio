(function(module) {
  var gitAcct = {};
  gitAcct.callInfo = function(data) {
    $.ajax('https://api.github.com/', {
      Authorization: 'token ' + gitToken
    }
    })
    .done(function(data) {
      gitAcct = data;
      console.log(data);
    });
  };

  module.gitAcct = gitAcct;
})(window);

window.gitAcct.callInfo();
