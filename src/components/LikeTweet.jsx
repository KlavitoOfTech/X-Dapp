import React, { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Import the heart icon
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

export default function LikeTweet({ tweetId, contract, account, getTweets, tweetAuthor, likes }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes); // Store the number of likes
  const [loading, setLoading] = useState(false); // Loading state for the spinner

  // Define likeTweet function as a const
  const likeTweet = async () => {
    setLoading(true); // Start loading when the heart is clicked
    try {
      // Pass both author and tweetId to the likeTweet function
      await contract.methods.likeTweet(tweetAuthor, tweetId).send({ from: account });

      // After liking, fetch the updated tweet and like count
      await getTweets(); // Refresh the tweets after liking the tweet

      // Update the local liked state (this may be unnecessary if `getTweets()` correctly fetches data)
      setLiked(true);
      setLikeCount(likeCount + 1); // Optionally update like count locally
    } catch (error) {
      console.error("Error liking tweet:", error);
    } finally {
      setLoading(false); // Stop loading once the transaction is done
    }
  };

  return (
    <div className="like-container">
      {loading ? (
        <FaSpinner className="spinner" style={{ fontSize: "18px", animation: "spin 1s linear infinite" }} />
      ) : (
        <FaHeart
          className={`like-icon ${liked ? "liked" : ""}`}
          onClick={likeTweet}
          style={{ cursor: "pointer", fontSize: "18px" }}
        />
      )}
    </div>
  );
}
