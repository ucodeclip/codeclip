import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { mq } from "styles/styled-function";
import { Color } from "constants/constants";
library.add(faTags);

const sortFunc = (a, b) => {
  a = a.toString().toLowerCase();
  b = b.toString().toLowerCase();
  if (a < b) {
    return -1;
  } else {
    return 1;
  }
};

const tagWrap = css`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
  [data-icon] {
    color: ${Color.pink.main};
  }
  svg {
    width: 20px;
  }
`;
const list = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px 0 0;
`;
const item = css`
  margin: 10px 5px 10px;
`;
const link = css`
  display: block;
  position: relative;
  padding: 3px;
  background: ${Color.pink.main};
  box-sizing: border-box;
  border: 2px solid ${Color.pink.main};
  border-radius: 1px;
  color: ${Color.white.dark};
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 10;
  transition: all 0.2s ease-in-out;
  ${mq("min", "md")} {
    &:hover {
      background: ${Color.white.dark};
      color: ${Color.pink.main};
    }
  }
`;

const TagModule = ({ tag }) => {
  const tagArray = tag;
  tagArray.sort(sortFunc);

  return (
    <div css={tagWrap}>
      <FontAwesomeIcon icon={faTags} />
      <ul css={list}>
        {tagArray.map((v, i) => {
          const slug = "/blog/tags/" + v;
          return (
            <li css={item} key={i}>
              <Link css={link} to={slug}>
                {v}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagModule;
