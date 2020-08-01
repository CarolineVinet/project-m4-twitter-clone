import React from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { FaBomb } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <ErrorDiv>
      <BombIcon>
        <FaBomb />
      </BombIcon>
      <ErrorMessage>An unknown error has occured.</ErrorMessage>
      <HelpMessage>
        Please try refreshing the page, or
        <SupportLink> contact support </SupportLink> if the problem persists.
      </HelpMessage>
    </ErrorDiv>
  );
};

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 150px;
  margin-top: 150px;
`;

const BombIcon = styled.div`
  margin: 10px;
`;

const ErrorMessage = styled.p`
  font-weight: bold;
  margin: 10px;
`;

const HelpMessage = styled.p`
  margin: 10px;
`;

const SupportLink = styled.span`
  text-decoration: underline;
  color: blue;
`;

export default ErrorPage;
