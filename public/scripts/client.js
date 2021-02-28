//waits for the document to be ready and then sets listeners and fetches database tweet content.
$(document).ready(function() {
  fetchTweets();
  setSubmitTweetListener();
  setRefreshListener();
});

// AJAX GET -> fetches all existing tweets in the database.
const fetchTweets = () => {

  $.ajax({
    url: '/tweets',
    type: 'GET',
   
    success: function(data) {
      renderTweets(data.reverse());
    },
    error: function(error) {
      alert(error.responseText);
    },
  });
};

// creates an array of html elements from the fetched tweet data; 
const createTweetElement = tweetData => {

  const tweetElements = [];
  
  for (const data of tweetData) {

  const securedContent = `<h4>${secureInputTweet(data.content.text)}</h4>`;
 
  const $tweet = `<article class="old-tweet-article">
    <header class="old-tweet-header">
      <div class="old-tweeter">
        <img src="${data.user.avatars}" />
        <h4>${data.user.name}</h4>
      </div>
      <p>${data.user.handle}</p>
    </header>
    <div class="old-tweet-body">${securedContent}</div>
    <footer class="old-tweet-footer">
      <p>${new Date(data.created_at).toLocaleString()}</p>
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

// renders all pre-built tweet elements to the apps UI.
const renderTweets = data => {

  $("#old-tweet-container").empty();
  $('#tweet-text').val('');
  document.getElementsByClassName('counter').counter.value = 140;
  const $tweets = createTweetElement(data);

  for (const tweet of $tweets) {
    $('#old-tweet-container').append(tweet);
  }
};

//AJAX POST -> allows a user to post a new tweet.
const setSubmitTweetListener = () => {

  $('form').on('submit', (event) => {
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
     
      success: () => {
        fetchTweets();
      },
      error: error => {
        alert(error.responseText);
      },
    });
    setTimeout(delay,500);
  });
};

