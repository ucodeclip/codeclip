import React from "react"
import styled from "styled-components"
import Article from "./article"

const ArticleWrap = styled.div`
  padding: 5%;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
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