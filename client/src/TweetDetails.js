import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import ActionBar from "./ActionBar";
import moment from "moment";
import { AiOutlineRetweet } from "react-icons/ai";

const TweetDetails = ({ tweetData }) => {
  const date = tweetData.timestamp;
  const formattedDate = moment(date).format("MMM Do");
  const { getUserProfile, setSelectedTweetId } = useContext(CurrentUserContext);
  return (
    <TweetDiv>
      {tweetData.retweetFrom && (
        <RetweetedBy>
          <AiOutlineRetweet />
          {"   "} Retweeted by {tweetData.retweetFrom.handle}
        </RetweetedBy>
      )}
      <Header aria-label="Tweet header. Link to tweet author's profile page">
        <StyledLink
          onClick={() => getUserProfile(tweetData.author.handle)}
          to={`/profile/${tweetData.author.handle}`}
        >
          <Avatar src={tweetData.author.avatarSrc}></Avatar>

          <TweetAuthor>
            <AuthorName aria-label="Tweet author's name">
              {tweetData.author.displayName}
            </AuthorName>
            <AuthorHandle aria-label="Tweet author's handle">
              {" "}
              @{tweetData.author.handle}
            </AuthorHandle>
            <Time> - {formattedDate}</Time>
          </TweetAuthor>
        </StyledLink>
      </Header>

      <StyledLink
        onClick={() => setSelectedTweetId(tweetData.id)}
        to={`/tweet/${tweetData.id}`}
      >
        <TweetBody aria-label="Body of tweet. Link to expanded tweet view.">
          <TweetStatus aria-label="tweet status">
            {" "}
            {tweetData.status}
          </TweetStatus>
          {tweetData.media.length > 0 ? (
            <TweetMedia src={tweetData.media[0].url}></TweetMedia>
          ) : null}
        </TweetBody>
      </StyledLink>
      <ActionBar
        isLiked={tweetData.isLiked}
        isRetweeted={tweetData.isRetweeted}
        numLikes={tweetData.numLikes}
        numRetweets={tweetData.numRetweets}
        tweetId={tweetData.id}
      />
    </TweetDiv>
  );
};

const TweetDiv = styled.div`
  border: 1px grey solid;
  padding: 15px;
  width: 90%;
  margin-bottom: 15px;
  box-shadow: 2px 2px 5px #a9a8ae;
  border-radius: 5px;
`;

const TweetBody = styled.div`
  margin-left: 50px;
  margin-bottom: 15px;
`;

const RetweetedBy = styled.div`
  font-style: italic;
  font-size: 12px;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: -15px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
`;

const TweetAuthor = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  align-items: top;
`;
const AuthorHandle = styled.p`
  font-size: 12px;
  margin-left: 1px;
  margin-right: 5px;
  margin-top: 3px;
`;

const AuthorName = styled.p`
  font-weight: bold;
`;

const Time = styled.p`
  font-size: 13px;
  margin-top: 3px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const TweetStatus = styled.div`
  justify-content: left;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin-left: 20px;
  margin-bottom: 5px;
`;

const TweetMedia = styled.img`
  max-width: 10%;
  max-height: 10%;
  border-radius: 5px;
  margin-left: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
`;

export default TweetDetails;
