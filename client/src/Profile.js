import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import TweetDetails from "./TweetDetails";
import ErrorPage from "./ErrorPage";
import styled from "styled-components";
import moment from "moment";

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
    <MainProfileDiv>
      <HeaderDiv>
        <BannerDiv>
          <UserBanner src={bannerSrc}></UserBanner>
        </BannerDiv>
        {/* <ProfilePicDiv> */}
        <ProfilePic src={avatarSrc}></ProfilePic>
        {/* </ProfilePicDiv> */}
        <BioBody>
          <ButtonDiv>
            <FollowButton>{isBeingFollowedByYou}Following</FollowButton>
          </ButtonDiv>
          <BioDiv>
            <Name>{displayName}</Name>
            <HandleFollows>
              @{handle}
              {isFollowingYou}
            </HandleFollows>
            <Bio>{bio}</Bio>
            <LocationJoined>
              {location}
              {joined}
            </LocationJoined>
            <Follows>
              <NumFollowers>{numFollowers}</NumFollowers> Followers
              <NumFollowing>{numFollowing}</NumFollowing> Following
            </Follows>
          </BioDiv>
        </BioBody>
      </HeaderDiv>
      <Tabs>
        <Tweets>Tweets</Tweets>
        <Media>Media</Media>
        <Likes>Likes</Likes>
      </Tabs>
      <TweetsTabBody>
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
      </TweetsTabBody>
    </MainProfileDiv>
  );
};

export default Profile;

const MainProfileDiv = styled.div`
  border: grey solid 1px;
  width: 80%;
  margin: 15px;
`;

const HeaderDiv = styled.div`
  height: 50%50px;
`;

const BannerDiv = styled.div`
  height: 40%;
`;

const UserBanner = styled.img`
  width: 100%;
  height: 100%;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  border: white solid 8px;
  z-index: 9;
  position: absolute;
  top: 25%;
  left: 25%;
  max-width: 250px;
  max-height: 250px;
`;

const BioBody = styled.div`
  padding: 20px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  padding-left: 90%;
`;

const FollowButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  font-size: 18px;
  border-radius: 25px;
`;

const BioDiv = styled.div`
  padding-left: 20px;
  margin-top: -15px;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const HandleFollows = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: row;
`;

const Bio = styled.p`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const LocationJoined = styled.div`
  font-size: 14px;
`;

const Follows = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-top: 10px;
`;

const NumFollowers = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

const NumFollowing = styled.div`
  font-weight: bold;
  margin-right: 5px;
  margin-left: 10px;
`;

const Tabs = styled.div`
  border: grey solid 1px;
  border-bottom: 8px solid #4c00ffba;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Tweets = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Media = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Likes = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const TweetsTabBody = styled.div`
  width: 75%;
`;
