import React from "react"
import styled from "styled-components"
import Header from "../header/header";
import Footer from "../footer/footer";
import GlobalStyle from '../../styles/styled-reset';

const Wrapper = styled.div`
  position: relative;
  background: #ddd;
  color: #232946;
  min-height: 100vh;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`
const Contents = styled.div`
  position: relative;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`

const layoutDemo = ({ children, page }) => {
  return (
    <Wrapper data-page={'demo'}>
      <GlobalStyle />
      <Header page={'demo'}/>
      <Contents>
        {children}
      </Contents>
      <Footer />
    </Wrapper>
  )
}
export default layoutDemo