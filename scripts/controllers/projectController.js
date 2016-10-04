(function(module) {
  var projectController = {};

  projectController.reveal = function() {
    $('.tab-content').hide();
    $('#project').show();
  };

  module.projectController = projectController;
})(window);
