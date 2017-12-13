$(document).ready(function () {
    
        $("#login").on("click", function (event) {
            event.preventDefault();
            console.log("submitted");
            let user = {
                username: $("#username").val().trim(),
                password: $("#password").val().trim()
            };
    
            if (!user.email || !user.password) {
                return;
              }

            $.post("/login", user, function(){
                window.location.href = "/products";
            });
            $("#username").val("");
            $("#password").val("");
        });
    });