import React, { useContext } from "react";
import styled from "styled-components";

const InputCalculator = ({ textInput }) => {
  if (textInput.length >= 225 && textInput.length < 280) {
    let newNum = 280 - textInput.length;
    return <EightyPercentCap>{newNum}</EightyPercentCap>;
  } else if (textInput.length >= 280) {
    let newNum = 280 - textInput.length;
    return <LimitReached>{newNum}</LimitReached>;
  } else {
    let newNum = 280 - textInput.length;
    return <MaxCharacters>{newNum}</MaxCharacters>;
  }
};

const MaxCharacters = styled.div`
  color: grey;
`;

const EightyPercentCap = styled.div`
  color: #ffeb3b;
  font-weight: bold;
`;

const LimitReached = styled.div`
  color: red;
`;

export default InputCalculator;
