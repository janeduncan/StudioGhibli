const Films = require("./models/films.js");
const FilmListView = require("./views/film_list_view.js");
const SelectView = require("./views/select_view.js");

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('select#director-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const filmListContainer = document.querySelector("#films");
  const filmListView = new FilmListView(filmListContainer);
  filmListView.bindEvents();

  const films = new Films("https://ghibliapi.herokuapp.com/films");
  films.bindEvents();
  films.getData();
})
