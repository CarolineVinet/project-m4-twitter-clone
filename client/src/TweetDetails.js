import React from "react";

const TweetDetails = ({ tweetData }) => {
  console.log("tweet data", tweetData);

  return (
    <p>
      {tweetData.status}
      {tweetData.isLiked}
    </p>
  );
};

export default TweetDetails;
