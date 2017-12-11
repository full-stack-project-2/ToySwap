//alert("hi");
$(document).ready(function() {
  $('select').material_select();

// for HTML5 "required" attribute
  $("select[required]").css({
    display: "inline",
    height: 0,
    padding: 0,
    width: 0
  });

//MODAL action function-------------------//
  $('.modal').modal();
});


  
//FIXED MENU BUTTON FUNCTIONS-------------//
$('.fixed-action-btn').openFAB();
$('.fixed-action-btn').closeFAB();
$('.fixed-action-btn.toolbar').openToolbar();
$('.fixed-action-btn.toolbar').closeToolbar();