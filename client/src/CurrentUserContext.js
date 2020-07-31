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
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
