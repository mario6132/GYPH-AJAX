$(document).ready(function () {
  //Listing of Missions
  var missions = ['International Space Station', 'ISS', 'Juno', 'Pioneer', 'Dawn', 'InSight',
    'Europa Clipper', 'Cassini', 'Apollo', 'Space Shuttle', 'Mars Exploration',
    'Magellan', 'NuSTAR', 'Ranger', 'Mariner', 'Prometheus', 'Mercury',
    'Shuttle', 'Euclid', 'Voyager', 'Spirit', 'Gemeni', 'Mark 2', 'Surveyor'
  ];
  // Make Buttons Appear
  function displayMissionBts(){
  $("#missionButton").empty();
  for (var i = 0; i < missions.length; i++) {
    var missionButton = $("<button>");
    missionButton.addClass("missions");
    missionButton.addClass("btn btn-primary")
    missionButton.attr("data-name", missions[i]);
    missionButton.text(missions[i]);
    $("#missionButton").append(missionButton);
  }
}
// Populating Mission Buttons --After Search Click--
function newButton(){
    $("#addMission").on("click", function () {
      var mission = $("#mission-input").val().trim();
      if (mission == "") {
        return false;
      }
      missions.push(mission);
      displayMissionBts();
      return false;
    });
  }
  //Push GYPHS
    function displayMission(){;
    var missions = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + missions + "&api_key=JXq4lNnhR0GRLrJQMBWATJlrlDTlLu2z";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
    })
    .done(function(response){;
      console.log(Response);
      $("#NASAgyphs").empty();
      var results = response.data;
      if (results == ""){;
        alert("Try Another Mission")
      }
      for ( var i = 0; i<results.length; i++){;

        var missionDiv = $("<div>");
        missionDiv.addClass("missionDiv");
        var missionRating = $("<p>").text("Rating: ") + results[i].rating;
        missionDiv.append(missionRating);
        var missionImg = $("<img>");
        missionImg.attr("src",results[i].images.fixed_height_small_still.url);
        missionImg.attr("data-still",results[i].image.fixed_height_small_still.url);
        missionImg.attr("data-animate",results[i].image.fixed_height_small_still.url);
        missionImg.attr("data-state", "still");
        missionImg.addClass("image");
        missionDiv.append(missionImg);
        $("#NASAgyphs").prepend(missionImg);
      }
    })
  }
        displayMissionBts();
        newButton();
// Always Listening 
$(document).on("click", ".mission", displayMission);
$(document).on("click", ".image", function(){
  var state =$(this).attr('data-state');
    if ( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    }else{
      $(this).attr('src',$(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });
})


  
  
