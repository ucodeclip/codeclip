import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { Color } from "constants/constants";
import { mq } from "styles/styled-function";
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
  margin-top: 12px;
  [data-icon] {
    color: ${Color.pink.main};
  }
  svg {
    width: 20px;
  }
`;
const tagList = css`
  display: flex;
  flex-wrap: wrap;
  margin: -5px -5px 0 0;
`;
const tagItem = css`
  margin: 5px 5px 0px 5px;
`;
const tagLink = css`
  position: relative;
  z-index: 10;
  display: block;
  color: ${Color.white.dark};
  background: ${Color.pink.main};
  transition: all 0.2s ease-in-out;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.2rem;
  padding: 3px;
  border: 2px solid ${Color.pink.main};
  border-radius: 1px;
  ${mq("min", "md")} {
    &:hover {
      background: ${Color.white.dark};
      color: ${Color.pink.main};
    }
  }
`;

const TagModule = (props) => {
  const tagArray = props.content;
  tagArray.sort(sortFunc);

  return (
    <div css={tagWrap}>
      <FontAwesomeIcon icon={faTags} />
      <ul css={tagList}>
        {tagArray.map((v, i) => {
          const slug = "/blog/tags/" + v;
          return (
            <li key={i} css={tagItem}>
              <Link css={tagLink} to={slug}>
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
