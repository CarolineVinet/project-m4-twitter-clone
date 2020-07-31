import React from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
  const [relevantHomeFeed, setRelevantHomeFeed] = React.useState({});

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

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, relevantHomeFeed }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
