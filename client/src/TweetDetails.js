import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import ActionBar from "./ActionBar";

const TweetDetails = ({ tweetData }) => {
  const { getUserProfile, setSelectedTweetId } = useContext(CurrentUserContext);
  return (
    <TweetDiv>
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
  margin: auto;
  border: 1px;
  border-color: grey;
  border-style: solid;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  width: 90%;
`;

const TweetBody = styled.div``;

const Header = styled.div`
  width: 40%;
  margin-bottom: 5px;
`;

const TweetAuthor = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const AuthorHandle = styled.p`
  font-size: 12px;
`;

const AuthorName = styled.p`
  font-weight: bold;
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
  display:flex;
  }
`;

export default TweetDetails;
