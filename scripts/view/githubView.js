(function(module) {
  var githubView = {};

  var source = $('#github-template').text();
  var githubCompiler = Handlebars.compile(source);

  githubView.renderGitHub = function() {
    $('#about ul').empty().append(
      objGitHub.withAttribute('fork')
      .map(githubCompiler)
    );
  };

  objGitHub.requestGitHub(githubView.renderGitHub);

  module.githubView = githubView;
})(window);
