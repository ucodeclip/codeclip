import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import { Color } from "constants/constants";

const list = css`
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 1000px;
  width: 90%;
  margin: 30px auto 0;
  box-sizing: border-box;
`;
const item = css`
  position: absolute;
  perspective: 500px;
`;
const prev = css`
  left: 0;
  a {
    position: relative;
    padding-left: 1.5rem;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto 0;
      width: 10px;
      height: 10px;
      border-top: 2px solid ${Color.navy.main};
      border-left: 2px solid ${Color.navy.main};
      transform: rotateX(0deg) rotateZ(-45deg);
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      &::before {
        transform: rotateX(180deg) rotateZ(-45deg);
      }
    }
  }
`;
const next = css`
  right: 0;
  a {
    position: relative;
    padding-right: 1.5rem;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto 0;
      width: 10px;
      height: 10px;
      border-top: 2px solid ${Color.navy.main};
      border-right: 2px solid ${Color.navy.main};
      transform: rotateX(0) rotateZ(45deg);
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      &::after {
        transform: rotateX(180deg) rotateZ(45deg);
      }
    }
  }
`;
const link = css`
  color: #232946;
  font-weight: bold;
  font-size: 1.6rem;
`;

const PagerModule = (props) => {
  return (
    <ul css={list}>
      {props.pageInfo.hasNextPage && (
        <li css={[item, prev]}>
          <Link css={link} to={props.pageContext.nextPath}>
            前の記事
          </Link>
        </li>
      )}
      <li>
        <Link css={link} to="/">
          TOPへ戻る
        </Link>
      </li>
      {props.pageInfo.hasPreviousPage && (
        <li css={[item, next]}>
          <Link css={link} to={props.pageContext.prevPath}>
            次の記事
          </Link>
        </li>
      )}
    </ul>
  );
};

export default PagerModule;
