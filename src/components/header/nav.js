import React from "react";
import styled from "styled-components"

const Nav = styled.nav`
  margin: 0 0 0 auto;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`
const NavList = styled.ul`
  position:relative;
  display: flex;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`
const NaviItem = styled.li`
  @media screen and (min-width:813px) {
    margin-left: 20px;
    box-sizing: border-box;
  }
  @media screen and (max-width:812px) {
  }
`


const NavModule = () => {
  return (
    <Nav>
      <NavList>
        <NaviItem>Home</NaviItem>
        <NaviItem>About</NaviItem>
      </NavList>
    </Nav>
  )
}

export default NavModule