var geek = {};
geek.agency = '';
geek.sortResults = '';

geek.apiURL = 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2'

// On submit, grab city from user input text field
// Pass city into Indeed ajax call

geek.getInput = function(){
	$('#firstSearch').on('submit', function(e){
		e.preventDefault();
		geek.userCity = $('input[name="userCity"]').val();
		// console.log(geek.userCity);
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
      sort: '',
      highlight: 0,
      salary:'',
      as_not:'',
      as_ttl:'',
      as_cmp:'',
      jt: 'all',
      st: '',
      radius: '50',
      expired:'false',
      as_and:'',
      as_any:'HTML+CSS+JavaScript'
    }
  }).then(function(data){
    geek.totalResults = data.totalResults;
    // console.log(data);
    geek.displayResults(data.results);
  });
}

geek.displayButton = function(){
  if (geek.totalResults < 10) {
    $('#loadMore').hide();
  } else {
    $('#loadMore').show();
  }
}

// Display results in handlebar template
geek.displayResults = function(results) {
  // var resultsHtml = $('#resultListTemplate').html();
  // var resultsTemplate = Handlebars.compile(resultsHtml);
  // var resSnippet = results.snippet;
  console.log(results);
  $('.resultsNum').text('There are ' + geek.totalResults + ' job postings in your area.');
  // if (geek.fullObject.totalResults < 10) {
  //   $('#loadMore').hide();
  // } else {
  //   $('#loadMore').show();
  // }
  results.forEach(function(jobPost) {
    // $('section.results .listContainer').append(resultsTemplate(jobPost));
    // console.log(jobPost);
    var skillsList = $('<ul>').addClass('skillsList');
     if (/HTML/i.test(jobPost.snippet)){
      var skillHTML = $('<li>').addClass('skill').text('HTML');
       skillsList.append(skillHTML);
     }

     if (/CSS/i.test(jobPost.snippet)){
      var skillCSS = $('<li>').addClass('skill').text('CSS');
      skillsList.append(skillCSS);
     }

     if (/Ember/i.test(jobPost.snippet)){
      var skillEmber = $('<li>').addClass('skill').text('Ember');
      skillsList.append(skillEmber);
     }

     if (/JavaScript/i.test(jobPost.snippet)){
      var skillJavaScript = $('<li>').addClass('skill').text('JavaScript');
       skillsList.append(skillJavaScript);
     }

     if (/UX/i.test(jobPost.snippet)){
      var skillUX = $('<li>').addClass('skill').text('UX');
       skillsList.append(skillUX);
     }

     if (/Design/i.test(jobPost.snippet)){
      var skillDesign = $('<li>').addClass('skill').text('Design');
       skillsList.append(skillDesign);
     }

     if (/Backend/i.test(jobPost.snippet)){
      var skillBackend = $('<li>').addClass('skill').text('Back-end');
       skillsList.append(skillBackend);
     }

     if (/SASS/i.test(jobPost.snippet)){
      var skillSASS = $('<li>').addClass('skill').text('SASS');
       skillsList.append(skillSASS);
     }

    // var tagButtonContainer = $('<div>').addClass('tagButtonContainer').append(skill, link);
    
    // var snippet = $('<p>').addClass('snippet').text(jobPost.snippet);
    // var item = $('<li>').append(snippet);
    // var longDesc = $('<div>').addClass('longDesc').append(snippet, tagButtonContainer);
    // $('.tagButtonContainer').append(skill, link);
    // $('.resultList').append(item, tagButtonContainer);

    //append a list to resultList wrapper

    var link = $('<a>').attr('href', jobPost.url).text('Apply');
    var tagButtonContainer = $('<div>').addClass('tagButtonContainer').append(skillsList, link);

    var snippet = $('<p>').addClass('snippet').text(jobPost.snippet);
    var longDesc = $('<div>').addClass('longDesc').append(snippet, tagButtonContainer);

    var fromage = $('<h4>').addClass('fromage').text(jobPost.formattedRelativeTime);
    var location = $('<h4>').addClass('location').text(jobPost.formattedLocationFull);
    var company = $('<h4>').addClass('company').text(jobPost.company);
    var jobTitle = $('<h4>').addClass('jobTitle').text(jobPost.jobtitle);
    var shortDesc = $('<div>').addClass('shortDesc').append(jobTitle, company, location, fromage);
    
    var listItem = $('<li>').addClass('jobPosting').append(shortDesc, longDesc);
    $('.resultList').append(listItem);

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
        highlight: 0,
        limit:'10',
        salary:'',
        as_not:'',
        as_ttl:'',
        as_cmp:'',
        jt: 'all',
        st: geek.agency,
        radius: '50',
        expired:'false',
        as_and:'',
        as_any:'HTML+CSS+JavaScript'
      }
    }).then(function(sortedData){
      console.log(sortedData);
      console.log(geek.agency);
      console.log(geek.sortResults);
      geek.totalResults = sortedData.totalResults;
      $('.resultList').empty();
      geek.displayResults(sortedData.results);
      console.log(sortedData.totalResults);
      geek.displayButton();
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
      highlight:0,
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
    geek.totalResults = data.totalResults;
    console.log(data);
    $('#loadMore').attr('value', newSearch);
    geek.displayMoreResults(data.results);
    geek.hideButton(newSearch);
  });
});

geek.hideButton = function(newSearch) {
  console.log(newSearch);
  if (geek.totalResults < newSearch) {
      $('#loadMore').hide();
    } else {
      $('#loadMore').show();
    }
}

geek.displayMoreResults = function(results) {
  // var resultsHtml = $('#resultListTemplate').html();
  // var resultsTemplate = Handlebars.compile(resultsHtml);
  console.log(results);
  $('.resultList').empty();
  geek.displayResults(results);
  // results.forEach(function(jobPost) {
    // console.log(jobPost);
    // $('section.results .listContainer').append(resultsTemplate(jobPost));
  // });
  $('html, body').animate ({
    scrollTop: $("#results").offset().top - 140},1000);
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