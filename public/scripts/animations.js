//waits for the document to be ready and then sets listeners
$(document).ready(function() {
  setComposeAnimListeners();
  detectWindowPos();
});

const setComposeAnimListeners = () => {
  $('.nav-right').on('click',composeAnimation);
  $('.top-btn').on('click',composeAnimation);
};

//toogles the compose tweet animation between active and inactive.
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

// listens for the current scroll position and window resize events, triggering UI manipulation accordingly.
const detectWindowPos = () => {

  $(window).scroll( () => {

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

  $(window).resize( () => {

    if ($(window).width() > 768) {
      $('.nav-bar').css("background-color",'#4056A1');
    } else {
      $('.nav-bar').css("background-color",'transparent');
    }

  });
};

// adds a slight delay before calling 'focus' on the tweet input text.  This is to allow the compose animation to complete and avoiding any janky UI.
const delayFocus = () => {
  $('#tweet-text').focus();
};

// adds a slight delay after a new tweet is posted to give a loading effect.
const delay = () => {
  $('#tweet-btn').html('Tweet');
};