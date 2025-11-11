import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { tweetsData } from "./data.js";
const tweetInput = document.getElementById("tweet-input");
// const tweetBtn = document.getElementById("tweet-btn");

document.addEventListener("click", function (e) {
  // console.log(e.target.dataset.retweet);
  // if (e.target.dataset.like) {
  //   console.log(e.target.dataset.like);
  // }
  if (e.target.dataset.like) {
    console.log(e);
    // console.log(e.target.dataset.like);
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
  if (tweetInput.value) {
    // console.log(tweetInput.value);
    tweetsData.unshift({
      handle: `@Tim Cook`,
      profilePic: `images/catSwag.jpg`,
      likes: 27,
      retweets: 10,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
  }

  tweetInput.value = "";
  console.log(tweetsData);
  render();
}
function getFeedHtml() {
  let feedHtml = "";
  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        // tweet = big object, replies means the array that is inside that object
        // console.log(reply);
        repliesHtml += `
        <div class="tweet-reply">
        <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
        <div>
        <p class="handle">${reply.handle}</p>
        <p >${reply.tweetText}</p>
        </div>
        </div>
        </div>
        `;
      });
    }

    feedHtml += `<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i id="likeIcon" class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>
</div>  `;
  });
  return feedHtml;
}

function handleLikeClick(tweetID) {
  //  console.log(tweetID)
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetID;
  })[0];

  // console.log(targetTweetObj);
  if (targetTweetObj.isLiked) {
    // targetTweetObj.likes = targetTweetObj.likes - 1;
    targetTweetObj.likes--;
    targetTweetObj.isLiked = false;
  } else {
    targetTweetObj.likes++;
    targetTweetObj.isLiked = true;
  }
  render();
  // console.log("Array", tweetIdObj);
  // let tweetObjSingle = tweetIdObj[0];

  // tweetObjSingle.likes += 1;
  // console.log(tweetObjSingle);
}

function handleRetweetClick(tweetID) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    // console.log(tweet);
    return tweet.uuid === tweetID;
  })[0];
  // console.log(targetTweetObj);
  if (targetTweetObj.isRetweeted) {
    //  if will run if someone has already retweeted = true and number of retweet increased and so it will decrease it and tell us i have decreased a number so retweet has become false
    targetTweetObj.retweets--;
    targetTweetObj.isRetweeted = false;
  } else {
    //  else will run if it is not retweeted or retweeted = false and number of retweet will be increased and retweeted will become true cos we increased the count.
    targetTweetObj.retweets++;
    targetTweetObj.isRetweeted = true;
  }
  render();
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
