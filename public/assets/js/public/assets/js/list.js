$(document).ready(function () {
    
    // let holder = $(".holder");
    // $.get("/get-back-data", function(newdata) {
    //     console.log(newdata);  
    //         for (var i = 0; i < newdata.length; i++) {
    //         let html = "";  
    //           html += "<div class='row' id='row-" + i + "'>";
    //           html += "<div class='col s6'  style='border: 1px solid lightgrey; border-radius: 10px; width: 230px'>";
    //           html += "<div class='item-container'>";
    //           html += "<div class='item-pic'><a href='/toy/" + newdata[i].id + "' class='opa-hover'>";
    //           html += "<img class='vertical-middle' width='200' height='160' src='" +  newdata[i].url + "' alt='" +  newdata[i].title + "' style='margin-top: 10px'></a></div>";
    //           html += "<div class='item-info'>";
    //           html += "<div class='item-info-title'>";
    //           html += "<a  href='/toy/" + newdata[i].id + "'</div>";
    //           html += "<div class='item-info-price'>$" + newdate[i].price +"</div>";
    //           html += "<div class='item-info-distance'>";
    //           html += "<i class='ss-location'></i>" + newdate[i].availability + " in stock</div>";
    //           html += "<div class='item-info-condition'>" + newdate[i].product_condition + "</div>";
    //           html += "</div></div>";
    //           html += "<a href='/toy/" + newdata[i].id + "' class='bold'>"
    //           holder.append(html); 
    //         }

    // });

    // <div class="row" id="rowOne">
    // <div class="col s6"  style="border: 1px solid lightgrey; border-radius: 10px; width: 230px">
    //     <div class="item-container">
    //         <div class="item-pic"><a href="/item/detail/393309062/" class="opa-hover">
    //               <img class="vertical-middle" width="200" height="160" src="{{url}}" alt="AIR CONDITIONER GE 5000btu" style="margin-top: 10px">
    //                   </a></div>
    //             <div class="item-info">
    //                     <div class="item-info-title">
    //                         <a href="/toy/{{id}}">{{title}}</a>
    //                     </div>
    //             <div class="item-info-price">${{price}}</div>
    //             <div class="item-info-distance">
    //                 <i class="ss-location"></i>{{availability}} in stock
    //             </div>
    //             <div class="item-info-condition">{{product_condition}}</div>
    //             </div>
    //         </div>
    //         <a href="/toy/{{id}}" class="bold">
    //             <div class="owner-info" style="border-top: 1px solid rgb(216, 216, 216); width: 200px;">
    //                  <div class="owner-info-pic">
    //                     <img class="avatar vertical-middle" src="https://d2j6tswx2otu6e.cloudfront.net/p-3dXNhNt7gDC1qs2dwNcLYM0mQ=/100x100/smart/744b/o29534662_49196.jpg" width="30" height="30" alt=" "/>
    //                 </div>
    //                 Username : {{username}}
    //                 <div class="col s2">
    //                     <img src="images/img/yuna.jpg" alt="" class="circle responsive-img"/>
                        
    //                 </div>
    //             </div>
    //         </a>
    //     </div>
    // </div>
    // </div>





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