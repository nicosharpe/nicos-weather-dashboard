$( document ).ready(function() {

$("#forecast").html("<div>").attr("id","#temp");
$("#forecast").html("<div>").attr("id","#wind");
$("#forecast").html("<div>").attr("id","#humidity");

$("#city-search").on("click", function (event) {
  event.preventDefault();
  var searchTerm = $("#search-input").val().trim();
  var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+searchTerm+"&limit=1&appid=1b80d8a7edd459f41fc968c54929e7ff";
  var todaysDate = dayjs().format("DD[/]MM[/]YY")



  // Creates a Fetch call for the specific movie button being clicked
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(queryURL);
      $("#today").html("<h2>" + data[0].name+ " " +  todaysDate + "</h2>");
      console.log(data[0].name);

    })
    // .then(function (data){
    //   var queryURL = "api.openweathermap.org/data/2.5/forecast?lat="{lat}&lon={lon} "&appid={API key}"


    //   })

      // $("#forecast").html("<h2> Wind: "
    


    // $(".wind").text("Wind Speed: " + data.wind.speed);
    // $(".humidity").text("Humidity: " + data.main.humidity);

    // // Convert the temp to Celsius
    // var tempC = data.main.temp - 273.15;

    // // add temp content to html
    // $(".temp").text("Temperature (K) " + data.main.temp);
    // $(".tempC").text("Temperature (C) " + tempC.toFixed(2));

    // // Log the data in the console as well
    // console.log("Wind Speed: " + data.wind.speed);
    // console.log("Humidity: " + data.main.humidity);
    // console.log("Temperature (C): " + tempC);
   

});
});
  
  // lat={lat}&lon={lon}