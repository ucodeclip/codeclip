import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo"
import styles from "./index.module.scss"

const ScrollComponent = ({children}) => {
  const target = useRef(null);
  const [classNames, setClassNames] = useState([styles.item, styles.scroll]);
  useEffect(() => {
    const targetTopPosition = target.current.getBoundingClientRect().top;
    const showTarget = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      if(scrollPosition > targetTopPosition + 300){
        setClassNames([styles.item,styles.scrollShow])
      }else {
        setClassNames([styles.item,styles.scroll])
      }
    }
    showTarget();
    const onScroll = () => {
      showTarget();
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[]);
  return (
    <div ref={target} className={classNames.join(" ")}>
      {children}
    </div>
  );
}

const Demo2 = () => {
  return (
    <Layout>
      <SEO
        title="【Demo】Scrollアニメーションの実装"
        description="【Demo】Scrollアニメーションの実装"
        type="article"
      />
      <div className={styles.main}>
        <h1 className={styles.title}>Scrollアニメーション スクロールイベント編</h1>
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
      </div>
    </Layout>
  )
}

export default Demo2