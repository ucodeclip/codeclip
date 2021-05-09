import React, { useRef } from "react";
import TransitionLink, {
  TransitionPortal,
} from "gatsby-plugin-transition-link";
import gsap from "gsap";
import LayoutDemo from "components/layout/layout-demo";
import Seo from "components/seo/seo";
import styles from "./index.module.scss";

const TransitionPortal2 = () => {
  const commonLayer = useRef(null);
  const exitAnimation = () => {
    gsap
      .timeline()
      .to(commonLayer.current, {
        y: "0%",
        ease: "power1.easeInOut",
        duration: 0.5,
      })
      .to(commonLayer.current, {
        y: "100%",
        ease: "power1.easeInOut",
        duration: 0.5,
      });
  };

  return (
    <LayoutDemo>
      <Seo
        title="【Demoページ】ページ遷移アニメーションTransitionPortal-2の実装"
        description="【Demoページ】ページ遷移アニメーションTransitionPortal-2の実装"
        type="article"
      />

      <h1 className={styles.title}>【TransitionPortal-2ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionPortal-1"
            exit={{
              trigger: () => exitAnimation(),
              length: 1,
            }}
            entry={{
              delay: 0.5,
              length: 1,
            }}
          >
            TransitionPortal-1へ
          </TransitionLink>
        </div>
        <TransitionPortal>
          <div
            ref={commonLayer}
            style={{
              position: "fixed",
              background: "#4b2571",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              transform: "translateY(-100%)",
            }}
          />
        </TransitionPortal>
      </div>
    </LayoutDemo>
  );
};

export default TransitionPortal2;
