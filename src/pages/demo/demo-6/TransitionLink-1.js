import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import gsap from "gsap";
import LayoutDemo from "../../../components/layout/layout-demo";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";

const TransitionLink1 = () => {
  const exitAnimation = node => {
    gsap.to(node, { rotation: 45, duration: 1, opacity: 1 });
  };
  const entryAnimation = node => {
    gsap.from(node, { rotation: 45, duration: 1, opacity: 1 });
  };
  return (
    <LayoutDemo>
      <SEO
        title="【Demoページ】ページ遷移アニメーションTransitionLink-1の実装"
        description="【Demoページ】ページ遷移アニメーションTransitionLink-1の実装"
        type="article"
      />
      <h1 className={styles.title}>【TransitionLink-1ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionLink-2"
            exit={{
              // nodeを渡す
              // exitAnimationを発火
              trigger: ({ node }) => exitAnimation(node),
              length: 1,
            }}
            entry={{
              // nodeを渡す
              // entryAnimationを発火
              trigger: ({ node }) => entryAnimation(node),
              delay: 1,
              length: 1,
            }}
          >
            TransitionLink-2へ
          </TransitionLink>
        </div>
      </div>
    </LayoutDemo>
  );
};

export default TransitionLink1;
