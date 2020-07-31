import React from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
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
          });
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
        // console.log(postData);
        // setRelevantHomeFeed({
        //   tweetIds: relevantHomeFeed.tweetIds.concat([postData.tweet.id]),
        //   tweetsById: {
        //     ...relevantHomeFeed.tweetsById,
        //     [postData.id]: postData.tweet,
        //   },
        // });
        // setStatus("loaded");

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
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
