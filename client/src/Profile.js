import React, { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const {
    currentUser: {
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
    },
  } = useContext(CurrentUserContext);

  return (
    <div>
      <div>
        {displayName}
        {location}
      </div>
      <img src={avatarSrc}></img>
    </div>
  );
};

export default Profile;
