const escapeHTML = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (data) => {
  var date = timeago.format(data.created_at);
  const content = escapeHTML(data.content.text);
  const $tweet = $(`
  <section class="existing-tweet"><article class="existing-tweet-article">
          <header> 🧒 ${escapeHTML(data.user.name)} </header>
          <p>${content}</p>
          <footer class="existing-tweet-footer">${date}
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>  </section>`)
  return $tweet;
}

const renderTweets = (data) => {
  $('#tweets-container').empty();
  for (let eachUser of data) {
    const $tweet = createTweetElement(eachUser);
    $('#tweets-container').append($tweet);
  }
  return;
}

// renderTweets(data);

const loadtweets = () => {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
  }).then((res) => {
    renderTweets(res);
  })
}

$('#submit-button').submit(function (event) {
  const $tweetText = $('#tweet-text').serialize();
  console.log('tweet submit!');
  console.log($tweetText);
  event.preventDefault();
  if (!$('#tweet-text').val()) {
    $('#error-message').css('display', 'flex');
    $('#error-p').html('Tweetes can not be empty!')
    return;
  } else if ($('#tweet-text').val().length > 140) {   
    $('#error-message').css('display', 'flex');
    $('#error-p').html('Too Long! Please enter within 140 characters!')
    return;
  } else {
    $('#error-message').css('display', 'none');
    $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'POST',
    data:$tweetText
  }).then((res)=> {
    loadtweets();
    $('#tweet-text').val("");
    $('#counter-number').val('140');
})
  }  
})


loadtweets();

