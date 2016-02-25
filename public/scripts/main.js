'use strict';

var geek = {};

geek.apiURL = 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2';

// On submit, grab city from user input text field
// Pass city into Indeed ajax call

geek.getInput = function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    geek.userCity = $('input[name="userCity"]').val();
    console.log(geek.userCity);
    geek.makeCall(geek.userCity);
    geek.makeSortedCall(geek.userCity);
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
      fromage: '30',
      limit: '50',
      // sort: 'date',
      highlight: 0,
      salary: '',
      as_not: '',
      as_ttl: '',
      as_cmp: '',
      jt: 'all',
      st: '',
      radius: '50',
      sr: 'directhire',
      expired: 'false',
      as_and: '',
      as_any: 'HTML+CSS+JavaScript'
    }
  }).then(function (data) {
    console.log(data.results);
    geek.displayResults(data.results);
  });
};

// Display results in handlebar template
geek.displayResults = function (results) {
  console.log(results);
  var resultsHtml = $('#resultListTemplate').html();
  var resultsTemplate = Handlebars.compile(resultsHtml);
  results.forEach(function (jobPost) {
    // console.log(jobPost);
    $('section.results').append(resultsTemplate(jobPost));
  });
};

//make a call that will display the results sorted by date posted instead of relevance
geek.makeSortedCall = function (cityName) {
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
      sort: 'date',
      fromage: '30',
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
      as_and: '',
      as_any: 'HTML+CSS+JavaScript'
    }
  }).then(function (sortedData) {
    console.log(sortedData);
    geek.filterResults(sortedData.objects);
  });
};
//make a call with staffing agencies included. Default search will only include direct hires

geek.filterResults = function (sortedData) {
  console.log('works!');
};

// Geolocate user's current location. Pass coordinates into getGoogle ajax call to return city and province

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
    // Auto-populate city and province into user input field
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