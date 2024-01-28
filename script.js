$(document).ready(function () {
var weather = $("<h3>", {id: "weather"})
var temp = $("<h4>", {id: "temperature"});
var wind = $("<h4>", {id: "wind"});
var humidity = $("<h4>", {id: "humidity"});
$("#forecast").append(weather,temp,wind,humidity);

  $("#city-search").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#search-input").val().trim();
    var geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchTerm + "&limit=1&appid=1b80d8a7edd459f41fc968c54929e7ff";
    var todaysDate = dayjs().format("DD[/]MM[/]YY")



    // Creates a Fetch call for the specific movie button being clicked
    fetch(geoQueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(geoQueryURL);
        $("#today").html("<h2>" + data[0].name + " " + todaysDate + "</h2>");
        console.log(data[0].name);
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log(lat);
        console.log(lon);

        // Second API request using latitude and longitude
        var weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&mode=json&units=metric&appid=1b80d8a7edd459f41fc968c54929e7ff";

        console.log(weatherQueryURL);

        // Make the second API request inside the first .then() block
        return fetch(weatherQueryURL);
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // var weatherIcon
        $(temp).text("Temp: " + data.list[0].main.temp.toFixed(1) + "°C")
        $(wind).text("Wind Speed: " + data.list[0].wind.speed);
        $(humidity).text("Humidity: " + data.list[0].main.humidity +"%");

         // Display weather icon
         var iconCode = data.list[0].weather[0].icon;
         var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
         $("#weather-icon").attr("src", iconUrl).attr("alt", "Weather Icon");
 

        //create button for each searched term
        var recentCityBtn = $("<button>").text(searchTerm).on("click", function () {
          $("#search-input").val(searchTerm);
          $("#city-search").click();
        });

        
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  });
  
});