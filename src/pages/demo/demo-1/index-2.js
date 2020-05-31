import React, { useState, useEffect } from 'react';
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo"
import "./index.scss"


const Demo2 = () => {
  const [scrollMout, setScrollMount] = useState(0);
  const [targetDomList, setTargetDomList] = useState([]);

  const getScroll = () => {
    const currentScrollMount = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
    );
    setScrollMount(currentScrollMount)
  }

  const getTargets = () => {
    const targets = document.getElementsByClassName('scroll')
    const targetArray = Array.from(targets);
    setTargetDomList(targetArray);
    setTimeout(() => {
      targetArray.forEach((v)=>{
        const targetPosTop = v.getBoundingClientRect().top　+ window.pageYOffset;
        if( scrollMout > targetPosTop - window.innerHeight + 300){
          v.classList.add('show')
        }
      })
    }, 300);
  }

  const showTarget = () => {
    const targetArray = targetDomList;
    targetArray.forEach((v)=>{
      const targetPosTop = v.getBoundingClientRect().top　+ window.pageYOffset;
      if( scrollMout > targetPosTop - window.innerHeight + 300){
        v.classList.add('show')
      }
    })
  }

  useEffect(() => {
    getTargets();
    window.addEventListener("scroll", getScroll);
    return () => window.removeEventListener('scroll', getScroll);
  },[]);

  useEffect(()=>{
    showTarget();
  },[scrollMout])


  return (
    <Layout>
      <SEO
        title="【Demo】Scrollアニメーションの実装"
        description="【Demo】Scrollアニメーションの実装"
        type="article"
      />
      <div className="main">
        <h1 className="title">Scrollアニメーション Scroll Events編</h1>
        <ul className="list">
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
          <li className="item scroll"></li>
        </ul>
      </div>
    </Layout>
  )
}

export default Demo2