import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo"
import "./index.scss"

const ScrollComponent = ({children}) => {
  const target = useRef(null);
  const [classNames, setClassNames] = useState(["item", "scroll"]);
  useEffect(() => {
    const targetTopPosition = target.current.getBoundingClientRect().top;
    const showTarget = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      if(scrollPosition > targetTopPosition + 300){
        setClassNames(["item","scroll","show"])
      }else {
        setClassNames(["item","scroll"])
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
    <li ref={target} className={classNames.join(" ")}>
      {children}
    </li>
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
      <div className="main">
        <h1 className="title">Scrollアニメーション スクロールイベント編</h1>
        <div className="list">
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