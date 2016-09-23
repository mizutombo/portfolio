var projectView = {};

projectView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var developerName, category, optionTag;

    developerName = $(this).find('address a').text();
    optionTag = '<option value = "' + developerName + '">' + developerName + '</option>';
    $('#developer-filter').append(optionTag);

    category = $(this).attr('data-category');
    optionTag = '<option value = "' + category + '">' + category + '</option>';

    if ($('#category-filter option[value = "' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

projectView.handleDeveloperFilter = function() {
  $('#developer-filter').on('change', function() {
    if ($(this).val()) {
      $('#project').hide();
      var $same = $(this).val();
      $('#project').each(function() {
        if ($same === $(this).find('address a').text()) {
          $(this).fadeIn();
        }
      });

    } else {
      $('#project').not('.template').show();
    }
    $('#category-filter').val('');
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('#project').hide();
      var $same = $(this).val();
      $('#project').each(function() {
        if ($same === $(this).attr('data-category')) {
          $(this).fadeIn();
        }
      });
    } else {
      $('#project').not('.template').show();
    }
    $('#developer-filter').val('');
  });
};

projectView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function(event) {
    event.preventDefault();
    $('.tab-content').hide();
    var $selectedItem = $(this).data('content');
    $('#' + $selectedItem).fadeIn();
  });

  $('.main-nav .tab:first').click();
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
