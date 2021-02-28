//waits for the document to be ready and then sets listeners
$(document).ready(function() {
  setCharacterCountListener();
});

//counts how many characters the user has typed and displays an error if they have exceeded the limit.
const setCharacterCountListener = () => {

  let parseCounter = 0;
  let currentCounterVal = 140;
   
  $("#tweet-text").on('keyup', () => {

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




