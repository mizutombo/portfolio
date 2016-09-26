var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.developer = opts.developer;
  this.developerUrl = opts.developerUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
};

//Project.prototype.toHtml = function() {
/* incorporate handlebars.js into code
  var source = $('#article-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);

  return html;
}; */

Project.prototype.toHtml = function() {
var $newProject = $('article.template').clone();
$newProject.removeAttr('class');

$newProject.attr('data-category', this.category);
$newProject.find('a:first').text(this.developer);
$newProject.find('a').attr('href', this.developerUrl);
$newProject.find('h2').text(this.title); // return project title into <h2></h2> spot
$newProject.find('h3').text(this.category); // return project category into <h3></h3> spot
$newProject.find('time[pubdate]').attr('title', this.publishedOn);
$newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
$newProject.find('h3.project-body').html(this.body); // return project description html into <h4></h4> spot

return $newProject;
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
