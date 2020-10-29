import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { calcSpVw } from '../../../styles/styled-function'
import Tag from "./tag"
import Date from "./date.js"

const Article = styled.article`
  position: relative;
  background: #fffffe;
  color: #232946;
  @media screen and (min-width:813px) {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 3%;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    border-radius: 3px;
    box-sizing: border-box;
    transition: all .3s ease-out;
    &:nth-child(n + 2){
      margin-top: 20px;
    }
    &:hover {
      opacity: .6;
    }
  }
  @media screen and (max-width:812px) {
    box-shadow: 0 0 ${calcSpVw(10)} rgba(0,0,0,.2);
    padding: ${calcSpVw(40)};
    border-radius: ${calcSpVw(6)};
    &:nth-child(n + 2){
      margin-top: ${calcSpVw(40)};
    }
  }
`
const ArticleTitle = styled.h2`
  color: inherit;
  font-weight: bold;
  @media screen and (min-width:813px) {
    font-size: 22px;
  }
  @media screen and (max-width:812px) {
    font-size: ${calcSpVw(44)};
  }
`
const ArticleText = styled.p`
  color: inherit;
  @media screen and (min-width:813px) {
    margin-top: 10px;
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(20)};
  }
`
const ArticleLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  color: inherit;
  z-index: 5;
  @media screen and (min-width:813px) {
  }
  @media screen and (max-width:812px) {
  }
`

const ArticleModule = (props) => {
  const slug = "/blog/" + props.content.node.frontmatter.slug
  const formatter = props.content.node.frontmatter;
  const title = formatter.title;
  const text = props.content.node.excerpt;
  const date = formatter.date;
  const update = formatter.update;
  const tag = formatter.tag;

  return (
    <Article>
      <ArticleLink to={slug}></ArticleLink>
      <ArticleTitle>{title}</ArticleTitle>
      <ArticleText>{text}</ArticleText>
      <Date date={date} update={update} />
      <Tag content={tag} />
    </Article>
  )
}

export default ArticleModule