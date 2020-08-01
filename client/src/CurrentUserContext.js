import React from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
  const [sidebarStatus, setSidebarStatus] = React.useState("loading");
  const [relevantHomeFeed, setRelevantHomeFeed] = React.useState({});
  const [selectedTweetId, setSelectedTweetId] = React.useState("");
  const [selectedProfile, setSelectedProfile] = React.useState({});

  React.useEffect(() => {
    fetch(`/api/me/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrentUser(data);
        setSidebarStatus("loaded");
      });
  });

  React.useEffect(() => {
    fetch(`/api/me/home-feed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((feedResponse) => {
        return feedResponse.json();
      })
      .then((feedData) => {
        setRelevantHomeFeed(feedData);
        setStatus("loaded");
      })
      .catch((error) => {
        setStatus("error");
      });
  }, []);

  const getUserProfile = (userHandle) => {
    setStatus("loading");

    fetch(`/api/${userHandle}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((profileResponse) => {
        return profileResponse.json();
      })
      .then((profileData) => {
        setSelectedProfile(profileData);
        setStatus("loaded");
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const postNewTweet = (text) => {
    fetch(`/api/tweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: text,
      }),
    })
      .then((postResponse) => {
        return postResponse.json();
      })
      .then((postData) => {
        fetch(`/api/me/home-feed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((feedResponse) => {
            return feedResponse.json();
          })
          .then((feedData) => {
            setRelevantHomeFeed(feedData);
            setStatus("loaded");
          })
          .catch((error) => {
            setStatus("error");
          });
      });
  };

  const toggleLike = (tweetId, isLiked) => {
    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: !isLiked,
      }),
    })
      .then((likedResponse) => {
        return likedResponse.json();
      })
      .then(() => {
        const matchingLikedTweet = relevantHomeFeed.tweetsById[tweetId];

        matchingLikedTweet.isLiked = !isLiked;

        let newNumLikes;
        if (isLiked) {
          newNumLikes = matchingLikedTweet.numLikes - 1;
        } else if (!isLiked) {
          newNumLikes = matchingLikedTweet.numLikes + 1;
        }

        matchingLikedTweet.numLikes = newNumLikes;

        setRelevantHomeFeed({
          tweetsById: {
            ...relevantHomeFeed.tweetsById,
            [tweetId]: matchingLikedTweet,
          },
          tweetIds: relevantHomeFeed.tweetIds,
        });
      });
  };

  const toggleRetweet = (tweetId, isRetweeted) => {
    fetch(`/api/tweet/${tweetId}/retweet`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        retweet: !isRetweeted,
      }),
    })
      .then((retweetResponse) => {
        return retweetResponse.json();
      })
      .then(() => {
        const matchingRetweetedTweet = relevantHomeFeed.tweetsById[tweetId];

        matchingRetweetedTweet.isRetweeted = !isRetweeted;

        let newNumRetweets;
        if (isRetweeted) {
          newNumRetweets = matchingRetweetedTweet.numRetweets - 1;
        } else if (!isRetweeted) {
          newNumRetweets = matchingRetweetedTweet.numRetweets + 1;
        }

        matchingRetweetedTweet.numRetweets = newNumRetweets;

        setRelevantHomeFeed({
          tweetsById: {
            ...relevantHomeFeed.tweetsById,
            [tweetId]: matchingRetweetedTweet,
          },
          tweetIds: relevantHomeFeed.tweetIds,
        });
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        getUserProfile,
        status,
        relevantHomeFeed,
        selectedTweetId,
        setSelectedTweetId,
        selectedProfile,
        setSelectedProfile,
        postNewTweet,
        sidebarStatus,
        toggleLike,
        toggleRetweet,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
