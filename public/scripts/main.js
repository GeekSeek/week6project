'use strict';

var geekseek = {};

geekseek.apiURL = 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2';

geekseek.getInput = function () {
  $('#citySubmit').on('click', function (e) {
    e.preventDefault();
    userCity = $('input[name="cityButton"]:checked').val();
    console.log(userCity);
    geekseek.makeCall(userCity);
  });
};

geekseek.makeCall = function (cityName) {
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

// var gps = navigator.geolocation.getCurrentPosition(
//  function (position) {
//   console.log(gps);
//    });

function success(position) {
  var crd = position.coords;

  console.log(crd);
};

$(document).ready(function () {
  geekseek.getInput();
});