const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js");

const Films = function(url){
  this.url = url;
  this.films = [];
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
  PubSub.publish("Films:films-data-ready", this.films);
  console.log(data);
}

module.exports = Films;
