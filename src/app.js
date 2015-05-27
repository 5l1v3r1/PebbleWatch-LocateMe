/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'LocateMe',
  icon: 'images/menu_icon.png',
  subtitle: 'Where am I?',
  body: 'v 1.0'
});

main.show();

main.on('click', 'select', function(e) {
  
   var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};
  
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
  
function locationSuccess(pos) {
var ajax = require('ajax');
ajax({ url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&key=AIzaSyAIxdxt8V1mpBqkRf5zbCZkjA6Qj0HAkPw', type: 'json' },
 
  function(data) {
  var card = new UI.Card({
    fullscreen: true,});
  card.title('You \'re here');
  card.body(data.results[0].formatted_address);
  card.show();

  }
);
  
  
}

function locationError(err) {

  var card2 = new UI.Card();
  card2.title('LocateMe');
  card2.body("Error: Look's like Geolocation is disabled.");
  card2.show();
}




  });
main.on('click', 'up', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'By OpenSecurity',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('About');
  card.subtitle('LocateMe');
  card.body('LocateMe just locates you :) ');
  card.show();
});
