(function(module){

function Project (opts) {
  for (keys in opts) {
    this[keys] = opts[keys];
  }
};

Project.all = [];

// Incorporate handlebars.js into code
Project.prototype.toHtml = function(headScriptTemplate) {
  var source = $(headScriptTemplate).html();
  var template = Handlebars.compile(source);
  var html = template(this); // 'this' is context for this handlebars.js template
  return html;
};

Project.loadAll = function(dataToPassIn) {
  dataToPassIn.sort(function(currentElement, nextElement) {
    return (new Date(nextElement.publishedOn)) - (new Date(currentElement.publishedOn));
  }).forEach(function(element) {
    Project.all.push(new Project(element));
  });
};

Project.fetchAll = function() {
  if (localStorage.blogProjects) {
    // retrieve data from local storage, if available
    var localStoredData = JSON.parse(localStorage.getItem("blogProjects"));
    console.log('data in local storage', localStoredData);
    Project.loadAll(localStoredData);
    projectView.renderIndexPage();
  } else {
    // if data is not in local storage, call Ajax to pull data from blogProjects.json
    $.ajax({
      url: "/data/blogProjects.json",
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
  }
    console.log('calling Ajax the man');
};

// retrieve & render data from blogProjects.json
function successHandler(data) {
  localStorage.setItem("blogProjects", JSON.stringify(data));
  Project.loadAll(data);
  projectView.renderIndexPage();
  projectView.setTeasers();
  console.log('Data:', data);
}

function errorHandler(error) {
  console.log('ERROR', error);
}
// call function 'fetchAll'
Project.fetchAll();

module.Project = Project;
})(window);
