// $.post("/api/friends", userData, function(data) {
//     // Grab the result from the AJAX post so that the best match's name and photo are displayed.
//     $("#match-name").text(data.name);
//     $("#match-img").attr("src", data.photo);
//     // Show the modal with the best match
//     $("#results-modal").modal("toggle");
//   });
// } else {
//   alert("Please fill out all fields before submitting!");
// }

$(document).ready(function(){
//    alert("Here");
    $('.modal').modal();
  });