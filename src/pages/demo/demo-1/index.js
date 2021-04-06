import React, { useState, useEffect } from "react";
import LayoutDemo from "../../../components/layout/layout-demo";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";

const Demo1 = () => {
  const [scrollMount, setScroll] = useState(0);

  useEffect(() => {
    const getScroll = () => {
      const currentScrollMount = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      setScroll(currentScrollMount);
    };
    // スクロールイベントの追加
    // returnで忘れずにスクロールイベントの削除
    window.addEventListener("scroll", getScroll);
    return () => window.removeEventListener("scroll", getScroll);
  }, []);

  return (
    <LayoutDemo>
      <SEO
        title="【Demoページ】Scroll量の取得"
        description="【Demoページ】Scroll量の取得"
        type="article"
      />
      <div className={styles.counter}>スクロール量：{scrollMount}</div>
      <div>
        <h1 className={styles.title}>Scroll量の取得</h1>
      </div>
    </LayoutDemo>
  );
};

export default Demo1;
