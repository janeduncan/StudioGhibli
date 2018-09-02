const PubSub = require('../helpers/pub_sub');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:selected-films-ready', (event) => {
    this.populateSelect(event.detail)
  });

  this.selectElement.addEventListener('change', (event) => {
    const selectedIndex = event.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populateSelect = function (directors) {
  directors.forEach((directors, index) => {
    const option = this.createDirectorsOption(directors, index);
    this.selectElement.appendChild(option);
  });
};

SelectView.prototype.createDirectorsOption = function (directors, index) {
  const option = document.createElement('option');
  option.textContent = directors;
  option.value = index;
  return option;
};

module.exports = SelectView;
