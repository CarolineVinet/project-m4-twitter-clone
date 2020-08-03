import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import ActionBar from "./ActionBar";

const SingleTweet = () => {
  const {
    selectedTweetId,
    relevantHomeFeed: { tweetsById },
    getUserProfile,
  } = useContext(CurrentUserContext);
  const renderedTweet = tweetsById[selectedTweetId];
  const date = renderedTweet.timestamp;
  const formattedDate = moment(date).format("h:mm a , MMMM Do YYYY");

  return (
    <SingleTweetMainDiv>
      <CurrentPage>Meow</CurrentPage>
      <TweetDiv>
        <Header aria-label="Tweet header. Link to tweet author's profile page">
          <StyledLink
            onClick={() => getUserProfile(renderedTweet.author.handle)}
            to={`/profile/${renderedTweet.author.handle}`}
          >
            <Avatar src={renderedTweet.author.avatarSrc}></Avatar>
            <TweetAuthor>
              <AuthorName aria-label="Tweet author's name">
                {renderedTweet.author.displayName}
              </AuthorName>
              <AuthorHandle aria-label="Tweet author's handle">
                {" "}
                @{renderedTweet.author.handle}
              </AuthorHandle>
            </TweetAuthor>
          </StyledLink>
        </Header>

        <TweetBody>
          <TweetStatus>{renderedTweet.status}</TweetStatus>
          {renderedTweet.media.length > 0 ? (
            <MediaDiv>
              {" "}
              <TweetMedia src={renderedTweet.media[0].url}></TweetMedia>
            </MediaDiv>
          ) : null}
          <TimeAndPlace>
            {formattedDate}{" "}
            {renderedTweet.author.location
              ? "- " + renderedTweet.author.location
              : null}
          </TimeAndPlace>
        </TweetBody>
        <ActionBar />
      </TweetDiv>
    </SingleTweetMainDiv>
  );
};

const SingleTweetMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  width: 100%;
`;

const TweetDiv = styled.div`
  border: 1px grey solid;
  border-radius: 8px;
  box-shadow: 2px 2px 5px grey;
  width: 50%;
  margin-bottom: 20px;
  justify-content: left;
`;

const CurrentPage = styled.div`
  font-size: 24px;
  padding: 5px;
  font-weight: bold;
  color: black;
  justify-content: left;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e2e2;
  margin-right: 5%;
  margin-left: 5%;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const TweetAuthor = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  align-items: center;
  font-size: 16px;
`;

const AuthorHandle = styled.p`
  font-size: 14px;
  margin-left: 1px;
  margin-right: 5px;
  margin-top: 3px;
`;

const AuthorName = styled.p`
  font-weight: bold;
`;

const TimeAndPlace = styled.p`
  font-size: 14px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5px;
  padding-left: 20px;
  border-top: 1px solid #e2e2e2;
`;

const TweetBody = styled.div``;

const TweetStatus = styled.div`
  justify-content: left;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 20px;
`;

const MediaDiv = styled.div`
  width: 80%;
  margin-right: 10%;
  margin-left: 10%;
`;

const TweetMedia = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
`;

export default SingleTweet;
