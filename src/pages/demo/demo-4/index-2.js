import React, { useState, useEffect, useRef } from "react";
import LayoutDemo from "../../../components/layout/layout-demo";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";

const TargetComponent = ({ children }) => {
  const target = useRef(null);
  const [classNames, setClassNames] = useState([styles.block, styles.scroll]);
  useEffect(() => {
    const cb = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //クラスの付け替え
          setClassNames([styles.block, styles.scrollIn]);
        } else {
          //クラスの付け替え
          setClassNames([styles.block, styles.scroll]);
        }
      });
    };
    const options = {
      root: null, //ビューポートと交差
      rootMargin: "-10% 0px", //上下内側に-10%の地点で処理を実行する
    };
    const io = new IntersectionObserver(cb, options);
    io.observe(target.current);
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
      <SEO
        title="【Demoページ】Scrollアニメーションの実装(Intersection Observer編)"
        description="【Demoページ】Scrollアニメーションの実装（Intersection Observer編)"
        type="article"
      />
      <div className={styles.mainB}>
        <h1 className={styles.title}>
          Scrollアニメーションの実装
          <br />
          Intersection observer編
        </h1>
        <TargetComponent>target</TargetComponent>
        <TargetComponent>target</TargetComponent>
        <div className={styles.frame}></div>
      </div>
    </LayoutDemo>
  );
};

export default Demo2;
