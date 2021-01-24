import React from "react";
import {Link} from "gatsby"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: #232946;
  @media screen and (min-width:813px) {
    height: 60px;
    .inner {
      max-width: 100%;
    }
  }
  @media screen and (max-width:812px) {
    height: ${calcSpVw(120)}
  }
`
const Inner = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    max-width: 1000px;
    width: 90%;
    margin: 0 auto;
  }
  @media screen and (max-width:812px) {
    width: 100%;
    padding: 0 5%;
  }
`
const Logo = styled(Link)`
  color: #fffffe;
  font-weight: bold;
  @media screen and (min-width:813px) {
    font-size: 16px;
  }
  @media screen and (max-width:812px) {
  }
`

const HeaderModule = ({page}) => {
  if(page === 'top') {
    return null
  }
  return(
    <Header id="header" page={page}>
      <Inner className='inner'>
        <Logo to="/">Code Clip Blog</Logo>
        {/* <Nav /> */}
      </Inner>
    </Header>
  )
}

export default HeaderModule;