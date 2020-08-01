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
    <ActionBarDiv>
      <CommentButton>
        <BsChat />
      </CommentButton>
      <RetweetButton onClick={() => toggleRetweet(tweetId, isRetweeted)}>
        <ToggleRetweetIcon isRetweeted={isRetweeted} />
      </RetweetButton>
      <NumRetweets>{numRetweets}</NumRetweets>
      <LikeButton onClick={() => toggleLike(tweetId, isLiked)}>
        <ToggledHeart isLiked={isLiked} />
      </LikeButton>
      <NumLikes>{numLikes}</NumLikes>
      <UploadButton>
        <FiUpload />
      </UploadButton>
    </ActionBarDiv>
  );
};

const ActionBarDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-left: 1%;
  padding-right: 1%;
`;

const CommentButton = styled.button`
  width: 25%;
`;

const RetweetButton = styled.button`
  width: 12%;
`;

const NumRetweets = styled.div`
  width: 12%;
`;

const LikeButton = styled.button`
  width: 12%;
`;

const NumLikes = styled.div`
  width: 12%;
`;

const UploadButton = styled.button`
  width: 25%;
`;

export default ActionBar;
