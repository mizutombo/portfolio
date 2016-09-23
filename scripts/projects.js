var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.developer = opts.developer;
  this.developerUrl = opts.developerUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
};

Project.prototype.toHtml = function() {

  /*Project.prototype.toHtml = function() {*/
   var source = $('#article-template').html();
   var template = Handlebars.compile(source);
   var html = template(this);

   return html;
  };


  /*var $newProject = $('#project.template').clone();
  $newProject.attr('data-category', this.category);
  $newProject.find('a').text(this.developer);
  $newProject.find('a').attr('href', this.developerUrl);
  $newProject.find('h1').text(this.title);
  $newProject.find('div.byLine').after(this.body);
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.removeAttr('class');*/

  //return $newProject;//
//};//

myLocalData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.publishedOn)) - (new Date(curElem.publishedOn));
});

myLocalData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#project').append(a.toHtml());
  $('#developer-filter').append('<option value ="' + a.developer + '">' + a.developer + '</option>');
  $('#category-filter').append('<option value ="' + a.category + '">' + a.category + '</option>');
});
