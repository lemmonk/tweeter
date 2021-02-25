$(document).ready(function() {
 
initCharacterCountListener();
setComposeAnimListeners();
detectWindowPos();

});


const initCharacterCountListener = event => {

   let parseCounter = 0;
   let calcCounter = 140;
   let charLimit = document.getElementsByClassName('counter');

  
    $("#tweet-text").on('keyup',function(event) {

    parseCounter = Number($("#tweet-text").val().length);
    calcCounter = 140 - parseCounter;

    if (calcCounter <= -1) {
      $('output').addClass("counter-error");
    } else {
      $('output').removeClass("counter-error");
    }

    charLimit.counter.value = calcCounter;
  
  });
};


const setComposeAnimListeners = () => {

  $('.nav-right').on('click',composeAnimation);
  $('.top-btn').on('click',composeAnimation);
}


let toggle = true;
const composeAnimation = () => {

  let scroll = $(window).scrollTop() > 400;
  

  $('#error-msg').fadeOut('slow');
  
  if (toggle || scroll){

    toggle = false;
    $(".new-tweet-container").slideDown();
    setTimeout(delayFocus,1000);
    

  } else {

    toggle = true;
    $(".new-tweet-container").slideUp();
    
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

  
}


const delayFocus = () => {

  $('#tweet-text').focus();
}


const detectWindowPos = () => {

  $(window).scroll(function (event) {

    let scroll = $(window).scrollTop();

    if (scroll > 400) {
      $('.top-btn').fadeIn('slow');
      $('.nav-right').fadeOut('slow');
    } else {
      $('.top-btn').fadeOut('slow');
      $('.nav-right').fadeIn('slow');
    }

});
}