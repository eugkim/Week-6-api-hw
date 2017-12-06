$(document).ready(function() {

// create initial empty array to hold inputted brand names 
var topics = [
		"levis", "supreme", "the north face", "nike", "jordan", "reebok", "adidas", "palace",
		"bape", "vans", "champion", "new era", "puma", "carhartt", "cdg", "vlone", "yeezy", "off-white",
		"louis vuitton", "gucci", "chanel", "ferragamo"];

function populateButton(arrayNew, classNew, areaNew) {
	$(areaNew).empty();

	  for (var i = 0; i < arrayNew.length; i++) {
      var a = $("<button>");
      a.addClass(classNew);
      a.attr("data-type", arrayNew[i]);
      a.text(arrayNew[i]);
      $(areaNew).append(a);
    };
};

// on click event associated with addBrand input field

$(document).on("click", ".brand-button", function() {
    $("#brands").empty();
    $(".brand-button").removeClass("active");
    $(this).addClass("active");
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=4XRJ4Lb1OSEWoAYXS9hZDgEDnITy1n44&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var brandDiv = $("<div class=\"brand-item\">");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var brandImage = $("<img>");
        brandImage.attr("src", still);
        brandImage.attr("data-still", still);
        brandImage.attr("data-animate", animated);
        brandImage.attr("data-state", "still");
        brandImage.addClass("brand-image");
        brandDiv.append(p);
        brandDiv.append(brandImage);
        $("#brands").append(brandDiv);
      }
    });
  });
// take inputted string and store into empty array 
$(document).on("click", ".brand-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  $("#add-brand").on("click", function(event) {
    event.preventDefault();
    var newBrand = $("input").eq(0).val();
    if (newBrand.length > 2) {
      topics.push(newBrand);
    }
    populateButtons(topics, "brand-button", "#brand-buttons");
  });
  populateButtons(topics, "brand-button", "#brand-buttons");
});


   



// pull nameArray item and convert back to string 

// search string in GIPHY API for matching related gifs

// search matching gif for parental guidance rating and append to gifDisplay div

// append gifs below corresponding ratings in gifDisplay div

// button click event to animate the gif once when clicked 




