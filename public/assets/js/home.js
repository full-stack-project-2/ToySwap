$(document).ready(function () {
    // $.get("/home-swap", function (data) {		
    //              // todos = data;		
    // });		

    // When user submits the form to make a new toy
    $("#newToy").on("click", function() {
        event.preventDefault();
        // Make a newToy object
        let newToy = {
            title: $("#title").val().trim(),
            product_condition: $("#product_condition").val().trim(),
            availability: $("#availability").val().trim(),
            price: $("#price").val().trim(),
            url: $("#url").val().trim(),
            description: $("#description").val().trim()
        };
        console.log(newToy);
        // Send an AJAX POST-request with jQuery
        $.post("/toys", newToy).done(function (data) {
            console.log(data);
            window.location.replace("/home");
        });
        // On success, run the following code

        // Empty each input box by replacing the value with an empty string
        $("#title").val("");
        $("#product_condition").val("");
        $("#availability").val("");
        $("#price").val("");
        $("#url").val("");
        $("#description").val("");
    });
})
	
    //  $(".view").on("click", function(){		
    //      let toyId = this.id.split("-")[1];		
    //      let userId = this.id.split("-")[2];		
    //      console.log(toyId);		
    //      console.log(userId);		
    //      $.get("/toys/" + toyId + "/" + userId).done(function (data) {		
    //          // $.get("/", function (data) {		
    //          //     // todos = data;		
    //          // });		
    //          // console.log("CONGRATS, you just uploaded your product!");		
    //          // console.log(data)		
    //          // window.location.replace("/toys");		
    //      });		
 		
    //      alert(this.id);		
    //  })//*/
