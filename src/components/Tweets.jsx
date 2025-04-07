import LikeTweet from "./LikeTweet"; // Import LikeTweet component

const Tweets = ({ tweets, shortAddress, contract, account, getTweets }) => {
  return (
    <div id="tweetsContainer">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet">
          <img
            className="user-icon"
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${tweet.author}`}
            alt="User Icon"
          />
          <div className="tweet-inner">
            <div className="author">{shortAddress(tweet.author)}</div>
            <div className="content">{tweet.content}</div>
            <div className="like-container">
              <LikeTweet 
                tweetId={tweet.id}  // Pass tweet ID
                tweetAuthor={tweet.author} // Pass tweet author's address
                contract={contract}  // Pass contract object
                account={account}    // Pass account
                getTweets={getTweets} // Pass the function to refresh tweets
                likes={tweet.likes}  // Pass the like count from the tweet
              />
              <span className="likes-count">{tweet.likes}</span> {/* Display likes */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tweets;
