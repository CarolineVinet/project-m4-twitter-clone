import React, { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

import TweetDetails from "./TweetDetails";

const HomeFeed = () => {
  const {
    relevantHomeFeed: { tweetIds, tweetsById },
  } = useContext(CurrentUserContext);

  if (!tweetIds) {
    return null;
  }

  console.log(tweetIds);
  return (
    <div>
      {tweetIds.map((id) => {
        return (
          <TweetDetails key={id} tweetData={tweetsById[id]}></TweetDetails>
        );
      })}
    </div>
  );
};

export default HomeFeed;
