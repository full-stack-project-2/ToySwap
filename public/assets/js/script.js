//This file is for the single products page only.

$(document).ready(function () {
  let toggleChat = false;
  let mySessionID;
  let socket;
  let otherUserName = 'alex2';//Problem is here..... needs to change
  let productId = '1';
  let invite = false;
  let avail = false;
  let currentUser;

  $('#msgDiv').html('<small><i>Chat session closed...</i></small>');

  $.ajax("/products/getUname", {
    type: "GET"
  }).then( function (user) {     
      if(!socket){
        currentUser = user;
        socket = io.connect();
        startUserConnection(user);
      }
  });

  let startUserConnection = function (personalUserName) {
    $.ajax("/chat/" + personalUserName+'_inviteAnswer');
    $.ajax("/chat/" + personalUserName+'_invite');
    $.ajax("/chat/" + personalUserName, {
      type: "GET"
    }).then( function () {
          console.log(socket);//remove
          socket.on(personalUserName, function (data) {
              $("#chatBox").append("<strong>" + otherUserName + ": </strong><i> " + data.message + " </i>");
              $('#chatBox').animate({
                scrollTop: $('#chatBox').get(0).scrollHeight
              }, 2000);
          });
          socket.on(personalUserName+'_invite', function (data) {
            console.log('invited');
            $('#myModal').css('display', 'block');
            $('#modalPMsg').html('<p>'+data.message+' has a question about a product and wants to chat.</p>');
            $('#modalOfferBtn').text('Accept');//set button function to accept or refuse and
            $('#modalCancelBtn').text('Refuse');//send the answer to otherUserName_inviteAnswer
            productId = data.id;
          });
          socket.on(personalUserName+'_inviteAnswer', function (data) {
            console.log('over here');
            if(data.message === 'true'){
              console.log('chat accepted');
              // redirect code
              // possible make route to redirect and send ready to go message
              // needs to be invite = true;
              // avail = true;
              // toggleChat = true;
              // and run setChat()
              invite = true;
              avail = true;
              toggleChat = true;
              setChat();
            } else if(data.message === 'false'){
              invite = false;
              avail = false;
              alert('Chat refused.');
            }
         });
          
      });
  };
 
  
 

  $('#modalOfferBtn').on('click', function(){
    let current = $('#modalOfferBtn').text();
    $('#myModal').css('display', 'none');
    if( current === 'Accept'){
      socket.emit(otherUserName+'_inviteAnswer', {
        message: 'true'     
         });
    }
  });

  $('#modalCancelBtn').on('click', function(){
    let current = $('#modalCancelBtn').text();
    $('#myModal').css('display', 'none');    
    if( current === 'Refuse')  
    console.log(otherUserName);  
      socket.emit(otherUserName+'_inviteAnswer', {
        message: 'false'     
        });
  });

  $("#starIcon").on("click", function () {
      let source = $(this).attr("src");
      if (source === "assets/img/starOff.png") {
        $(this).attr("src", "assets/img/starOn.png");
        $("#wList").text("You are watching this item.");
      } else {
        $(this).attr("src", "assets/img/starOff.png");
        $("#wList").text("Add to watchlist.");
      }
  });

  $("#chatBtn").on("click", function () {
    //get productId = product id
    //get otherUserName = userName
    // if(otherUserName)
    //    getInvite(otherUserName);
     if(otherUserName) 
        $.ajax("/chat/srch/" + otherUserName, {
         type: "GET"
       }).then( function (bk) {
         console.log('bk '+bk);
         if(bk === 'false'){
          $('#myModal').css('display', 'block');
          $('#modalPMsg').html('<p>User currently not available.</p>');
          $('#modalOfferBtn').css('visibility', 'hidden');
          $('#modalCancelBtn').css('visibility', 'hidden');
          toggleChat = false;
          avail = false;
         }
         if(bk === 'true'){
           avail = true;
         }
         if(avail && !invite){
          console.log(avail+' '+!invite);
          console.log(otherUserName+'_invite');
          socket.emit(otherUserName+'_invite', {
                         message: currentUser,
                              id:  '1'      
                          });
         } 
       });

        

  });

  function setChat() {
   
    if (otherUserName && socket && avail && invite)
      $('#msgDiv').html('<small><i>Chat session initiated...</i></small>');
      socket.on(otherUserName, function (data) {
        $("#chatBox").append("<strong>" + otherUserName + ": </strong><i> " + data.message + " </i>");
        $('#chatBox').animate({
          scrollTop: $('#chatBox').get(0).scrollHeight
        }, 2000);
      });

    if (toggleChat) {
      $('#msgDiv').html('<small><i>Chat session now open...</i></small>');
      $('#topDiv').append('<div id="chatBox" class="mx-3 my-1 pl-2 text-left"></div>');
      $('#bottDiv').append('<input type="text" class="ml-3 mr-2 text-left" id="txtBox">');
      $('#bottDiv').append('<button id="submitBtn" class="btn btn-success">Submit</button>');
      $('#bottDiv').append('<button id="closeBtn" class="btn btn-danger ml-1">CLOSE</button>'); 
    }
    
  }

  $("#bottDiv").on("click", "#closeBtn", function () {
    $('#chatBox').remove();
    $('#bottDiv').empty();
    $('#msgDiv').html('<small><i>Chat session closed...</i></small>');
    otherUserName = '';
    productId = '';
    invite = false;
    avail = false;
  });

  $("#searchBtn").on("click", function () {
    searchBtn();
  });

  $("#bottDiv").on("click", "#submitBtn", function () {
    submitBtn();
  });

  $(this).keypress(function (event) {
    let searchTxtIsFoc = $("#searchBox").is(':focus');
    let chatTxtIsFoc = $("#txtBox").is(":focus");

    if (searchTxtIsFoc && event.keyCode == 13) {
      searchBtn();
    } else if (chatTxtIsFoc && event.keyCode == 13) {
      submitBtn();
    }
  });

  function searchBtn() {
    let inputSearchBox = $("#searchBox").val().trim();
    console.log('Search box is ' + inputSearchBox);
  }

  function submitBtn() {
    let inputText = $("#txtBox").val().trim();

    if (socket && inputText && otherUserName)
      socket.emit(otherUserName, {
        message: inputText       
      });

    $('#chatBox').animate({
      scrollTop: $('#chatBox').get(0).scrollHeight
    }, 2000);

  } //ends submitBtn()

  $('#tradeBtn').on('click', function () {
    $('#myModal').css('display', 'block');
  });

  $('.close').on('click', function () {
    $('#myModal').css('display', 'none');
  });

  // $('#modalCancelBtn').on('click', function () {
  //   $('#myModal').css('display', 'none');
  // });
/**
 * If I accept a chat invite I will set my otherUserName variable to the other persons
 * username.
 */

$('#viewAll').on('click', function(){


  $.get("/login", function(){
    window.location.href = "/getAllProducts";
});

    
  

});



$( this ).unload(function() {
  $.ajax("/chat/del" + personalUserName+'_inviteAnswer', {});
  $.ajax("/chat/del" + personalUserName+'_invite', {});
  $.ajax("/chat/del" + personalUserName, {});
});

}); //ends read



 
