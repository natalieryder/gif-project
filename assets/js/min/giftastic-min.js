var gifs={topics:["cat","lizard","goat","monkey","dog","hamster","pig","okapi"],params:{apikey:"lvKOIYKsFxYyK6umy10fNARn0PI1VZNF",q:"cat",limit:10,offset:0},placeButtons:function(){var t=this.topics;$("#buttons").empty();for(var a=t.length,i=0;i<a;i++){var s=$("<button>").attr("data-topic",t[i]).attr("data-clicked",0).html(t[i]).addClass("topic");$("#buttons").append(s)}},addTopic:function(t){var a=this.topics;t&&a.indexOf(t)===-1?(a.push(t),this.placeButtons()):alert("type a new topic")},buttonClick:function(t,a){console.log(a),$("#gifs").empty(),this.params.q=t,this.params.offset=10*a-10;var i=this,s="https://api.giphy.com/v1/gifs/search";s+="?"+$.param(gifs.params),$.ajax({url:s,method:"GET"}).done(function(s){i.gifs=s.data;for(var e=0;e<i.params.limit;e++){var c=s.data[e].images.fixed_width_still.url,n=$("<p>").html("Rating: "+s.data[e].rating.toUpperCase()),o=$("<div>").addClass("gif"),d=$("<img>").attr("src",c);$(d).attr("data-number",e).addClass("still"),$(o).append(n).append(d),$("#gifs").append(o)}$(".pageNum").html(t+" page: "+a)})},imageClick:function(t){$(t).hasClass("still")?$(t).attr("src",gifs.gifs[$(t).data("number")].images.fixed_width.url).removeClass("still"):$(t).attr("src",gifs.gifs[$(t).data("number")].images.fixed_width_still.url).addClass("still")}};$(document).ready(function(){gifs.placeButtons(),$("#add-topic").on("click",function(){event.preventDefault();var t=$("#user-input").val().toLowerCase();gifs.addTopic(t),$("#user-input").val("")}),$(document).on("click",".topic",function(){var t=$(this).attr("data-clicked");t++,$(this).attr("data-clicked",t),gifs.buttonClick($(this).data("topic"),$(this).attr("data-clicked"))}),$(document).on("click","img",function(t){gifs.imageClick(t.target)})});