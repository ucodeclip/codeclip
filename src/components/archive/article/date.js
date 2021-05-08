import React from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar, faRedo } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;
library.add({ faCalendar, faRedo });

const dateWrap = css`
  color: inherit;
  display: flex;
  margin-top: 10px;
`;
const dateItem = css`
  display: flex;
  align-items: center;
  color: inherit;
  &[data-type="update"] {
    margin-left: 10px;
  }
  svg {
    width: 15px;
  }
`;
const itemDate = css`
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
    <div data-type="update" css={dateItem}>
      <FontAwesomeIcon icon={faRedo} />
      <span css={itemDate}>{update}</span>
    </div>
  );
};

const DateModule = ({ date, update }) => {
  return (
    <div css={dateWrap}>
      <div css={dateItem}>
        <FontAwesomeIcon icon={faCalendar} />
        <span data-type="publish" css={itemDate}>
          {date}
        </span>
      </div>
      <UpDate date={date} update={update} />
    </div>
  );
};

export default DateModule;
