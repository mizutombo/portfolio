function Project (opts) { // new AJAX code
  for (keys in opts) {
    this[keys] = opts[keys];
  }
}

var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.developer = opts.developer;
  this.developerUrl = opts.developerUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
};

// Incorporate handlebars.js into code
Project.prototype.toHtml = function() {
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);

  return html;
};

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
