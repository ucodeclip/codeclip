import React, { useRef } from "react";
import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link";
import gsap from "gsap";
import LayoutDemo from "../../../components/layout/layout-demo";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";

const TransitionTarget = ({ mount, status }) => {
  const target = useRef(null);
  const entryAnimation = target => {
    gsap.to(target, { y: 0, duration: 1, opacity: 1 });
  };
  if (mount && status === "entered") {
    //statusがenteredの時にアニメーション発火
    entryAnimation(target.current);
  }

  return (
    <div className={styles.TransitionTarget} ref={target}>
      Animation Target
    </div>
  );
};

const TransitionStateAnimation1 = () => {
  const exitAnimation = node => {
    gsap.to(node, { y: 100, duration: 1, opacity: 0 });
  };
  const entryAnimation = node => {
    gsap.from(node, { y: 100, duration: 1, opacity: 0 });
  };
  return (
    <LayoutDemo>
      <SEO
        title="【Demoページ】ページ遷移アニメーションTransitionStateAnimation-1の実装"
        description="【Demoページ】ページ遷移アニメーションTransitionStateAnimation-1の実装"
        type="article"
      />

      <h1 className={styles.title}>【TransitionStateAnimation-1ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionStateAnimation-2"
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
            TransitionState-2へ
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

export default TransitionStateAnimation1;
