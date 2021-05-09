import React, { useState, useEffect, useRef } from "react";
import LayoutDemo from "components/layout/layout-demo";
import Seo from "components/seo/seo";
import styles from "./index.module.scss";

const ScrollComponent = ({ children }) => {
  const target = useRef(null);
  const [classNames, setClassNames] = useState([styles.item, styles.scroll]);
  useEffect(() => {
    const targetTopPosition = target.current.getBoundingClientRect().top;
    const showTarget = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      if (scrollPosition > targetTopPosition + 300) {
        setClassNames([styles.item, styles.scrollShow]);
      } else {
        setClassNames([styles.item, styles.scroll]);
      }
    };
    showTarget();
    const onScroll = () => {
      showTarget();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={target} className={classNames.join(" ")}>
      {children}
    </div>
  );
};

const Demo2 = () => {
  return (
    <LayoutDemo>
      <Seo
        title="【Demoページ】Scrollアニメーションの実装（スクロールイベント編）"
        description="【Demoページ】Scrollアニメーションの実装（スクロールイベント編）"
        type="article"
      />
      <h1 className={styles.title}>
        Scrollアニメーション スクロールイベント編
      </h1>
      <div className={styles.list}>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
        <ScrollComponent>fade in</ScrollComponent>
      </div>
    </LayoutDemo>
  );
};

export default Demo2;
