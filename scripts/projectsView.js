var projectView = {};

projectView.populateFilters = function() {
  $('article').not('.template').each(function() { // "not('.template')" enables new projects to be added into 'article', together with associated population of pull-down selector names for new Developer and new Project Category
    var developer;
    var category;
    var optionTag;

    developer = $(this).find('address a').text(); // retrieves text
    optionTag = '<option value = "' + developer + '">' + developer + '</option>';
    if ($('#developer-filter option[value = "' + developer + '"]').length === 0) {
      $('#developer-filter').append(optionTag); // populates Developer name for pull-down selector and appends via option tag, without duplicating Developer name in selector
    }
    category = $(this).attr('data-category'); // retrieves attribute and value
    optionTag = '<option value = "' + category + '">' + category + '</option>';
    if ($('#category-filter option[value = "' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag); // populates Project Category name for pull-down selector and appends via option tag, without duplicating Project Category name in selector
    }
  });
};

$('article.template').hide(); // hide project list format template

projectView.handleDeveloperFilter = function() {
  $('#developer-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide(); // upon filter item change-click, hide all projects in 'article'
      var $same = $(this).val();
      $('article').each(function() {
        if ($same === $(this).find('address a').text()) { // retrieves text
          $(this).fadeIn(); // fade into 'article' view the click-selected item
        }
      });
    } else {
      $('article').not('.template').show(); // if no filter item is selected, show all projects
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
        if ($same === $(this).attr('data-category')) { // retrieves attribute and value
          $(this).fadeIn(); // fade into 'article' view the click-selected item
        }
      });
    } else {
      $('article').not('.template').show(); // if no filter item is selected, show all projects
    }
    $('#developer-filter').val('');
  });
};

projectView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function(event) {
    event.preventDefault();
    $('.tab-content').hide(); // upon click of any navigation link, hide all '.tab-content' items ... i.e. hide all projects and contents of "About" page
    var $selectedItem = $(this).data('content');
    $('#' + $selectedItem).fadeIn(); // fade in page linked to click-selected navigation link
  });
  $('.main-nav .tab:first').click(); //calls jQuery event on navigation
};

projectView.setTeasers = function() {

  $('.project-body *:nth-of-type(n+2)').hide();

  $('.read-on').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('.project-body *:nth-of-type(n+2)').fadeIn();
  });
};

projectView.populateFilters();
projectView.handleDeveloperFilter();
projectView.handleCategoryFilter();
projectView.handleMainNav();
projectView.setTeasers();
