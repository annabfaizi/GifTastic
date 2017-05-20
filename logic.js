$(document).ready(function(){

  // Initial array of movies
  var movies = ["Cool Runnings", "The Godfather", "Mean Girls", "Fifth Element", "Hitch", "Home Alone", "Pitch Perfect", "Taken", "The Devil Wears Prada"];

  renderButtons();

  //Loops through movies array and appends buttons to HTML
  // Function for displaying movie data
  function renderButtons() {
    // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    $.each(movies, function(i, val) {
        var movieButton = $('<button>').attr('class', 'btn').addClass('movie').text(val);
        $("#buttons-view").append(movieButton);
    });
}

  // This function handles events where the add movie button is clicked
  $("#buttons-view").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movieFromButton = $(this).text();
    getGifs(movieFromButton);
    
  });

  $(document).on('click', '.gif-image', function() {
        var stateAttr = $(this).attr('data-state');

        if (stateAttr === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });
    
    // takes an array of gif objects
    // and creates elements in the HTML in gif-area
    function populateGifs(array) {
        console.log('populateGifs');
        console.log(array);

        var gifArea = $('#gifs-appear-here');
        gifArea.empty();

        $.each(array, function(i, val) {
            gifArea.append($('<div>').append($('<div>').text("Rating: " + val.rating))
                .append($('<img>')
                .attr('src', val.images.fixed_height_small_still.url)
                .attr('data-still', val.images.fixed_height_small_still.url)
                .attr('data-animate', val.images.fixed_height_small.url)
                .attr('data-state', 'still')
                .addClass('gif-image')));
        });
    }

    // queries the API with the subject
    // and calls populatesGifs array
    function getGifs(movies) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movies + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {

                var gifArray = [];

                $.each(response.data, function(i, val) {

                    gifArray = response.data;
                });

                populateGifs(gifArray);

            });
    }

    // whenever submit button is clicked
    // add button to array
    // reload array in html
    $('.btn-info').on('click', function() {
        event.preventDefault();
        console.log($('#add-movie').val());
        movies.push($('#add-movie').val());
        renderButtons();

    });


}); //closed document ready function