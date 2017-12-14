$(document).ready(function () {
    
    $.get("/list-toys", function(data) {
        // alert("Here");
        // console.log(data);
    });
            // $.get("/", function (data) {		
            //      // todos = data;		
            //  });		
            //  console.log("CONGRATS, you just uploaded your product!");		
            //  console.log(data)		
            //  window.location.replace("/toys");		


        // $("#register").on("click", function (event) {
        //     event.preventDefault();
        //     let newUser = {
        //         username: $("#username").val().trim(),
        //         email: $("#email").val().trim(),
        //         password: $("#password").val().trim(),
        //         password2: $("#password-again").val().trim()
        //     } 
        //     if (!newUser.email || !newUser.password) {
        //         return;
        //       }
        //       if (newUser.password !== newUser.password2) {
        //         alert("Make sure your passwords are correct");
        //         return;
        //       }
        //     console.log(newUser);
        //     $.post("/register", newUser).done(function(data) {
        //         window.location.href = "/list";
        //     });
        //     $("#username").val("");
        //     $("#password").val("");
        //     $("#password2").val("");
        //     $("#email").val("");
        // });
    }); 