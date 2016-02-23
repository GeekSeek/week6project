// var indeedApp = {};

// indeedApp.apiURL = 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2'

// indeedApp.getInput = function(){
// 	$('#citySubmit').on('click', function(e){
// 		e.preventDefault();
// 		indeedApp.userCity = $('input[name="cityButton"]:checked').val();
// 		console.log(indeedApp.userCity);
// 		indeedApp.makeCall(indeedApp.userCity);
// 	});
// }


$(function() {
	$.ajax({
    url: 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2',
    method: 'GET',
    dataType: 'jsonp',
    data: {
    	format: 'json',
      l: 'toronto, ontario',
      q:'javascript',
      co:'CA',
      fromage: '15',
      limit:'30'
    }
  }).then(function(data){
  	console.log(data);
  })
});