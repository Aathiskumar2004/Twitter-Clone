import {tweetsData} from "./data.js";
 console.log(tweetsData);

 const tweetbtn =document.getElementById("tweet-btn");
 const tweetinput = document.getElementById("tweet-input");
 const feed = document.getElementById("feed");


  document.addEventListener("click",function(e){
    if(e.target.dataset.like){
console.log(e.target.dataset.like);

handleLikeClick(e.target.dataset.like);


 } else if( e.target.dataset.reply){
    // console.log(e.target.dataset.reply);
    handleReplayCLick(e.target.dataset.reply)
 } else if(e.target.dataset.retweet){
    // console.log(e.target.dataset.retweet);
   handleRetweetClick(e.target.dataset.retweet);
  
 }

   
   });   

function handleLikeClick(tweetid){
  
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetid
    })[0];
    targetTweetObj.likes;

    if(targetTweetObj.isLiked === false){
        console.log( targetTweetObj.likes++)
       targetTweetObj.isLiked = true;
       
    }  else {
        console.log(targetTweetObj.likes--)
        targetTweetObj.isLiked = false;
    }
    
render();

    console.log(targetTweetObj)
    
}

function handleRetweetClick(tweetid){
  
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetid
    })[0];
    targetTweetObj.retweets;

    if(targetTweetObj.isRetweeted === false){
        console.log( targetTweetObj.retweets++)
       targetTweetObj.isRetweeted = true;
       
    }  else {
        console.log(targetTweetObj.retweets--)
        targetTweetObj.isRetweeted = false;
    }
    
render();

    console.log(targetTweetObj)
    
}

function handleReplayCLick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}


 tweetbtn.addEventListener("click",function(){
    console.log(tweetinput.value);
    tweetinput.value = "";
    
 });
 function getFeedHtml() {
let feedHtml = "";
tweetsData. forEach(function(tweet){
    let likeIconClass = "";
    let retweetIcon = "";
   if (tweet.isLiked){
    likeIconClass = "like";

   }else{
    likeIconClass = ""
   }


if(tweet.isRetweeted){
    retweetIcon = "share";
} else{
    retweetIcon ="";
}


let repliesHtml = "";

if (tweet.replies.length > 0){
    tweet.replies.forEach(function(reply){
        repliesHtml +=`  <div class="tweet-reply">
        <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
        <div>
        <p class="handle">${reply.handle}</p>
        <p >${reply.tweetText}</p>
        </div>
        </div>
        </div>`
    })
}


//   for(let tweet of tweetsData){
    feedHtml += `<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet. tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                   ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIcon}" data-retweet="${tweet.uuid}"></i>
                   ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
<div class="hidden" id="replies-${tweet.uuid}">
${repliesHtml}
</div>`
               
    
  })
  
return feedHtml;
 
 
}
 function render(){
    const post = getFeedHtml();
    feed.innerHTML = post;
    // console.log(post);
    
 }
 render()