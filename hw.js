$( document ).ready(function() {

	// create variables needed
	var buttons = ["Cat","Dog","Walking Dead","Wolf","Dexter","Game of Thrones","Beatles","Goat","Donkey","Music","Phish","Turtle"]
	var animal;
	var rating;
	var results = [];
	var pause = false;


   // pause gif function
  $('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

// display the gifs

    function displayAnimalGifs(){
       $("#animals").empty();
		var animalName = $(this).attr("data-name");
		console.log("----------")
		console.log(this);
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		    $.ajax({
		        url: queryURL,
		        method: "GET"
		    }).done(function(response) {
		    	console.log(response)
		            results = response.data;
		            console.log(results) 

		            for (var i = 0; i < results.length; i++) {
		              var gifDiv = $("<div class='item'>");

		              var rating = results[i].rating;

		              var p = $("<p>").text("Rating: " + rating);

		              var animalImage = $("<img>");
		              animalImage.attr("class","gif")
		              animalImage.attr("data-name", buttons[i]);

		              animalImage.attr("src", results[i].images.fixed_height_still.url);
		              	gifDiv.prepend(animalImage);
						gifDiv.prepend(p);
		              // $("#animals").append("Rating: " + rating);
		              $("#animals").append(gifDiv);
		            }
		    });
	};    	
	


	// create function to render buttons
		var renderButtons = function(){
			console.log(buttons)
			console.log(animal)
			console.log(rating)
			// empty div holding buttons
			$("#animalButtons").empty();

				for (var i = 0; i < buttons.length; i++) {
					// Then dynamicaly generating buttons for each animal in the array
		            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		            var a = $("<button>");
		            // Adding a class
		            a.addClass("button");
		             // Adding a class
		            a.addClass("buttons");
		            // Added a data-attribute
		            a.attr("data-name", buttons[i]);
		            // Provided the initial button text
		            a.text(buttons[i]);
		            // Added the button to the HTML
		            $("#animalButtons").append(a);
		            // console.log(a)
				}
		};
renderButtons(); //initial call of renderButtons

			$("#addAnimal").on("click", function(event) {
			          event.preventDefault();
			         	animal = $("#animal-input").val().trim();
			          // This line grabs the input from the textbox
			          

			          console.log(animal)
			          // The animal from the textbox is then added to our array
			          buttons.push(animal);
			          console.log(buttons)
			          // Calling renderButtons which handles the processing of our animal array
			          renderButtons();
		   	});

			$(document).on("click", ".button", displayAnimalGifs);
			// $(document).on("click", ".gif", pausegif);
			// $(".button").on("click", function(event){
			// 	displayAnimalGifs()
			// })
})
