$(document).ready(function () {



    // The code handles what happens when the user clicks the "submit a book" button.

    // When user submits the form to make a new toy
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        console.log("submitted");
        // Make a newToy object
        var newToy = {
            title: $("#title").val().trim(),
            product_condition: $("#product_condition").val().trim(),
            availability: $("#availability").val().trim(),
            price: $("#price").val().trim(),
            url: $("#url").val().trim(),
            description: $("#description").val().trim()
        };
        // Send an AJAX POST-request with jQuery
        $.post("/toys", newToy).done(function (data) {
            // $.get("/", function (data) {
            //     // todos = data;
            // });
            // console.log("CONGRATS, you just uploaded your product!");
            window.location.replace("/toys");
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