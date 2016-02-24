var geekseek = {};

geekseek.apiURL = 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2'

geekseek.getInput = function(){
	$('#citySubmit').on('click', function(e){
		e.preventDefault();
		userCity = $('input[name="cityButton"]:checked').val();
		console.log(userCity);
		geekseek.makeCall(userCity);
	});
}


geekseek.makeCall = function(cityName){
	$.ajax({
    url: 'http://api.indeed.com/ads/apisearch?publisher=6808461958676807&v=2',
    method: 'GET',
    dataType: 'jsonp',
    data: {
    	format: 'json',
      l: cityName,
      q:'javascript',
      co:'CA',
      fromage: '15',
      limit:'30',
      // salary:'100000',
      expired:'false',
      sr:'directhire',
      // as_and:'junior',
      // as_any:'HTML+CSS+JavaScript'
    }
  }).then(function(data){
  	console.log(data);
  });
}

$(document).ready(function(){
  geekseek.getInput();
})