import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import LayoutDemo from "../../../components/layout/layout-demo";
import Seo from "../../../components/seo/seo";
import styles from "./index.module.scss";

const AniLink2 = () => {
  return (
    <LayoutDemo>
      <Seo
        title="【Demoページ】ページ遷移アニメーション AniLink の実装"
        description="【Demoページ】ページ遷移アニメーション AniLink の実装"
        type="article"
      />
      <h1 className={styles.title}>【AniLink-2ページ】</h1>
      <ul className={styles.AniLinkList}>
        <li>
          <AniLink fade to="/demo/demo-5/AniLink-1">
            【fade】AniLink-1へ
          </AniLink>
        </li>
      </ul>
    </LayoutDemo>
  );
};

export default AniLink2;
