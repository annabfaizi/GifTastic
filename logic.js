// $(document).ready(function()) {
    // Initial array of movies
    var movies = ["The Matrix", "Cool Runnings", "The Godfather", "Mean Girls", "Fifth Element", "Hitch", "Home Alone", "Pitch Perfect", "Taken", "The Devil Wears Prada"];

     
    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayMovieGif() {

    // Example queryURL for Giphy API
    //button clicks generating 10 gifs depending on search
    $("button").on("click", function() {
      var movie = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var Image = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });
    }

      // Function for displaying movie data
      function renderButtons() {
        // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < movies.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("movie");
          // Added a data-attribute
          a.attr("data-name", movies[i]);
          // Provided the initial button text
          a.text(movies[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

//on button click logic below for pausing and playing gifs
	$(".gif").on("click", function() {
      
      var state = $(this).attr("data-state");

      if (state === "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });