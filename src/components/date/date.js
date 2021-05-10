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

const UpDate = ({ update }) => {
  return (
    <div data-type="update" css={dateItem}>
      <FontAwesomeIcon icon={faRedo} />
      <span css={itemDate}>{update}</span>
    </div>
  );
};

const Date = ({ date, update }) => {
  return (
    <div css={dateWrap}>
      <div data-type="publish" css={dateItem}>
        <FontAwesomeIcon icon={faCalendar} />
        <span css={itemDate}>{date}</span>
      </div>
      {date !== update && <UpDate update={update} />}
    </div>
  );
};

export default Date;
