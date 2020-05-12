import React from "react"
import {Link} from "gatsby"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'

const TagList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (min-width:813px) {
    margin: 0 -5px 0 15px;
  }
  @media screen and (max-width:812px) {
    margin: ${calcSpVw(20)} ${calcSpVw(-10)} 0;
  }
`
const TagItem = styled.li`
  @media screen and (min-width:813px) {
    margin: 0 5px
  }
  @media screen and (max-width:812px) {
    margin: ${calcSpVw(10)} ${calcSpVw(10)} 0
  }
`
const TagLink = styled(Link)`
  position: relative;
  z-index: 10;
  display: block;
  color: #fffffe;
  background: #eebbc3;
  transition: all .3s ease-out;
  font-weight: bold;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    font-size: 12px;
    padding: 5px;
    border: 2px solid #eebbc3;
    box-sizing: border-box;
    border-radius: 1px;
    &:hover {
      background: #fffffe;
      color: #eebbc3;
    }
  }
  @media screen and (max-width:812px) {
    font-size: ${calcSpVw(24)};
    padding: ${calcSpVw(10)};
    border-radius: ${calcSpVw(2)};
  }
`

const TagModule = (props) => {
  const tagArray = props.tag;
  const sortFunc = (a, b) => {
    a = a.toString().toLowerCase();
    b = b.toString().toLowerCase();
    if(a < b){
      return -1;
    } else {
      return 1;
    }
  }
  tagArray.sort(sortFunc);

  return (
    <TagList>
      {
        tagArray.map((v, i)=>{
          return (
            <TagItem key={i}><TagLink to={v}>{v}</TagLink></TagItem>
          )
        })
      }
    </TagList>
  )
}

export default TagModule;