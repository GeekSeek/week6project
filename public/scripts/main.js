'use strict';

var geek = {};

geek.apiURL = 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2';

geek.getInput = function () {
  $('#citySubmit').on('click', function (e) {
    e.preventDefault();
    userCity = $('input[name="cityButton"]:checked').val();
    console.log(userCity);
    geek.makeCall(userCity);
  });
};

geek.makeCall = function (cityName) {
  $.ajax({
    url: 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2',
    method: 'GET',
    dataType: 'jsonp',
    data: {
      format: 'json',
      l: cityName,
      q: 'junior front-end developer',
      co: 'CA',
      psf: 'advsrch',
      as_phr: '',
      fromage: '15',
      limit: '50',
      salary: '',
      as_not: '',
      as_ttl: '',
      as_cmp: '',
      jt: 'all',
      st: '',
      radius: '50',
      sr: 'directhire',
      expired: 'false',
      as_and: 'telecommute',
      as_any: 'HTML+CSS+JavaScript'
    }
  }).then(function (data) {
    console.log(data);
  });
};

var gps = navigator.geolocation.getCurrentPosition(function (position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  position = lat + ', ' + lng;
  console.log(position);
  geek.getGoogle(position);
});

geek.getGoogle = function (query) {
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    type: 'GET',
    dataType: 'json',
    data: {
      latlng: query
    }
  }).then(function (answer) {
    var autoCity = answer.results[0].address_components[4].long_name;
    var autoProv = answer.results[0].address_components[6].short_name;
    console.log(answer);
    console.log(autoProv);
    $('#userCity').attr("value", autoCity);
    $('#provinces').attr("value", autoProv);
    if (autoProv === 'ON') {
      $('#ON').attr("selected", "selected");
    }
  });
};

$(document).ready(function () {
  geek.getInput();
  console.log(gps);
});