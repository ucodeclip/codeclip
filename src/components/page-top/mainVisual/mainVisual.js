import React from "react";
import styled from "@emotion/styled";
import { calcSpVw } from "../../../styles/styled-function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter);

const Visual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #232946;
  background: hsla(230, 33%, 21%, 1);
`;
const VisualInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 813px) {
    height: calc(100vh - 300px);
    min-height: 600px;
    margin: 0 auto;
    max-width: 1000px;
    width: 90%;
  }
  @media screen and (max-width: 812px) {
    width: 90%;
    margin: 0 auto;
    height: ${calcSpVw(600)};
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
    font-size: 30px;
  }
  @media screen and (max-width: 812px) {
    font-size: ${calcSpVw(60)};
  }
`;
const Caption = styled.p`
  text-align: center;
  color: #fffffe;
  @media screen and (min-width: 813px) {
    margin-top: 15px;
    font-weight: bold;
  }
  @media screen and (max-width: 812px) {
    margin-top: ${calcSpVw(30)};
    font-weight: bold;
  }
`;
const Sns = styled.div`
  position: absolute;
  right: 0;
  @media screen and (min-width: 813px) {
    bottom: 20px;
  }
  @media screen and (max-width: 812px) {
    bottom: ${calcSpVw(40)};
  }
`;
const Twt = styled.a`
  display: inline-block;
  color: #00aced;
  @media screen and (min-width: 813px) {
    font-size: 30px;
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: 812px) {
    font-size: ${calcSpVw(60)};
    width: ${calcSpVw(60)};
    height: ${calcSpVw(60)};
  }
  svg {
    display: block;
  }
`;

const MainVisual = () => {
  return (
    <Visual>
      <VisualInner>
        <VisualBlock>
          <Title>Code Clip Blog</Title>
          <Caption>フロントエンドエンジニアの雑記帳</Caption>
        </VisualBlock>
        <Sns>
          <Twt href="https://twitter.com/blog_clip" target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </Twt>
        </Sns>
      </VisualInner>
    </Visual>
  );
};

export default MainVisual;
