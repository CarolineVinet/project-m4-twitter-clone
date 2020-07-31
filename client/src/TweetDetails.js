import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const TweetDetails = ({ tweetData }) => {
  const { getUserProfile, setSelectedTweetId } = useContext(CurrentUserContext);
  return (
    <TweetDiv>
      <Header>
        <StyledLink
          onClick={() => getUserProfile(tweetData.author.handle)}
          to={`/profile/${tweetData.author.handle}`}
        >
          <Avatar src={tweetData.author.avatarSrc}></Avatar>
          {tweetData.author.handle}
          {tweetData.author.displayName}
        </StyledLink>
      </Header>

      <TweetBody>
        <StyledLink
          onClick={() => setSelectedTweetId(tweetData.id)}
          to={`/tweet/${tweetData.id}`}
        >
          {tweetData.status}
          {tweetData.media.length > 0 ? (
            <TweetMedia src={tweetData.media[0].url}></TweetMedia>
          ) : null}
        </StyledLink>
      </TweetBody>
    </TweetDiv>
  );
};

const TweetDiv = styled.div``;

const Header = styled.div``;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const TweetBody = styled.div``;

const TweetMedia = styled.img`
  max-width: 600px;
  max-height: 600px; /*MAKE THOSE PERCENTAGES*/
  border-radius: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  }
`;

export default TweetDetails;
