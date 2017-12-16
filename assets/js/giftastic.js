var gifs = {
	topics: [
		'cat',
		'lizard',
		'goat',
		'monkey',
		'dog',
		'hamster',
		'pig',
		'okapi'
	],
	params: {
		apikey: "lvKOIYKsFxYyK6umy10fNARn0PI1VZNF",
		q: "cat",
		limit: 10,
		offset: 0,
	},


	placeButtons: function() {
		var topics = this.topics;
		$("#buttons").empty();
		var l = topics.length;
		for (var i = 0; i < l; i++) {
			var button = $("<button>")
			.attr("data-topic",topics[i])
			.attr("data-clicked",0)
			.html(topics[i])
			.addClass("topic");
			$("#buttons").append(button);
		}
	},

	addTopic: function(topic) {
		var topics = this.topics;
		//if there is input and if it isn't already in the array
		if (topic && (topics.indexOf(topic) ===  -1)) {
			topics.push(topic);
			this.placeButtons();
		} else {
			alert("type a new topic");
		}
	},

	buttonClick: function(topic,clicked) {
		console.log(clicked);
		$("#gifs").empty();
		this.params.q = topic;
		this.params.offset = clicked*10-10;
		var thisGifs = this;
		var url = "http://api.giphy.com/v1/gifs/search"
		url += '?' + $.param(gifs.params);
		$.ajax({
		  url: url,
		  method: 'GET',
		}).done(function(result) {
			thisGifs.gifs = result.data;

			for (var i = 0; i < thisGifs.params.limit; i++) {
				
				var gifURL = result.data[i].images.fixed_width_still.url;
				var rating = $("<p>").html("Rating: " + result.data[i].rating.toUpperCase());
				var gifDiv = $("<div>").addClass("gif");
			  	var gifContainer = $("<img>")
			  	.attr("src",gifURL);
			  	$(gifContainer).attr("data-number", i)
			  	.addClass("still");
			  	$(gifDiv).append(rating).append(gifContainer);
			  	$("#gifs").append(gifDiv);


			  }
			  $(".pageNum").html(topic + " page: " + clicked);
		});
		
	},

	imageClick: function(img) {

		if ($(img).hasClass("still")) {
			$(img).attr("src", gifs.gifs[$(img).data("number")].images.fixed_width.url)
			.removeClass("still");
		} else {
			$(img).attr("src", gifs.gifs[$(img).data("number")].images.fixed_width_still.url)
			.addClass("still");
		}

	}
}

// make each topic a button


$(document).ready(function() {
	
	gifs.placeButtons();

	$("#add-topic").on("click", function() {
		event.preventDefault();
		//get the input as lowercase
		var newTopic = $("#user-input").val().toLowerCase();
		//add the topic
		gifs.addTopic(newTopic);
		//clear the input
		$("#user-input").val('');
	}); 

	$(document).on("click", ".topic", function() {
		
		var timesClicked = $(this).attr("data-clicked");
		timesClicked++;
		// console.log(timesClicked);
		$(this).attr("data-clicked",timesClicked);
		// console.log($(this).attr("data-clicked"));

		gifs.buttonClick($(this).data("topic"),$(this).attr("data-clicked"));
	});
	$(document).on("click", "img", function(event) {
		gifs.imageClick(event.target);
	});
	
});



