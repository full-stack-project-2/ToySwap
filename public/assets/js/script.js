$(document).ready(function () {
  let toggleChat = true;

  $('#msgDiv').html('<small><i>Chat session closed...</i></small>');


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
    if (toggleChat) {
      $('#msgDiv').html('<small><i>Chat session now open...</i></small>');
      $('#topDiv').append('<div id="chatBox" class="mx-3 my-1 pl-2 text-left"></div>');
      $('#bottDiv').append('<input type="text" class="ml-3 mr-2 text-left" id="txtBox">');
      $('#bottDiv').append('<button id="submitBtn" class="btn btn-success">Submit</button>');
      $('#bottDiv').append('<button id="closeBtn" class="btn btn-danger ml-1">CLOSE</button>');
      $('#chatBtn').attr('title','');
      toggleChat = false;
    }
  });

  $("#bottDiv").on("click","#closeBtn", function () {
    $('#chatBox').remove();
    $('#bottDiv').empty();
    $('#msgDiv').html('<small><i>Chat session closed...</i></small>');
    toggleChat = true;
  });

  $("#searchBtn").on("click", function () {
    searchBtn();
  });

  $("#bottDiv").on("click","#submitBtn", function () {
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

    if (inputText) {
      let textDiv = $("<div>");
      textDiv.append("<strong>You: </strong><i> " + inputText + " </i>");
      $("#chatBox").append(textDiv);
      $("#txtBox").val("");
    } //ends if

    $('#chatBox').animate({
      scrollTop: $('#chatBox').get(0).scrollHeight}, 2000);

  } //ends submitBtn()

  $('#tradeBtn').on('click', function(){
     $('#myModal').css('display','block');
  });

  $('.close').on('click', function(){
    $('#myModal').css('display','none');
  });

  $('#modalCancelBtn').on('click', function(){
    $('#myModal').css('display','none');
  });








}); //ends read