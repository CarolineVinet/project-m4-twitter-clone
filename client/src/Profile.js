import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import TweetDetails from "./TweetDetails";
import ErrorPage from "./ErrorPage";
import styled from "styled-components";
import moment from "moment";
import { GrLocation } from "react-icons/gr";
import { FiCalendar } from "react-icons/fi";

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
      <BorderWrapper>
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
                {isFollowingYou ? <FollowsYou>Following You</FollowsYou> : null}
              </HandleFollows>
              <Bio>{bio}</Bio>
              <LocationJoined>
                <Location>
                  <GrLocation />
                  {"  " + location}
                </Location>{" "}
                <DateJoined>
                  <FiCalendar />
                  {"  Joined " + moment(joined).format("MMMM YYYY")}
                </DateJoined>
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
      </BorderWrapper>
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
  /* border: grey solid 1px; */
  width: 60%;
  margin: 15px;
`;

const BorderWrapper = styled.div`
  border: grey solid 1px;
  border-bottom: none;
  /* width: 60%;
  margin: 15px; */
`;

const FollowsYou = styled.span`
  background-color: lightgray;
  border-radius: 5px;
  color: charcoal;
  font-size: 12px;
  margin-left: 5px;
  padding: 0px 3px;
`;

const HeaderDiv = styled.div``;

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
  top: 20%;
  left: 27%;
  max-width: 220px;
  max-height: 220px;
`;

const BioBody = styled.div`
  padding: 20px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  padding-left: 80%;
`;

const FollowButton = styled.button`
  background-color: #4c00ffba;
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
  align-items: center;
  display: flex;
  font-size: 14px;
  flex-direction: row;
`;

const Bio = styled.p`
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 16px;
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
  border-bottom: 1px solid grey;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Tweets = styled.div`
  font-size: 18px;
  font-weight: bold;
  &:hover {
    color: #4c00ffba;
    text-decoration: underline;
  }
`;

const Media = styled.div`
  font-size: 18px;
  font-weight: bold;
  &:hover {
    color: #4c00ffba;
    text-decoration: underline;
  }
`;

const Likes = styled.div`
  font-size: 18px;
  font-weight: bold;
  &:hover {
    color: #4c00ffba;
    text-decoration: underline;
  }
`;

const Location = styled.span`
  padding: 0px 5px;
`;
const DateJoined = styled.span`
  padding: 0px 5px;
`;

const TweetsTabBody = styled.div``;
