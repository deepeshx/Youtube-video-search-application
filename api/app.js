/*
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function(){
$('form').on('submit', function(e){
	e.preventDefault();
	var request = gapi.client.youtube.search.list({
		part: "snippet",
		type: "video",
		q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
		maxResults: 3,
		order: "viewCount",
		publishedAfter: "2016-01-01T00:00:0Z"	
	});
	request.execute(function(response){
	//	console.log(response);
	var results = response.result;
	$.each(results.items, function(index, item){
		//console.log(item);
	//		$('#results').append(item.id.videoId+" "+item.snippet.title+"<br>");
	$.get("item.html" , function(data) {
		$('#results').append(tplawesome(data, [{"title":item.snippet.title ,"videoid":item.videoId}]));
	});

	});

	});
});
});
*/

// a template for loading the video files ...acc to title
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
           maxResults : 8,
//            myRating: "like",
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
	gapi.client.setApiKey('AIzaSyBs-bFz81nkNFE5VKInGfYSn9Mxo1YIdBM');
gapi.client.load("youtube" , "v3" , function(){

});
	}
