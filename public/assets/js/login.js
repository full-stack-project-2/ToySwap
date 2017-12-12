$(document).ready(function () {

    $("#login").on("click", function (event) {
        event.preventDefault();
        console.log("submitted");
        let user = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        }

        console.log(user);
        $.post("/login", user, function (data) {
            // console.log(data);
            // window.location.replace("/home");
            // console.log("REPLACE");
        });
    });
}); 