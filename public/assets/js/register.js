$(document).ready(function () {
    
        $("#register").on("click", function (event) {
            event.preventDefault();
            console.log("submitted");
            let newUser = {
                username: $("#username").val().trim(),
                email: $("#email").val().trim(),
                password: $("#password").val().trim(),
                password2: $("#password-again").val().trim()
            }
    
            console.log(user);
            $.post("/register", user, function (data) {
                // console.log(data);
                // window.location.replace("/home");
                // console.log("REPLACE");
            });
        });
    }); 