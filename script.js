$(document).ready(function () {
  var weather = $("<h3>", { id: "weather" });
  var temp = $("<h4>", { id: "temperature" });
  var wind = $("<h4>", { id: "wind" });
  var humidity = $("<h4>", { id: "humidity" });
  $("#forecast").append(weather, temp, wind, humidity);

  // Load recently searched cities from localStorage
  var recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

  // Function to render buttons for each searched term
  function renderButtons() {
    // Deleting the recent city buttons prior to adding new buttons
    $("#recent-cities").empty();

    // Looping through the array of recent cities
    for (var i = 0; i < recentCities.length; i++) {
      // Check if the button already exists
      if ($("#recent-cities").find("[data-name='" + recentCities[i] + "']").length === 0) {
        // Dynamically generating buttons for each recent city
        var button = $("<button>");
        button.addClass("recent-city btn btn-secondary justify-content-between");
        button.attr("data-name", recentCities[i]);
        button.text(recentCities[i]);
        $("#recent-cities").append(button);
      }
    }
  }

  $("#city-search").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#search-input").val().trim();
    var geoQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchTerm + "&limit=1&appid=1b80d8a7edd459f41fc968c54929e7ff";
    var todaysDate = dayjs().format("DD[/]MM[/]YY");

    // Creates a Fetch call
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
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&mode=json&units=metric&appid=1b80d8a7edd459f41fc968c54929e7ff";

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
        $(temp).text("Temp: " + data.list[0].main.temp.toFixed(1) + "°C");
        $(wind).text("Wind Speed: " + data.list[0].wind.speed);
        $(humidity).text("Humidity: " + data.list[0].main.humidity + "%");

        // Display weather icon
        var iconCode = data.list[0].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        $("#weather-icon").attr("src", iconUrl).attr("alt", "Weather Icon");

        // Save the searched city to localStorage
        recentCities.push(searchTerm);
        localStorage.setItem("recentCities", JSON.stringify(recentCities));

        // Render the buttons for previous cities
        renderButtons();

        // Container to append cards
        const weatherCardsContainer = $("#weatherCards");
        weatherCardsContainer.empty(); // Clear existing cards

        // Get the current date
        const currentDate = dayjs();

        // Loop through next 5 days to create cards
        for (let i = 0; i < 5; i++) {
          // Calculate the date for each day
          const dateForDay = currentDate.add(i, 'day').format('YYYY-MM-DD');

          // Create card element
          const card = $("<div>").addClass("col-md-4 mb-4");

          // Create Bootstrap card structure
          card.html(`
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${dateForDay}</h5>
                <p class="card-text">Weather forecast for ${dateForDay}</p>
                <!-- You can customize the content of each card here based on your data -->
              </div>
            </div>
          `);

          // Append card to the container
          weatherCardsContainer.append(card);
        }
      });
  });

  // Event delegation for dynamically created recent city buttons
  $("#recent-cities").on("click", ".recent-city", function () {
    // On button click, set the search input and perform a new search
    $("#search-input").val($(this).attr("data-name"));
    $("#city-search").click();
  });
});
