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
    $('.modal').modal();
    $(".swapMe").on("click", function(){
        // Each of these variables grabs data from the page to send back to the server as a potential swap between to people.
        let toyId = this.id.split("-")[1];
        let url = $(this).closest('div').find("img").attr("src");
        let title = $(".title-" + toyId).text();
        let sellerId = $("img.viewImg").data();
        let sellerTitle = $(".viewImg").attr("alt");
        let sellerUrl = $(".viewImg").attr("src");
        let swap = {
            incomingId: toyId,
            incomingUrl: url,
            incomingTitle: title,
            sellerId: sellerId.toy,
            sellerTitle: sellerTitle,
            sellerUrl: sellerUrl
        }
        $.post("/swaps", swap).done(function (data) {		
            $('#swap').modal('close');
        });		
        
        // $.post("/swap/friends", userData, function(data) {
        //     // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        //     $("#match-name").text(data.name);
        //     $("#match-img").attr("src", data.photo);
        //     // Show the modal with the best match
        //     $("#results-modal").modal("toggle");
        //   });
        // } else {
        //   alert("Please fill out all fields before submitting!");
        // }
    })
  });