import React from "react"
import styled from "styled-components"
import Article from "./article"
import { calcSpVw } from '../../../styles/styled-function'

const ArticleWrap = styled.div`
  padding: 5%;
  @media screen and (min-width:813px) {
    padding: 30px 5%;
    min-height: calc(100vh - 30vh - 60px);
    box-sizing: border-box;
  }
  @media screen and (max-width:812px) {
    padding: ${calcSpVw(60)} 5%;
    min-height: calc(100vh - ${calcSpVw(400)} - ${calcSpVw(160)});
    box-sizing: border-box;
  }
`

const ArticleWrapModule = (props) => {
  return (
    <ArticleWrap>
      {props.data.allMarkdownRemark.edges.map((v, i)=>{
        return <Article content={v} key={i} />
      })}
    </ArticleWrap>
  )
}

export default ArticleWrapModule