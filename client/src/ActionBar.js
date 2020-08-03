import React, { useContext } from "react";
import styled from "styled-components";
import { BsChat } from "react-icons/bs";
import { AiOutlineRetweet, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";

const ToggledHeart = ({ isLiked }) => {
  if (isLiked) {
    return <AiFillHeart color="red" />;
  } else {
    return <AiOutlineHeart />;
  }
};

const ToggleRetweetIcon = ({ isRetweeted }) => {
  if (isRetweeted) {
    return <AiOutlineRetweet color="limegreen" />;
  } else {
    return <AiOutlineRetweet />;
  }
};

const ActionBar = ({
  isLiked,
  isRetweeted,
  numLikes,
  numRetweets,
  tweetId,
}) => {
  const { toggleLike, toggleRetweet } = useContext(CurrentUserContext);
  return (
    <ActionBarDiv aria-label="action bar">
      <CommentButton aria-label="comment button">
        <BsChat />
      </CommentButton>
      <RetweetButtonDiv>
        <RetweetButton
          aria-label="retweet button"
          onClick={() => toggleRetweet(tweetId, isRetweeted)}
        >
          <ToggleRetweetIcon isRetweeted={isRetweeted} />
        </RetweetButton>
        <NumRetweets aria-label="Number of retweets">{numRetweets}</NumRetweets>
      </RetweetButtonDiv>

      <LikeButtonDiv>
        <LikeButton
          aria-label="Like button"
          onClick={() => toggleLike(tweetId, isLiked)}
        >
          <ToggledHeart isLiked={isLiked} />
        </LikeButton>
        <NumLikes aria-label="number of likes">{numLikes}</NumLikes>
      </LikeButtonDiv>

      <UploadButton aria-label="upload button">
        <FiUpload />
      </UploadButton>
    </ActionBarDiv>
  );
};

const ActionBarDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-evenly;
  margin-left: 10%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #e2e2e2;
`;

const CommentButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: white;
  &:focus {
    outline: none;
    background-color: #d1c1f6;
    border-radius: 50%;
  }
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    background-color: #d1c1f6;
    border-radius: 50%;
  }
`;

const RetweetButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RetweetButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: white;
  &:focus {
    outline: none;
    background-color: #d1c1f6;
    border-radius: 50%;
  }
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    background-color: #d1c1f6;
    border-radius: 50%;
  }
`;

const NumRetweets = styled.div`
  font-size: 12px;
  align-items: center;
`;

const LikeButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LikeButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: white;
  &:focus {
    outline: none;
    background-color: #d1c1f6;
    border-radius: 50%;
  }
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    background-color: #d1c1f6;
    border-radius: 50%;
  }
`;

const NumLikes = styled.div`
  font-size: 12px;
  align-items: center;
`;

const UploadButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: white;
  &:focus {
    outline: none;
    background-color: #d1c1f6;
    border-radius: 50%;
  }
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    background-color: #d1c1f6;
    border-radius: 50%;
  }
`;

export default ActionBar;
