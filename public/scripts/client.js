/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
 
  fetchTweets();
  postTweet();
    
});




const createTweetElement = tweetData => {

  const tweetElements = [];
  let $tweet = '';
  let plural = '';


  for (const data of tweetData) {

    const days = calcDaysFromCreated(data.created_at);
    days === 1 ? plural = '' : plural = 's';

    const securedContent = `<h4>${secureInputStr(data.content.text)}</h4>`;
 
    $tweet = `<article class="old-tweet-article">
    <header class="old-tweet-header">
      <div class="old-tweeter">
        <img src="${data.user.avatars}" />
        <h4>${data.user.name}</h4>
      </div>
      <p>${data.user.handle}</p>
    </header>
    <div class="old-tweet-body">
      
        ${securedContent}
      
    </div>
    <footer class="old-tweet-footer">
      <p>${days} day${plural} ago</p>
      <div class="old-tweet-actions">
        <img src="images/flag-24.png" />
        <img src="images/arrows-24.png" />
        <img src="images/heart-24.png" />
      </div>
    </footer>
    </article>`;

    tweetElements.push($tweet);
  }

  return tweetElements;

};


const renderTweets = data => {

  $("#old-tweet-container").empty();
  $('#tweet-text').val('');
  document.getElementsByClassName('counter').counter.value = 140;
  const $tweets = createTweetElement(data.reverse());

  for (const tweet of $tweets) {
   
    $('#old-tweet-container').append(tweet);
    
  }

};


//AJAX GET


const fetchTweets = () => {

  $.ajax({
    url: '/tweets',
    type: 'GET',
   
    success: function(data) {
      
      renderTweets(data);
    },
    error: function(error) {
      alert(error.responseText);
    },
  });
};



//AJAX POST

const validateTweet = tweet => {

  let validated = true;
  let error = $('#error-msg');
 
  if (!tweet) {
  
    error.html('🚫 Invalid Tweet');
    error.css.display = 'none';
    error.fadeIn('slow');
    validated = false;

  } else if (tweet.length > 140) {
    
    error.html('🚫 Tweets must be 140 characters or less');
    error.css.display = 'none';
    error.fadeIn('slow');
    validated = false;

  }

  return validated;
};

const postTweet = () => {

  $('form').on('submit',function(event) {
    event.preventDefault();
 

    const validated = validateTweet($('#tweet-text').val());

    if (!validated) {
      return;
    }
   
    $('#tweet-btn').html('Tweet...');
    $('#error-msg').fadeOut('slow');

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $('#tweet-text').serialize(),
     
      success: function() {
        fetchTweets();
        
      },
      error: function(error) {
        alert(error.responseText);
      },
    });
  
    setTimeout(delay,500);

  });

};




//Helper functions

const delay = () => {
  $('#tweet-btn').html('Tweet');
};

const calcDaysFromCreated = created => {

  let today = new Date();
  let posted = new Date(created);
  let diff = today.getTime() - posted.getTime();
  let miliSecsInDay = 1000 * 60 * 60 * 24;
  let days = Math.round(diff / miliSecsInDay);
 
  return days;

};

const secureInputStr =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};