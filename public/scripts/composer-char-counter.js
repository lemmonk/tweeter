$(document).ready(function() {
 
  setCharacterCountListener();
  setComposeAnimListeners();
  detectWindowPos();

});


const setCharacterCountListener = () => {

  let parseCounter = 0;
  let currentCounterVal = 140;
   
  $("#tweet-text").on('keyup',function() {

    parseCounter = Number($("#tweet-text").val().length);
    currentCounterVal = 140 - parseCounter;

    if (currentCounterVal <= -1) {
      $('output').addClass("counter-error");
    } else {
      $('output').removeClass("counter-error");
    }

    document.getElementsByClassName('counter').counter.value = currentCounterVal;
  
  });
};


const setComposeAnimListeners = () => {

  $('.nav-right').on('click',composeAnimation);
  $('.top-btn').on('click',composeAnimation);
};


let toggle = true;
const composeAnimation = () => {

  let scroll = $(window).scrollTop() > 350;
  
  $('#error-msg').fadeOut('slow');
  
  if (toggle || scroll) {

    toggle = false;
    $(".new-tweet-container").slideDown();
    setTimeout(delayFocus,800);
    

  } else {

    toggle = true;
    $(".new-tweet-container").slideUp();
    
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

  
};


const delayFocus = () => {

  $('#tweet-text').focus();
};


const detectWindowPos = () => {

  $(window).scroll(function() {

    let scroll = $(window).scrollTop();

    if (scroll > 350) {
      $('.nav-bar').css("background-color",'#4056A1');
      $('.top-btn').fadeIn('slow');
      $('.nav-right').fadeOut('slow');
    } else {
      $('.top-btn').fadeOut('slow');
      $('.nav-right').fadeIn('slow');

      if ($(window).width() < 768) {
        $('.nav-bar').css("background-color",'transparent');
      }

    }
   
  });


  $(window).resize(function() {

    if ($(window).width() > 768) {
      $('.nav-bar').css("background-color",'#4056A1');
    } else {
      $('.nav-bar').css("background-color",'transparent');
    }

  });


};