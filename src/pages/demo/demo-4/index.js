import React, { useEffect, useRef } from "react";
import LayoutDemo from "../../../components/layout/layout-demo";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";

const classNames = [styles.block, styles.scroll];

const Demo1 = () => {
  //DOMの取得にuseRef()を使う
  const target = useRef(null);
  useEffect(() => {
    const cb = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("in");
        } else {
          console.log("out");
        }
      });
    };
    const observer = new IntersectionObserver(cb);
    observer.observe(target.current);
  }, []);

  return (
    <LayoutDemo>
      <SEO
        title="【Demoページ】Intersection Observerの実装"
        description="【Demoページ】Intersection Observerの実装"
        type="article"
      />
      <div className={styles.mainA}>
        <h1 className={styles.title}>Intersection Observerの実装</h1>
        <div ref={target} className={classNames.join(" ")}></div>
      </div>
    </LayoutDemo>
  );
};

export default Demo1;
