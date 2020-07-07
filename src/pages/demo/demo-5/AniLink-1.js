import React from 'react';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";


const AniLink1 = () => {
  return (
    <Layout>
      <SEO
        title="【Demoページ】ページ遷移アニメーション AniLink の実装"
        description="【Demoページ】ページ遷移アニメーション AniLink の実装"
        type="article"
      />
      <div className={styles.main}>
        <h1 className={styles.title}>【AniLink-1ページ】</h1>
        <ul className={styles.AniLinkList}>
          <li>
            {/*
              <paintDrip>
              to       : 遷移先
              duration : アニメーションの時間
              hex      : 色
            */}
            <AniLink
              paintDrip
              to="/demo/demo-5/AniLink-2"
              duration={1}
              hex="#0000ff"
            >
              【paintDrip】AniLink-2へ
            </AniLink>
          </li>
          <li>
            {/*
              <swipe>
              to       : 遷移先
              top      : 重なりの上に来る要素
                         exit か entry を指定。
              duration : アニメーションの時間
            */}
            <AniLink
              swipe
              to="/demo/demo-5/AniLink-2"
              top="exit"
              duration={1}
            >
              【swipe】AniLink-2へ
            </AniLink>
          </li>
          <li>
            {/*
              <cover>
              to        : 遷移先
              duration  : アニメーションの時間
              bg        : 色
              direction : カバー要素の方向
                          up,down,left,right を指定
            */}
            <AniLink
              cover
              to="/demo/demo-5/AniLink-2"
              duration={1}
              bg="#663399"
              direction="down"
            >
              【cover】AniLink-2へ
            </AniLink>
          </li>
          <li>
            {/*
              <fade>
              to        : 遷移先
              duration  : アニメーションの時間
            */}
            <AniLink
              fade
              to="/demo/demo-5/AniLink-2"
              duration={1}
            >
              【fade】AniLink-2へ
            </AniLink>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default AniLink1;