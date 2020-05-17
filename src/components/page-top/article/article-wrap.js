import React from "react"
import styled from "styled-components"
import Article from "./article"
import { calcSpVw } from '../../../styles/styled-function'

const ArticleWrap = styled.div`
  padding: 5%;
  @media screen and (min-width:813px) {
    padding: 30px 5%;
  }
  @media screen and (max-width:812px) {
    padding: ${calcSpVw(60)} 5%;
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