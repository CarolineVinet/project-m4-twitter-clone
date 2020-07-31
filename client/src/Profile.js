import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { selectedProfile, currentUser, status, getUserProfile } = useContext(
    CurrentUserContext
  );
  const { id } = useParams();

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
    </div>
  );
};

export default Profile;
