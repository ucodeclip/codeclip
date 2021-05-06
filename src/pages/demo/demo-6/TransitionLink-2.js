import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import gsap from "gsap";
import LayoutDemo from "../../../components/layout/layout-demo";
import Seo from "../../../components/seo/seo";
import styles from "./index.module.scss";

const TransitionLink2 = () => {
  const exitAnimation = node => {
    gsap.to(node, { y: 100, duration: 1, opacity: 0 });
  };
  const enterAnimation = node => {
    gsap.from(node, { y: 100, duration: 1, opacity: 0 });
  };
  return (
    <LayoutDemo>
      <Seo
        title="【Demoページ】ページ遷移アニメーションTransitionLink-2の実装"
        description="【Demoページ】ページ遷移アニメーションTransitionLink-2の実装"
        type="article"
      />
      <h1 className={styles.title}>【TransitionLink-2ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionLink-1"
            exit={{
              trigger: ({ node }) => exitAnimation(node),
              length: 1,
            }}
            entry={{
              trigger: ({ node }) => enterAnimation(node),
              delay: 1,
            }}
          >
            TransitionLink-1へ
          </TransitionLink>
        </div>
      </div>
    </LayoutDemo>
  );
};

export default TransitionLink2;
