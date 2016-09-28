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
  console.log(element);
  //push contents of projects into array
});

projects.forEach(function(project) {
  $('#project').append(project.toHtml());
  console.log(project);
  //populate contents of projects via append onto section with id='project'
});
