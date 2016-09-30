(function(module){

function Project (opts) {
  for (keys in opts) {
    this[keys] = opts[keys];
  }
};

/*var projects = [];*/

Project.all = [];

/*function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.developer = opts.developer;
  this.developerUrl = opts.developerUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
};*/

// Incorporate handlebars.js into code
Project.prototype.toHtml = function() {
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);
  return html;
};

/*Article.prototype.toHtml = function(scriptTemplateId) {
  var template = Handlebars.compile($(scriptTemplateId).text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);
  return template(this);
};*/

Project.loadAll = function(dataToPassIn) {
  dataToPassIn.sort(function(currentElement, nextElement) {
    return (new Date(nextElement.publishedOn)) - (new Date(currentElement.publishedOn));
  }).forEach(function(element) {
    Project.all.push(new Project(element));
  });
};

Project.fetchAll = function() { /* retrieve data from local storage, if available */
  if (localStorage.blogProjects) {
    var localStoredData = JSON.parse(localStorage.getItem('blogProjects'));
    console.log('data in local storage', localStoredData);
    Project.loadAll(localStoredData);
    projectView.renderIndexPage(); // retrieve & render data from blogProjects.json
  } else {

    $.ajax({ /* if data not in local storage, call Ajax */
      url: '/data/blogProjects.json',
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
  }
    console.log('calling Ajax the man');
};

function successHandler(data) {
  localStorage.setItem('/data/blogProjects.json', JSON.stringify(data));
  Project.loadAll(data);
  projectView.renderIndexPage(); // retrieve & render data from blogProjects.json
  console.log('Data:', data);
}
function errorHandler(error) {
  console.log('ERROR', error);
}

Project.fetchAll(); /* call function 'fetchAll'*/

module.Project = Project;
})(window);

/*
myLocalData.sort(function(currentElement, nextElement) {
  return (new Date(nextElement.publishedOn)) - (new Date(currentElement.publishedOn));
});

myLocalData.forEach(function(element) {
  projects.push(new Project(element));
});

projects.forEach(function(project) {
  $('#project').append(project.toHtml());
  //populate contents of projects via append onto section with id='project'
});
*/
