import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { tagSort } from "utils/sort";
import { Color } from "constants/constants";
import { mq } from "styles/styled-function";
library.add(faTags);

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
  z-index: 10;
  ${mq("min", "md")} {
    &:hover {
      background: ${Color.white.dark};
      color: ${Color.pink.main};
    }
  }
`;
const Tag = ({ tags }) => {
  const sortedTags = tagSort(tags);
  return (
    <div css={tagWrap}>
      <FontAwesomeIcon icon={faTags} />
      <ul css={tagList}>
        {sortedTags.map((tag) => {
          const slug = "/blog/tags/" + tag;
          return (
            <li key={tag} css={tagItem}>
              <Link css={tagLink} to={slug}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tag;
