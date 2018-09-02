const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js");

const Films = function(url){
  this.url = url;
  this.films = [];
  this.filmDirectors = [];
};

Films.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (event)  => {
    const directorIndex = event.detail;
    this.publishFilmsByDirector(directorIndex);
  })
};

Films.prototype.getData = function(){
  const requestHelper = new RequestHelper(this.url);
  requestHelper.get()
  .then(data => this.handleData(data))
  .catch((err) => {
    console.error(err);
  });
}

Films.prototype.handleData = function(data){
  this.films = data;
  PubSub.publish('Films:film-data-ready', this.films);
  this.publishDirectorsFilms(this.films);
}

Films.prototype.publishDirectorsFilms = function(data) {
  this.filmDirectors = this.uniqueDirectorList();
  PubSub.publish('Films:selected-films-ready', this.filmDirectors);
}

Films.prototype.directorFilmsList = function() {
  const fullList = this.films.map(film => film.director);
  return fullList;
}

Films.prototype.uniqueDirectorList = function() {
  return this.directorFilmsList().filter((film, index, array) => {
    return array.indexOf(film) === index;
  });
}

Films.prototype.filmsByDirector = function(directorIndex) {
  const selectedDirector = this.filmDirectors[directorIndex];
  return this.films.filter((film) => {
    return film.director === selectedDirector;
  });
};

Films.prototype.publishFilmsByDirector = function(directorIndex) {
  const foundFilms = this.filmsByDirector(directorIndex);
  PubSub.publish('Films:film-data-ready', foundFilms);
};

module.exports = Films;
