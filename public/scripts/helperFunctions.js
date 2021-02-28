//checks weather or not a tweet has met the requirments necessary to be posted to the app.
const validateTweet = tweet => {

  let error = $('#error-msg');
 
  if (!tweet) {
    error.html('🚫 Invalid Tweet');
    error.fadeIn('slow');
    return false;
  } else if (tweet.length > 140) {
    error.html('🚫 Tweets must be 140 characters or less');
    error.fadeIn('slow');
    return false;
  }
  return true;
};

//secures user input to avoid melicious code from being injected into the app.
const secureInputTweet =  tweet => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(tweet));
  return div.innerHTML;
};

// adds an event listener to the main 'Tweeter' icon so a user can refresh the page.
const setRefreshListener = () => {

  $('#nav-icon').on('click', () => {
    location.reload();
  })
}