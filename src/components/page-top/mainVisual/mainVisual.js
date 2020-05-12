import React from "react"
import styled from "styled-components"
import { calcSpVw } from '../../../styles/styled-function'

const Visual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #232946;
  @media screen and (min-width:813px) {
    height: calc(100vh - 300px);
    min-height: 600px;
    margin: 0 auto;
  }
  @media screen and (max-width:812px) {
    height: ${calcSpVw(600)}
  }
`
const VisualBlock = styled.div`
  position: relative;
  text-align: center;
`
const Title = styled.h1`
  color: #fffffe;
  font-weight: bold;
  @media screen and (min-width:813px) {
    font-size: 30px;
  }
  @media screen and (max-width:812px) {
    font-size: ${calcSpVw(60)}
  }
`
const Caption = styled.p`
  text-align: center;
  color: #fffffe;
  @media screen and (min-width:813px) {
    margin-top: 15px;
    font-weight: bold;
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(30)};
    font-weight: bold;
  }
`

const MainVisual = () => {
  return (
    <Visual>
      <VisualBlock>
        <Title>Code Clip Blog</Title>
        <Caption>フロントエンドエンジニアの雑記帳</Caption>
      </VisualBlock>
    </Visual>
  )
}

export default MainVisual

