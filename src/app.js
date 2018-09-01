const Films = require("./models/films.js");
const FilmListView = require("./views/film_list_view.js");
const FilmView = require("./views/film_view.js");

document.addEventListener('DOMContentLoaded', () => {

  const filmListContainer = document.querySelector("#films");
  const filmListView = new FilmListView(filmListContainer);
  filmListView.bindEvents();

  const films = new Films("https://ghibliapi.herokuapp.com/films");
  films.getData();

})
