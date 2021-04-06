import React from "react";
import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link";
import gsap from "gsap";
import LayoutDemo from "../../../components/layout/layout-demo";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";

const TransitionTarget = ({ mount, status }) => {
  console.log(mount, status);
  const mountFlg = mount ? "true" : "false";
  return (
    <div className={styles.TransitionStateBox}>
      mount: {mountFlg}
      <br />
      status: {status}
    </div>
  );
};

const TransitionState2 = () => {
  const exitAnimation = node => {
    gsap.to(node, { duration: 3, opacity: 0 });
  };
  const entryAnimation = node => {
    gsap.from(node, { duration: 3, opacity: 0 });
  };
  return (
    <LayoutDemo>
      <SEO
        title="【Demoページ】ページ遷移アニメーションTransitionState-2の実装"
        description="【Demoページ】ページ遷移アニメーションTransitionState-2の実装"
        type="article"
      />
      <h1 className={styles.title}>【TransitionState-2ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionState-1"
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
            TransitionState-1へ
          </TransitionLink>
        </div>
        <TransitionState>
          {({ mount, transitionStatus }) => {
            return <TransitionTarget mount={mount} status={transitionStatus} />;
          }}
        </TransitionState>
      </div>
    </LayoutDemo>
  );
};

export default TransitionState2;
