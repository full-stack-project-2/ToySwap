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
            console.log(newUser);
            if (!newUser.email || !newUser.password) {
                return;
              }
              if (newUser.password !== newUser.password2) {
                alert("Make sure your passwords are correct");
              }
            console.log(newUser);
            $.post("/register", newUser).then(function(data) {
                // console.log(data);
                // window.location.replace("/home");
                // console.log("REPLACE");
            }).catch(function(err) {
                console.log(err);
              });
            $("#username").val("");
            $("#password").val("");
            $("#password2").val("");
            $("#email").val("");
        });
    }); 