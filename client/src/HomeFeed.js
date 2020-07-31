import React, { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import TweetDetails from "./TweetDetails";

const HomeFeed = () => {
  const {
    relevantHomeFeed: { tweetIds, tweetsById },
  } = useContext(CurrentUserContext);

  if (!tweetIds) {
    return null;
  }

  console.log(tweetIds);
  return (
    <MainFeedBodyDiv>
      <NewTweet placeholder="What's on your mind ?" maxlength="20"></NewTweet>
      {tweetIds.map((id) => {
        return (
          <TweetDetails key={id} tweetData={tweetsById[id]}></TweetDetails>
        );
      })}
    </MainFeedBodyDiv>
  );
};

export default HomeFeed;

const MainFeedBodyDiv = styled.div`
  justify-content: center;
  border: 1px;
  border-color: grey;
  border-style: solid;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  align-items: center;
`;

const NewTweet = styled.textarea`
  width: 50%;
  border: 2px blue solid;
  margin-bottom: 15px;
`;
