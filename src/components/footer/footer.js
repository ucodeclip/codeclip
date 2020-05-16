import React from "react";
import styled from "styled-components";
import { calcSpVw } from '../../styles/styled-function'

const Footer = styled.footer`
  width: 100%;
  color: #fffffe;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`
const FooterInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing:border-box;
  @media screen and (min-width:813px) {
    padding: 0 30px;
    height: 60px;
  }
  @media screen and (max-width:812px) {
    height: ${calcSpVw(120)};
    padding: 0 5%;
  }
`

const FooterCopy = styled.small`
  color: #fffffe;
  @media screen and (min-width:813px) {
    font-size: 12px;
  }
  @media screen and (max-width:812px) {
    font-size: ${calcSpVw(24)}
  }
`

const FooterModule = () => {
  return(
    <Footer>
      <FooterInner>
        <FooterCopy>&copy; 2020 CodeClip</FooterCopy>
      </FooterInner>
    </Footer>
  )
}

export default FooterModule;