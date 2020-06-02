import React, { useState, useEffect } from 'react';
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo"
import styles from "./index.module.scss"

const Demo1 = () => {
  const [scrollMount, setScroll] = useState(0);

  useEffect(() => {
    const getScroll = () => {
      const currentScrollMount = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
      );
      setScroll(currentScrollMount)
    }
    // スクロールイベントの追加
    // returnで忘れずにスクロールイベントの削除
    window.addEventListener("scroll", getScroll)
    return () => window.removeEventListener('scroll', getScroll)
  },[]);

  return (
    <Layout>
      <SEO
        title="【Demo】Scroll量の取得"
        description="【Demo】Scroll量の取得"
        type="article"
      />
      <div className={styles.counter}>スクロール量：{scrollMount}</div>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Scroll量の取得</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Demo1