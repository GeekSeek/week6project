var geek = {};

geek.apiURL = 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2'

// On submit, grab city from user input text field
// Pass city into Indeed ajax call

geek.getInput = function(){
	$('#firstSearch').on('submit', function(e){
		e.preventDefault();
		geek.userCity = $('input[name="userCity"]').val();
		console.log(geek.userCity);
		geek.makeCall(geek.userCity);
    // geek.makeSortedCall(geek.userCity);
    $('header').slideUp(1000);
	   });
}

// FIRST ajax call

geek.makeCall = function(cityName){
	$.ajax({
    url: 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2',
    method: 'GET',
    dataType: 'jsonp',
    data: {
    	format: 'json',
      l: geek.userCity,
      q:'junior front-end developer',
      co:'CA',
      psf: 'advsrch',
      as_phr: '',
      fromage: '30',
      limit:'10',
      sort: 'date',
      highlight: 0,
      salary:'',
      as_not:'',
      as_ttl:'',
      as_cmp:'',
      jt: 'all',
      st: '',
      radius: '50',
      sr: 'directhire',
      expired:'false',
      as_and:'',
      as_any:'HTML+CSS+JavaScript'
    }
  }).then(function(data){
    geek.fullObject = data;
  	console.log(data.results);
    geek.displayResults(data.results);
  });
}

// Display results in handlebar template
geek.displayResults = function(results) {
  var resultsHtml = $('#resultListTemplate').html();
  var resultsTemplate = Handlebars.compile(resultsHtml);
  if (geek.fullObject.totalResults < 10) {
    $('#loadMore').hide();
  } else {
    $('#loadMore').show();
  }
  results.forEach(function(jobPost) {
    // console.log(jobPost);
    $('section.results .listContainer').append(resultsTemplate(jobPost));
  });
  $('#userCity2').attr('value', geek.userCity);
};

$('#secondSearch').on('submit', function(e) {
  e.preventDefault();
  geek.userCity = $('#userCity2').val();
  if ($('#agency').is(":checked")) {
    geek.agency = 'employer';
  } else {
    geek.agency = '';
  };
  if ($("#sort").is(":checked")) {
    geek.sortResults = 'date';
  } else {
    geek.sortResults = '';
  };
  console.log(geek.userCity);
  // make a call that will display the results sorted by date posted instead of relevance
    $.ajax({
      url: 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2',
      method: 'GET',
      dataType: 'jsonp',
      data: {
        format: 'json',
        l: geek.userCity,
        q:'junior front-end developer',
        co:'CA',
        psf: 'advsrch',
        as_phr: '',
        sort: geek.sortResults,
        fromage: '30',
        limit:'10',
        salary:'',
        as_not:'',
        as_ttl:'',
        as_cmp:'',
        jt: 'all',
        st: '',
        radius: '50',
        sr: geek.agency,
        expired:'false',
        as_and:'',
        as_any:'HTML+CSS+JavaScript'
      }
    }).then(function(sortedData){
      console.log(sortedData);
      console.log(geek.agency);
      console.log(geek.sortResults);
      geek.filterResults(sortedData.objects);
  });
});


//make a call with staffing agencies included. Default search will only include direct hires


geek.filterResults = function(sortedData) {
  console.log('works!');
}

// SECOND ajax call

$('#loadMore').on('click', function(e){
  e.preventDefault();
  var listSection = $(this).attr('value');
  var stringAsNumber = parseInt(listSection);
  var newSearch = stringAsNumber + 10;
    $.ajax({
    url: 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2',
    method: 'GET',
    dataType: 'jsonp',
    data: {
      format: 'json',
      l: geek.userCity,
      q:'junior front-end developer',
      co:'CA',
      psf: 'advsrch',
      as_phr: '',
      sort: geek.sortResults,
      fromage: '30',
      limit:'10',
      start: listSection,
      salary:'',
      as_not:'',
      as_ttl:'',
      as_cmp:'',
      jt: 'all',
      st: geek.agency,
      radius: '50',
      sr: '',
      expired:'false',
      as_and:'',
      as_any:'HTML+CSS+JavaScript'
    }
  }).then(function(data){
    geek.fullObject = data;
    console.log(data);
    $('#loadMore').attr('value', newSearch);
    geek.hideButton(newSearch);
  });
});

geek.hideButton = function(newSearch) {
  console.log(newSearch);
  if (geek.fullObject.totalResults < newSearch) {
      $('#loadMore').hide();
    } else {
      $('#loadMore').show();
    }
   geek.displayMoreResults(geek.fullObject.results);
}

geek.displayMoreResults = function(results) {
  var resultsHtml = $('#resultListTemplate').html();
  var resultsTemplate = Handlebars.compile(resultsHtml);
  $('section.results .listContainer').empty();
  results.forEach(function(jobPost) {
    // console.log(jobPost);
    $('section.results .listContainer').append(resultsTemplate(jobPost));
  });
  $('html, body').animate ({
    scrollTop: $("#results").offset().top},1000);
}


// Geolocate user's current location. Pass coordinates into getGoogle ajax call to return city and province

var gps = navigator.geolocation.getCurrentPosition(
 function (position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  position = (lat + ', ' + lng);
  console.log(position);
  geek.getGoogle(position);
   });

geek.getGoogle = function (query){
  $.ajax({
    url:"https://maps.googleapis.com/maps/api/geocode/json",
    type:'GET',
    dataType:'json',
    data: {
      latlng: query
    }
    }).then(function(answer){
        var autoCity = answer.results[0].address_components[4].long_name;
        var autoProv = answer.results[0].address_components[6].short_name;
      console.log(answer);
      console.log(autoProv);
      // Auto-populate city and province into user input field
      $('#userCity').attr("value", autoCity + ", " + autoProv);
  });
}


$(document).ready(function(){
  geek.getInput();
})