import React from "react";
import styled from "@emotion/styled";
import { calcSpVw } from "../../../styles/styled-function";

const Visual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #232946;
  @media screen and (min-width: 813px) {
    height: 30vh;
    min-height: 200px;
    margin: 0 auto;
  }
  @media screen and (max-width: 812px) {
    height: ${calcSpVw(400)};
  }
`;
const VisualBlock = styled.div`
  position: relative;
  text-align: center;
`;
const Title = styled.h1`
  color: #fffffe;
  font-weight: bold;
  @media screen and (min-width: 813px) {
    font-size: 25px;
  }
  @media screen and (max-width: 812px) {
    font-size: ${calcSpVw(50)};
  }
`;

const MainVisual = (props) => {
  return (
    <Visual>
      <VisualBlock>
        <Title>Tag: {props.tag} 一覧</Title>
      </VisualBlock>
    </Visual>
  );
};

export default MainVisual;
