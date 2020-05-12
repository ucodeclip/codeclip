import React from "react";
import {Link} from "gatsby"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'
// import Nav from "./nav";

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: #232946;
  @media screen and (min-width:813px) {
    height: 60px;
  }
  @media screen and (max-width:812px) {
    height: ${calcSpVw(120)}
  }
`
const Inner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    padding: 0 30px;
  }
  @media screen and (max-width:812px) {
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

class HeaderModule extends React.Component{
  render(){
    return(
      <Header id="header">
        <Inner>
          <Logo to="/">Code Clip Blog</Logo>
          {/* <Nav /> */}
        </Inner>
      </Header>
    )
  }
}

export default HeaderModule;