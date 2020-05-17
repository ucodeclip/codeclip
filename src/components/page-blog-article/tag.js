import React from "react"
//import {Link} from "gatsby"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTags } from '@fortawesome/free-solid-svg-icons'
library.add(faTags)

const TagWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  [data-icon] {
    color: #eebbc3;
  }
  @media screen and (min-width:813px) {
    margin-top: 12.5px;
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(25)}
  }
`
const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  @media screen and (min-width:813px) {
    margin: -5px -5px 0 0;
  }
  @media screen and (max-width:812px) {
    margin: ${calcSpVw(-10)} ${calcSpVw(-10)} 0 0;
  }
`
const TagItem = styled.li`
  @media screen and (min-width:813px) {
    margin: 5px 5px 0px 5px;
  }
  @media screen and (max-width:812px) {
    margin: ${calcSpVw(10)};
    margin-bottom: 0;
  }
`
const TagLink = styled.div`
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
    padding: 3px;
    border: 2px solid #eebbc3;
    border-radius: 1px;
    &:hover {
      background: #fffffe;
      color: #eebbc3;
    }
  }
  @media screen and (max-width:812px) {
    font-size: ${calcSpVw(24)};
    padding: ${calcSpVw(6)};
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
    <TagWrap>
      <FontAwesomeIcon icon={faTags} />
      <TagList>
        {tagArray.map((v ,i)=>{
          return (
            <TagItem key={i}><TagLink to={v}>{v}</TagLink></TagItem>
          )
        })}
      </TagList>
    </TagWrap>
  )
}

export default TagModule;