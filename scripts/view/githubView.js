(function(module) {
  var githubView = {};

  var source = $('#github-template').text();
  var githubCompiler = Handlebars.compile(source);

  // retrieve and render json data from GitHub api, via .ajax call through objGitHub.requestGitHub callback function ... append retrieved json data into index.html code at #projects-post location.

  githubView.renderGitHub = function() {
    $('#projects-post ul').empty().append(
      objGitHub.withAttribute('fork')
      .map(githubCompiler)
    );
  };

  objGitHub.requestGitHub(githubView.renderGitHub);

  module.githubView = githubView;
})(window);
