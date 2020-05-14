//Variables
var topics = [
    "Ariel",
    "Aurora",
    "Belle",
    "Snow White",
    "Cinderella",
    "Elsa",
    "Rapunzel",
    "Pocahontas",
    "Mulan",
];

//Functions

// topics array buttons
function buttonExpress(){
	$("#button-group").empty();
	
	//create all buttons
	for(var i = 0; i < topics.length; i++) {
		var button = $("<button>").text(topics[i]);
		button.attr("data", topics[i]);
		button.addClass("button");
		$("#button-group").append(button);
	}
}
buttonExpress();

//adding new button
$("#add-button").on("click", function(e) {
	e.preventDefault();
	var alreadyExist = false;
	if(topics.indexOf($("#add-input").val()) !== -1) {
		alreadyExist = true;
	}
	if($("#add-input").val() !== "" && alreadyExist === false) {
		var name = $("#add-input").val().toLowerCase();
		topics.push(name);
		var button = $("<button>").text(name);
		button.attr("data", name);
		button.addClass("button");
		$("#button-group").append(button);
	}
	$("#add-input").val("");
});

//on button click
$(document).on("click", ".button", function() {

	var disneyprincess = $(this).attr("data");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=G01CJcbz5PHy2jCr2alITK4x7VjFBQD6&q=" +
    disneyprincess + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
		//grab data
		var results = response.data;
		var resultsContainerSection = $("<section class='results-container'>");

		//empty the git
		$("#group").empty();

		//for loop through the data
    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
			
			//pull the rate
    		var rating = results[i].rating;
    		var p = $("<p>").text("Rating: " + rating);

    		var img = $("<img class='result'>");
    		img.attr("src", results[i].images.fixed_height_still.url);
    		img.attr("data-state", "still");
    		img.attr("data-still", results[i].images.fixed_height_still.url);
    		img.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(img);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#group").prepend(resultsContainerSection);
    });
});

//on click express
$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

