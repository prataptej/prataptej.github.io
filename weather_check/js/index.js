$('#result').hide();
$('#loading').hide();
  $('document').ready(function(){

    var cities = data;
    console.log(cities);
    for (var i = 0; i < cities.length; i++) {
      $('#cityname').append('<option value="'+cities[i].NAME_2+'">'+cities[i].NAME_2+', '+cities[i].NAME_1+'</option>');
    }
    $('#cityname').select2();
    $('#get').click(function(){
      $('#result').hide();
      var cityname = $('#cityname').val();
      var key = 'f238e6196998247ae7cbaff0e7a124c1';
      $('#loading').html('<div class="w-25 mx-auto"><img class="img-fluid mx-auto" height="150px"  src="images/loader.gif" /> <small class="text-center text-white d-block">Please wait...</small></div>');
      $('#loading').show();
      $.ajax({
            url:"https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=f238e6196998247ae7cbaff0e7a124c1&units=metric",
            method:"POST",
            success:function(data){
              if(data != null){
                var str = data.main.temp;
                var sunrise = timeConverter(data.sys.sunrise);
                var sunset = timeConverter(data.sys.sunset);
                $('#loading').hide().slideUp(2000, function(){
                  $('#result').show(function(){
                  $('#temp').html('<p><span class="wi wi-thermometer mr-2"></span>Temperature : '+data.main.temp+'&#8451;</p>');
                  $('#humidity').html('<p><span class="wi wi-humidity mr-2"></span>Humidity : '+data.main.humidity+'%</p>');
                  $('#weather').html('<p>Type : '+data.weather[0].main+'</p><p>Description : '+data.weather[0].description+'</p>');
                  $('#sun').html('<p><span class="wi wi-sunrise mr-2"></span>Sunrise : '+sunrise+' A.M</p><p><span class="wi wi-sunset mr-2"></span>Sunset : '+sunset+' P.M</p>');
                }).slideDown().delay(500);
            });
                //$('#result').html(data);
              }else{
                $('#result').html('No Data Found');
              }
              $('#loading').empty();
            }
        });
      });
    });
    function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var hour = a.getHours();
      var min = a.getMinutes()+30;
      if(min>59)
      {
        min=min-60;
        hour = hour+1;
      }
      if(hour>=12){
        hour = hour-12;
      }
      if (min<10) {
        min = '0'+min;
      }
      var time = hour + ':' + min ;
      return time;
    }
