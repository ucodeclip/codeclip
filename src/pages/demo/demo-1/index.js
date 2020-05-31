import React, { useState, useEffect } from 'react';
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo"
import "./index.scss"

const Demo1 = () => {
  const [scrollMout, setScroll] = useState(0);

  const getScroll = () => {
    const currentScrollMount = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
    );
    setScroll(currentScrollMount)
  }

  useEffect(() => {
    window.addEventListener("scroll", getScroll)
    return () => window.removeEventListener('scroll', getScroll)
  });

  return (
    <Layout>
      <SEO
        title="【Demo】Scroll量の取得"
        description="【Demo】Scroll量の取得"
        type="article"
      />
      <div className="counter">スクロール量：{scrollMout}</div>
      <div className="main">
        <div>
          <h1 className="title">Scroll量の取得</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Demo1