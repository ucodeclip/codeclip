import React from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar, faRedo } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;
library.add({ faCalendar, faRedo });

const list = css`
  color: inherit;
  display: flex;
  margin-top: 15px;
`;
const item = css`
  display: flex;
  align-items: center;
  color: inherit;
  & + & {
    margin-left: 10px;
  }
  svg {
    width: 15px;
  }
`;
const dateWrap = css`
  display: inline-block;
  color: inherit;
  margin-left: 5px;
  font-size: 1.4rem;
`;

const UpDate = ({ date, update }) => {
  if (date === update) {
    return null;
  }
  return (
    <li css={item}>
      <FontAwesomeIcon icon={faRedo} />
      <span css={dateWrap}>{update}</span>
    </li>
  );
};

const DateModule = ({ date, update }) => {
  return (
    <ul css={list}>
      <li css={item}>
        <FontAwesomeIcon icon={faCalendar} />
        <span css={dateWrap}>{date}</span>
      </li>
      <UpDate date={date} update={update} />
    </ul>
  );
};

export default DateModule;
