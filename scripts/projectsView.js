(function(module){

  var projectView = {};

  projectView.populateFilters = function() {
    $('article').each(function() {
      var developer;
      var category;
      var optionTag;

      developer = $(this).find('div').attr('data-developer'); // retrieves text
      console.log(developer);
      optionTag = '<option value = "' + developer + '">' + developer + '</option>';
      if ($('#developer-filter option[value = "' + developer + '"]').length === 0) {
        $('#developer-filter').append(optionTag);
        // populates Developer name for pull-down selector and appends via option tag, without duplicating Developer name in selector
      }
      category = $(this).find('div').attr('data-category'); // retrieves attribute and value
      optionTag = '<option value = "' + category + '">' + category + '</option>';
      if ($('#category-filter option[value = "' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
        // populates Project Category name for pull-down selector and appends via option tag, without duplicating Project Category name in selector
      }
    });
  };

  projectView.handleDeveloperFilter = function() {
    $('#developer-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide(); // upon filter item change-click, hide all projects in 'article'
        var $same = $(this).val();
        $('article').each(function() {
          if ($same === $(this).find('div').attr('data-developer')) { // retrieves text
            $(this).fadeIn(); // fade into 'article' view the click-selected item
          }
        });
      } else {
        $('article').show(); // if no filter item is selected, show all projects
      }
      $('#category-filter').val('');
    });
  };

  projectView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide(); // upon filter item change-click, hide all projects in 'article'
        var $same = $(this).val();
        $('article').each(function() {
          if ($same === $(this).find('div').attr('data-category')) {
            // retrieves attribute and value
            $(this).fadeIn();
            // fade into 'article' view the click-selected item
          }
        });
      } else {
        $('article').show();
        // if no filter item is selected, show all projects
      }
      $('#developer-filter').val('');
    });
  };

  projectView.handleMainNav = function () {
    $('.main-nav').on('click', '.tab', function(event) {
      event.preventDefault();
      $('.tab-content').hide();
      // upon click of any navigation link, hide all '.tab-content' items ... i.e. hide all projects and contents of "About" page
      var $selectedItem = $(this).data('content');
      $('#' + $selectedItem).fadeIn();
      // fade in page linked to click-selected navigation link
    });
    $('.main-nav .tab:first').click();
    //calls jQuery event on navigation
  };

  projectView.setTeasers = function() {

    $('.project-body *:nth-of-type(n+2)').hide();

    $('.read-on').on('click', function(event) {
      event.preventDefault();
      $(this).parent().find('.project-body *:nth-of-type(n+2)').fadeIn();
    });
  };

  projectView.renderIndexPage = function() {
    console.log('render index page');
    console.log('Project.all', Project.all);
    Project.all.forEach(function(project){
      // append project contents into '#projects-post'
      $('#projects-post').append(project.toHtml('#project-template'));
      // check for duplicate values in developer drop-down selector
      if($('#developer-filter option:contains("'+ project.developer + '")').length === 0) {
        // append developer names into '#developer-filter'
        $('#developer-filter').append(project.toHtml('#developer-template'));
      }
      // check for duplicate values in category drop-down selector
      if($('#category-filter option:contains("'+ project.category + '")').length === 0) {
        // append category names into '#category-filter'
        $('#category-filter').append(project.toHtml('#category-template'));
      }
    });
  };

  projectView.populateFilters();
  projectView.handleDeveloperFilter();
  projectView.handleCategoryFilter();
  projectView.handleMainNav();

  module.projectView = projectView;
})(window);
