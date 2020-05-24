import React from "react"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faRedo } from '@fortawesome/free-solid-svg-icons'
library.add({faCalendar,faRedo})

const DateList = styled.div`
  color: inherit;
  display: flex;
  @media screen and (min-width:813px) {
    margin-top: 15px;
  }
  @media screen and (max-width:812px) {
    margin-top: ${calcSpVw(30)};
  }
`
const DateItem = styled.div`
  color: inherit;
  @media screen and (min-width:813px) {
    margin-left: ${props => props.type === "update" ? '20px': '0'};
  }
  @media screen and (max-width:812px) {
    margin-left: ${props => props.type === "update" ? calcSpVw(40) : '0'};
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

const UpDate = ({date, update}) => {
  if(date === update){
    return null
  }
  return (
    <DateItem type="update"><FontAwesomeIcon icon={faRedo} /><Date>{update}</Date></DateItem>
  )
}

const DateModule = ({date,update}) => {
  return (
    <DateList>
      <DateItem><FontAwesomeIcon icon={faCalendar} /><Date>{date}</Date></DateItem>
      <UpDate date={date} update={update} />
    </DateList>
  )
}

export default DateModule;