import React, { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import TweetDetails from "./TweetDetails";
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
    statusOfTweetPost,
    currentUser,
  } = useContext(CurrentUserContext);

  if (sidebarStatus !== "loaded") {
    return (
      <FirstSpinnerDiv>
        <Spinner />
      </FirstSpinnerDiv>
    );
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  if (status === "loading") {
    return (
      <SecondSpinnerDiv>
        <Spinner />
      </SecondSpinnerDiv>
    );
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
      <CurrentPage>Home</CurrentPage>
      <InputDiv>
        <TopInputDiv>
          <AvaDiv>
            <MyAvatar src={currentUser.profile.avatarSrc}></MyAvatar>
          </AvaDiv>
          <NewTweetInput
            aria-label="input area for new tweet"
            placeholder="What's on your mind ?"
            rows="6"
            cols="60"
            onChange={(event) => setTextInput(event.target.value)}
          ></NewTweetInput>
        </TopInputDiv>
        <BottomInputDiv>
          {statusOfTweetPost === "error" && (
            <PostError>
              Something went wrong! Please try Meowing again.
            </PostError>
          )}
          <InputCalculator textInput={textInput} />
          <MeowDiv>
            <MeowButton onClick={textSubmitClick}>Meow</MeowButton>
          </MeowDiv>
        </BottomInputDiv>
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

const FirstSpinnerDiv = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
`;

const SecondSpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const MainFeedBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;
const CurrentPage = styled.div`
  font-size: 24px;
  padding-right: 60%;
  padding-top: 15px;
  font-weight: bold;
  color: black;
  justify-content: left;
  margin-bottom: 15px;
`;

const InputDiv = styled.div`
  border: 1px solid grey;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 9px solid #4c00ffba;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

const TopInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const AvaDiv = styled.div`
  margin-right: 10px;
`;

const MyAvatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  text-shadow: 2px 2px 5px grey;
`;

const MeowDiv = styled.div``;

const MeowButton = styled.button`
  background-color: #7c45ff;
  color: #ffffff;
  height: 40px;
  width: 80px;
  margin-left: 5px;
  border-radius: 20px;
  &:hover {
    background-color: #d1c1f6;
    transition: 500ms;
  }
  &:focus {
    outline: none;
    background-color: #d1c1f6;
  }
  &:active {
    transform: translateY(4px);
  }
`;

const NewTweetInput = styled.textarea`
  width: 80%;
  padding-top: 10px;
  font-size: 18px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const BottomInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const PostError = styled.p`
  color: red;
`;
