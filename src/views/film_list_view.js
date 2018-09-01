const PubSub = require("../helpers/pub_sub.js");
const FilmView = require("./film_view.js");

const FilmListView = function(container){
  this.container = container;
}

FilmListView.prototype.bindEvents = function(){
  PubSub.subscribe("Films:films-ready", (event) => {
    this.films = event.detail;
    this.clearList();
    this.render();
  })
}

FilmListView.prototype.clearList = function() {
  this.container.innerHTML = '';
}

FilmListView.prototype.render = function() {
  this.films.forEach((film) => {
    const filmView = new FilmView(this.container, film);
    filmView.render();
  })
}

module.exports = FilmListView;
