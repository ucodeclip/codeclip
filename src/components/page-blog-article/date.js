import React from "react"
import styled from "styled-components"
import { calcSpVw } from '../../styles/styled-function'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faRedo } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false;
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
  display: flex;
  align-items: flex-start;
  color: inherit;
  svg {
    @media screen and (min-width:813px) {
      width: 15px;
    }
    @media screen and (max-width:812px) {
      width: ${calcSpVw(30)};
    }
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