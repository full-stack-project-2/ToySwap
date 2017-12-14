$(document).ready(function () {
  let toggleChat = true;
  let mySessionID;
  let socket;
  let scrtWrd;
  let user;
  let otherUserName = 'other';

  $('#msgDiv').html('<small><i>Chat session closed...</i></small>');

  $.ajax("/products/getUname", {
    type: "GET"
  }).then( function (data) {
    user = data;
  });


  let startChatConnection = function (secretWord) {
    console.log('how many');
    scrtWrd = secretWord;
    $.ajax("/chat/" + secretWord, {
      type: "GET"
    }).then(
      function () {
        socket = io.connect();
        console.log(socket);
        socket.on(secretWord, function (data) {
          $("#chatBox").append("<strong>" + otherUser + ": </strong><i> " + data.message + " </i>");
          $('#chatBox').animate({
            scrollTop: $('#chatBox').get(0).scrollHeight
          }, 2000);
        });

        socket.on(otherUserName, function (data) {
          $("#chatBox").append("<strong>" + otherUserName + ": </strong><i> " + data.message + " </i>");
          $('#chatBox').animate({
            scrollTop: $('#chatBox').get(0).scrollHeight
          }, 2000);
        });
      });
  };

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
    //otherUserName = code to get othe current items owner
    if (otherUserName)
      $.ajax("/chat/" + otherUserName, {
        type: "GET"
      });

    if (toggleChat) {
      $('#msgDiv').html('<small><i>Chat session now open...</i></small>');
      $('#topDiv').append('<div id="chatBox" class="mx-3 my-1 pl-2 text-left"></div>');
      $('#bottDiv').append('<input type="text" class="ml-3 mr-2 text-left" id="txtBox">');
      $('#bottDiv').append('<button id="submitBtn" class="btn btn-success">Submit</button>');
      $('#bottDiv').append('<button id="closeBtn" class="btn btn-danger ml-1">CLOSE</button>');
      $('#chatBtn').attr('title', '');
      toggleChat = false;
    }
    if (!socket) {      
      let topic = user; //user name
      startChatConnection(topic); //start with user name
    }
  });

  $("#bottDiv").on("click", "#closeBtn", function () {
    $('#chatBox').remove();
    $('#bottDiv').empty();
    $('#msgDiv').html('<small><i>Chat session closed...</i></small>');
    toggleChat = true;
    socket = '';
    otherUserName = '';
    $.ajax("/chat/del/" + user, {
      type: "GET"
    });
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

    if (socket && inputText)
      socket.emit(scrtWrd, {
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

  $('#modalCancelBtn').on('click', function () {
    $('#myModal').css('display', 'none');
  });








}); //ends read

$( window ).unload(function() {
  $.ajax("/chat/del/" + user, {
    type: "GET"
  });
});