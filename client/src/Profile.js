import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import TweetDetails from "./TweetDetails";
import ErrorPage from "./ErrorPage";
import styled from "styled-components";

const Profile = () => {
  const {
    selectedProfile,
    currentUser,
    status,
    getUserProfile,
    relevantHomeFeed: { tweetsById, tweetIds },
  } = useContext(CurrentUserContext);
  const { id } = useParams();

  if (status === "error") {
    return <ErrorPage />;
  }

  if (status === "loading") {
    return <div>Fetching Profile</div>;
  }

  let user = {};

  if (id === currentUser.profile.handle) {
    user = currentUser;
  } else {
    if (!selectedProfile || !selectedProfile.profile) {
      getUserProfile(id);
      return null;
    }

    user = selectedProfile;
  }

  const {
    profile: {
      avatarSrc,
      bannerSrc,
      bio,
      displayName,
      handle,
      isBeingFollowedByYou,
      isFollowingYou,
      joined,
      location,
      numFollowers,
      numFollowing,
      numLikes,
    },
  } = user;

  return (
    <div>
      <div>
        {displayName}
        {location}
      </div>
      <img src={avatarSrc}></img>
      <div>
        <Tabs>
          <div>Tweets</div>
          <div>Media</div>
          <div>Likes</div>
        </Tabs>

        {tweetIds.map((tweetId) => {
          if (
            tweetsById[tweetId].author.handle === id ||
            (tweetsById[tweetId].retweetFrom &&
              tweetsById[tweetId].retweetFrom.handle === id)
          ) {
            return (
              <TweetDetails
                key={tweetId}
                tweetData={tweetsById[tweetId]}
              ></TweetDetails>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Profile;

const Tabs = styled.div``;
