---
slug: post-3
title: GatsbyJSでスクロールアニメーションを実装する(スクロールイベント編)
date: 2020-05-26
update: 2020-06-11
tag:
  - GatsbyJS
  - JavaScript
---

## 概要
GatsbyJSでスクールアニメーションの実装ついて、意外と情報が少なかったのでメモ。  
今回はスクロールイベントを使ったスクロールアニメーションの実装になります。  
スクロールアニメーションにはIntersectionObserverを使う方法もあるので、~~こちらについては後日書いていこうと思います~~。[こちら](/blog/post-4)に書きました。

## 前提
- プラグインを使わない。  
- スクロールイベントを使ってアニメーションする。  
- IntersectionObserverについては扱わない。

## スクロールイベントを扱う
スクロールイベントの動作確認のために、まずはスクロール量の取得を行ってみます。  
GatsbyJSでスクロールイベントを使用するには`addEventListener()`メソッドを用いて、スクロールイベントを登録します。  
ページ離脱時に`removeEventListener()`メソッドで、忘れずにイベントの削除をしましょう。  
でないと、ページを遷移後もスクロールイベントが発火し続けてしまいます。


```js:title=index.js
import React, { useState, useEffect } from 'react';
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
```

```scss:title=index.module.scss
.main {
  min-height: calc(300vh - 60px);
  margin: 0 auto;
  padding: 60px 50px 0;
  background: #ddd;
  box-sizing:border-box;
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.counter {
  position: fixed;
  top: 100px;
  left: 50px;
  margin-top: 10px;
  font-size: 20px;
  @media screen and (max-width:812px) {
    top: 26.6667vw;
    left: 5.333vw;
    margin-top: 2.667vw;
    font-size: 5.333vw;
  }
}
```

[スクロール量取得のデモページはこちら](https://codeclip.netlify.app/demo/demo-1/)

## スクロールアニメーションの実装
スクロールイベントの確認ができたら、スクロールアニメーションを実装します。  
まずはアニメーションするコンポーネントの作成を行います。  
`useRef()`を使ってDOMを参照し、DOMの位置を取得しましょう。  
`useState()`を利用してclass名を管理します。

```js:title=index-2.js
const ScrollComponent = ({children}) => {
  // DOMの取得にはuseRef()を使う
  const target = useRef(null);
  const [classNames, setClassNames] = useState(["item", "scroll"]);

  useEffect(() => {
    const targetTopPosition = target.current.getBoundingClientRect().top;
    const showTarget = () => {
      // クラスの切り替え
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
```

全体的なコードは以下になります。

```js:title=index-2.js
import React, { useState, useEffect, useRef } from 'react';
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
    <div>
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
    </div>
  )
}

export default Demo2
```

```scss:title=index.module.scss
.main {
  min-height: calc(300vh - 60px);
  margin: 0 auto;
  padding: 60px 50px 0;
  background: #ddd;
  box-sizing:border-box;
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.counter {
  position: fixed;
  top: 100px;
  left: 50px;
  margin-top: 10px;
  font-size: 20px;
  @media screen and (max-width:812px) {
    top: 26.6667vw;
    left: 5.333vw;
    margin-top: 2.667vw;
    font-size: 5.333vw;
  }
}
.list {
  margin-top: 50px;
  @media screen and (max-width:812px) {
    margin-top: 13.333vw;
  }
}
.item {
  width: 300px;
  height: 300px;
  background: red;
  transition: all .5s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(n + 2) {
    margin-top: 200px;
  }
  @media screen and (max-width:812px) {
    width: 80vw;
    height: 80vw;
    margin: 0 auto;
    &:nth-child(n + 2) {
      margin-top: 26.667vw;
    }
  }
}
.scroll {
  opacity:0;
  visibility: hidden;
  &Show {
    opacity: 1;
    visibility: visible;
  }
}
```

[スクロールアニメーションのデモページはこちら](https://codeclip.netlify.app/demo/demo-1/index-2)

## まとめ
当たり前ですが、GatsbyJSではページ遷移でリロードが生じないので、マウント時にスクロールイベントの登録を行います。  
その際に`removeEventListener()`でイベントの削除記述も忘れないよう気をつけたいですね。  
Intersection Observerを使ったスクロールアニメーションに関しては後日書いていこうと思います。

## 追記
[GatsbyJSでスクロールアニメーションを実装する(Intersection Observer編)](/blog/post-4)書きました。