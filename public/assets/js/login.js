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
    
            console.log(user);
            $.post("/login", user).then(function(data) {
                // console.log(data);
                // window.location.replace("/home");
                // console.log("REPLACE");
            }).catch(function(err) {
                console.log(err);
              });
            $("#username").val("");
            $("#password").val("");
        });
    });