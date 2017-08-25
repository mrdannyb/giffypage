var topics = ['Cats','Otters','bulldogs','fractals','star wars'];


$(document).ready(function () {
	function renderButtons () {
		$("#button-view").empty();
		for (i = 0; i < topics.length; i++) {
			var $btn = $("<button>");
			var dataFix = topics[i].replace(/ /g,"_");
			$btn.addClass("pop-gif");
			$btn.attr("data-name",dataFix);
			$btn.text(topics[i]);
			$("#button-view").append($btn);
		}
	}

	$("#add-gif").on("click", function(){
		event.preventDefault();
		var gifIn = $("#gif-input").val();	
		topics.push(gifIn);
		renderButtons();
	})

	$(document).on("click",".pop-gif", function(){
		var gif = $(this).data("name");
		var apiKey = "f881cf196d1642c8ad2ea9658c050ed7";		
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey + "&limit=10";
		
		$.ajax({
			url : queryUrl,
			method : "GET"
		}).done(function(response){
			var results = response.data;
			console.log(results);
			for (i = 0; i < results.length; i++) {
				var gifDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				gifDiv.append(p);
				var gifImg = $("<img>");
				gifImg.attr("class", "giphy");
				gifImg.attr("src", results[i].images.fixed_width_still.url);
				gifImg.attr("data-state", "still");
				gifImg.attr("data-animate", results[i].images.fixed_width.url);
				gifImg.attr("data-still", results[i].images.fixed_width_still.url);
				gifDiv.prepend(gifImg);
				$("#giffy-view").prepend(gifDiv);
			}
		})
	})

	$(document).on("click", ".giphy", function(){
		console.log($(this).data("state"));
		if ($(this).attr("data-state") == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate")
		}
		else if ($(this).attr("data-state") == "animate") {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still")
		}
	})

	renderButtons();
})
