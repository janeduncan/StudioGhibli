const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js");

const Films = function(url){
  this.url = url;
  this.films = [];
  this.directors = [];
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
  PubSub.publish("Films:films-ready", this.films);
  this.publishDirectors(this.films);
}








Films.prototype.publishDirectors = function(data) {
  this.films = data;
  this.directors = this.uniqueDirectorList();
  PubSub.publish('Directors:directors-ready', this.directors);
  console.log(this.directors);
}

Films.prototype.directorList = function() {
  const fullList = this.films.map(film => film.director);
  return fullList;
  console.log(fullList);
}

Films.prototype.uniqueDirectorList = function() {
  return this.directorList().filter((film, index, array) => {
    return array.indexOf(film) === index;
  });
}











Films.prototype.filmsByDirector = function(directorIndex) {
  const selectedDirector = this.directors[directorIndex];
  return this.films.filter((film) => {
    return film.director === selectedDirector;
  });
};


Films.prototype.publishFilmsByDirector = function(directorIndex) {
  const foundFilms = this.filmsByDirector(directorIndex);
  PubSub.publish('Directors:directors-ready', foundFilms);
  console.log(foundFilms);
};








module.exports = Films;
