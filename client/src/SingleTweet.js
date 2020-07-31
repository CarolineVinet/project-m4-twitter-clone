import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const SingleTweet = () => {
  const {
    selectedTweetId,
    relevantHomeFeed: { tweetsById },
  } = useContext(CurrentUserContext);
  const renderedTweet = tweetsById[selectedTweetId];
  const date = renderedTweet.timestamp;
  const formattedDate = moment(date).format("h:mm a , MMMM Do YYYY");

  return (
    <TweetDiv>
      <Header>
        <Avatar src={renderedTweet.author.avatarSrc}></Avatar>
        {renderedTweet.author.handle}
        {renderedTweet.author.displayName}
      </Header>

      <TweetBody>
        {renderedTweet.status}
        {renderedTweet.media.length > 0 ? (
          <TweetMedia src={renderedTweet.media[0].url}></TweetMedia>
        ) : null}
        <TimeAndPlace>
          {formattedDate}
          {renderedTweet.author.location}
        </TimeAndPlace>
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

const TimeAndPlace = styled.p``;

export default SingleTweet;
