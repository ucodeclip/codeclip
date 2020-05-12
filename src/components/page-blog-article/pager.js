import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'

const PagerList = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  @media screen and (min-width:813px) {
    max-width: 1000px;
    width: 90%;
    margin: 30px auto 0;
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(60)}
  }
`
const PagerItem = styled.div`
  ${(props) => {
    if(props.pos === "center"){
      return ({position: "relative"});
    }else {
      if(props.pos === 'left'){
        return ({position:"absolute", left: '0', zIndex: 10});
      }else {
        return ({position:"absolute", right: '0', zIndex: 10});
      }
    }
  }};
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`
const PagerLink = styled(Link)`
  color: #232946;
  font-weight: bold;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`

const PagerModule = (props) => {
  return (
    <PagerList>
      {
        props.pageInfo.hasPreviousPage ? <PagerItem pos="left"><PagerLink to={props.pageContext.prevPath}>前の記事</PagerLink></PagerItem> : ""
      }
      <PagerItem pos="center"><PagerLink to="/">TOPへ戻る</PagerLink></PagerItem>
      {
        props.pageInfo.hasNextPage ? <PagerItem pos="right"><PagerLink to={props.pageContext.nextPath}>次の記事</PagerLink></PagerItem> : ""
      }
    </PagerList>
  )
}

export default PagerModule