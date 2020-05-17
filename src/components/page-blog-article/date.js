import React from "react"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
library.add(faCalendar)

const DateWrap = styled.div`
  color: inherit;
  @media screen and (min-width:813px) {
    margin-top: 15px;
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(30)};
  }
`
const Date = styled.span`
  display: inline-block;
  color: inherit;
  @media screen and (min-width:813px) {
    margin-left: 5px;
    font-size: 14px;
  }
  @media screen and (max-width:812px) {
    margin-left: ${calcSpVw(10)};
    font-size: ${calcSpVw(28)};
  }
`

const DateModule = (props) => {
  return (
    <DateWrap><FontAwesomeIcon icon={faCalendar} /><Date>{props.date}</Date></DateWrap>
  )
}

export default DateModule;