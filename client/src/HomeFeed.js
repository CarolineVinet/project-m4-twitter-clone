import React, { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import TweetDetails from "./TweetDetails";
import { COLORS } from "./constants";
import ErrorPage from "./ErrorPage";
import Spinner from "./Spinner";
import InputCalculator from "./InputCalculator";

const HomeFeed = () => {
  const [textInput, setTextInput] = React.useState("");
  const {
    relevantHomeFeed: { tweetIds, tweetsById },
    postNewTweet,
    status,
    sidebarStatus,
  } = useContext(CurrentUserContext);

  if (sidebarStatus !== "loaded") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  if (status === "loading") {
    return <Spinner />;
  }

  if (!tweetIds) {
    return null;
  }

  const textSubmitClick = () => {
    if (textInput.length > 280) {
      return null;
    } else {
      postNewTweet(textInput);
    }
  };

  return (
    <MainFeedBodyDiv>
      <InputDiv>
        <NewTweetInput
          aria-label="input area for new tweet"
          placeholder="What's on your mind ?"
          onChange={(event) => setTextInput(event.target.value)}
        ></NewTweetInput>
        <InputCalculator textInput={textInput} />
        <MeowButton onClick={textSubmitClick}>Meow</MeowButton>
      </InputDiv>
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

const InputDiv = styled.div`
  border: 2px grey solid;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const MeowButton = styled.button`
  background-color: ${COLORS.primary};
  color: white;
  height: 40px;
  width: 80px;
  border-radius: 20px;
  &:hover {
    background-color: purple;
    transition: 500ms;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(4px);
  }
`;

const NewTweetInput = styled.textarea`
  width: 50%;
  border: 2px blue solid;
  margin-bottom: 15px;
`;
