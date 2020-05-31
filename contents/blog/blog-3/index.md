---
slug: post-3
title: GatsbyJS でスクロールアニメーションを実装する(スクロールイベント編)
date: 2020-05-26
update: 2020-05-26
tag:
  - GatsbyJS
  - JavaScript
---

## 概要
GatsbyJSでスクールアニメーションの実装ついて、意外と情報が少なかったのでメモ。  
今回はスクロールイベントを使ったスクロールアニメーションの実装になります。  
スクロールアニメーションにはIntersectionObserverを使う方法もあるので、こちらについては後日書いていこうと思います。

## 前提
プラグインを使わない。  
スクロールイベントを使ってアニメーションする。  
IntersectionObserverについては扱わない。

## スクロールイベントを使ってスクロール量の取得
まずはスクロール量の取得を行います。  
GatsbyJSでスクロールイベントを使用するには`addEventListener()`メソッドを用いて、スクロールイベントを登録します。  
ページ離脱時に`removeEventListener()`メソッドで、忘れずにイベントの削除をしましょう。  
でないと、ページを遷移後もスクロールイベントが発火し続けてしまいます。


```js:title=index.js
import React, { useState, useEffect } from 'react';
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
    // スクロールイベントの追加
    // returnで忘れずにスクロールイベントの削除
    window.addEventListener("scroll", getScroll)
    return () => window.removeEventListener('scroll', getScroll)
  });

  return (
    <div>
      <div className="counter">スクロール量：{scrollMout}</div>
      <div className="main">
        <div>
          <h1 className="title">Scroll量の取得</h1>
        </div>
      </div>
    </div>
  )
}

export default Demo1
```

```scss:title=index.scss
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

## スクロールイベントを使ったスクロールアニメーションの実装
スクロール量が取得できたら残りは実装するだけです。  
ページ遷移時（マウント時）に`scroll`クラスがついた要素を取得してstateに保存します。  
スクロール量を監視して、スクロール量が一定の値にきたら表示したい要素に`show`クラスをつけます。


```js:title=index-2.js
import React, { useState, useEffect } from 'react';
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
  }

  const showTarget = (scrollMount, targetArray) => {
    targetArray.forEach((v)=>{
      const targetPosTop = v.getBoundingClientRect().top　+ window.pageYOffset;
      if( scrollMount > targetPosTop - window.innerHeight + 300){
        v.classList.add('show')
      }
    })
  }

  useEffect(() => {
    getTargets();
    window.addEventListener("scroll", getScroll);
    // returnで忘れずにスクロールイベントの削除
    return () => window.removeEventListener('scroll', getScroll);
  },[]);

  useEffect(() => {
    //scroll量を監視
    showTarget(scrollMount, targetArray)
  },[scrollMount, targetDomList]);

  return (
    <div>
      <div className="main">
        <h1 className="title">Scrollアニメーション スクロールイベント編</h1>
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
    </div>
  )
}

export default Demo2
```

```scss:title=index.scss
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
  &.show {
    opacity:1;
    visibility:visible
  }
}
```

[スクロールアニメーションのデモページはこちら](https://codeclip.netlify.app/demo/demo-1/index-2)

## まとめ
当たり前ですが、GatsbyJSではページ遷移でリロードが生じないので、マウント時にスクロールイベントの登録を行います。  
その際に`removeEventListener()`でイベントの削除記述も忘れないようにしたいですね。  
IntersectionObserverを使ったスクロールアニメーションに関してはまた後日書いていこうと思います。
