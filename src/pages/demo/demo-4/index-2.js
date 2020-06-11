import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo"
import styles from "./index.module.scss"

const TargetComponent = ({children}) => {
  const target = useRef(null);
  const [classNames, setClassNames] = useState([styles.block, styles.scroll])
  useEffect(()=>{
    const cb = (entries) => {
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          //クラスの付け替え
          setClassNames([styles.block, styles.scrollIn])
        }else {
          //クラスの付け替え
          setClassNames([styles.block, styles.scroll])
        }
      })
    };
    const options = {
      root:null,//ビューポートと交差
      rootMargin: "-10% 0px",//上下内側に-10%の地点で処理を実行する
    }
    const io = new IntersectionObserver(cb, options);
    io.observe(target.current)
  },[])
  return (
    <div ref={target} className={classNames.join(" ")}>{children}</div>
  )
}

const Demo2 = () => {
  return (
    <Layout>
      <div className={styles.mainB}>
        <SEO
          title="【Demoページ】Scrollアニメーションの実装(Intersection Observer編)"
          description="【Demoページ】Scrollアニメーションの実装（Intersection Observer編)"
          type="article"
        />
        <h1 className={styles.title}>Scrollアニメーションの実装<br/>Intersection observer編</h1>
        <TargetComponent>target</TargetComponent>
        <TargetComponent>target</TargetComponent>
        <div className={styles.frame}></div>
      </div>
    </Layout>
  )
}

export default Demo2