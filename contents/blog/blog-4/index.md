---
slug: post-4
title: GatsbyJSでスクロールアニメーションを実装する(Intersection Observer編)
date: 2020-06-11
update: 2020-06-11
tag:
  - GatsbyJS
  - JavaScript
---

## 概要
[GatsbyJSでスクロールアニメーションを実装する(スクロールイベント編)](/blog/post-3)に引き続き、今回はIntersection Observerを用いたスクロールアニメーションの実装になります。  
パフォーマンスを考えると多くの場面で、スクロールイベントよりIntersection Observerを使用した方法が推奨されています。

## 前提
- プラグインを使わない。  
- Intersection Observer APIを使ってアニメーションする。  
- スクロールイベントについては扱わない。

## Intersection Obserberを扱う

Intersection observer APIは要素の交差を検知するAPIで、
これを使用すると、ある要素（以下ターゲット）がルート要素（デフォルトでは端末のビューポート）と交差した時に処理を実行することができます。  

交差を検知すると聞くとわかりづらいですが、要は指定した要素がビューポートに入った時（あるいは出た時）に何らかの処理を実行するよ、と言うことです。  

簡単に使用例を書きます。

```js:title=example
//entriesに監視対象（複数登録できる）の要素が渡される
const cb = (entries) => {
  //監視対象が複数の時を想定してループで回す
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      //要素がビューポートに入った時の処理

    }else {
      //要素がビューポートから外れた時の処理

    }
  })
};

//コンストラクターを呼び出してIntersection observerを作成し、引数にはコールバック関数を渡す
const observer = new IntersectionObserver(cb);
const target = document.querySelector('#target');
//作成したobserverに監視の対象にしたい要素を渡す
observer.observe(target)
```

上記が通常のIntersection Observerの使用例です。  
GatsbyJSでもDOMの取得方法が異なるくらいで、それ以外ではほとんど違いはありません。  

```js:title=index.js
import React, { useState, useEffect, useRef } from 'react';
import styles from "./index.module.scss"

const classNames = [styles.block,styles.scroll]

const Demo1 = () => {
  //DOMの取得にuseRef()を使う
  const target = useRef(null);
  useEffect(()=>{
    const cb = (entries) => {
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          console.log('in')
        }else {
          console.log('out')
        }
      })
    };
    const observer = new IntersectionObserver(cb);
    observer.observe(target.current)
  },[])

  return (
    <div>
      <div className={styles.mainA}>
        <h1 className={styles.title}>Intersection Observerの実装</h1>
        <div ref={target} className={classNames.join(' ')}></div>
      </div>
    </div>
  )
}

export default Demo1
```

```css:title=index.css
.title {
  position: absolute;
  top: 10vh;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.mainA {
  position: relative;
  min-height: 300vh;
  margin: 0 auto;
  padding: 60px 50px 0;
  background: #ddd;
  box-sizing:border-box;
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.block {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100vh;
  width: 200px;
  height: 50vh;
  @media screen and (min-width:813px) {
    margin-left: 50px;
  }
  @media screen and (max-width:812px) {
    margin: 100vh auto 0;
  }
}
.scroll {
  background: palegreen;
}
```

ターゲット要素がブラウザのビューポートに入った時点で、もしくは出た時点で処理が実行されているのがわかると思います。

[デモはこちら](https://codeclip.netlify.app/demo/demo-4/)

## Intersection Obserberのオブションについて

Intersection observerの作成時にオプションを渡すことができます。

```js
let options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}

const observer = new IntersectionObserver(cb,options);
```

簡単に説明すると
- root：ターゲット要素と交差するルート要素を指定できる。デフォルト（null）だとビューポート。
- rootMargin: ターゲット要素とルート要素の交差範囲を調整できる。
- threshold: ターゲットがどのくらい見えているかの割合を指定できる。

詳細な情報を知りたい方は[MDNのIntersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)の記事に載っていますので、そちらを参照ください。


## スクロールアニメーションの実装

では実際の実装になります。  
今回はビューポートの上下-10%の時点で、ターゲット要素の背景色を変える処理を発火させようと思います。  
また処理の発火地点がわかりやすいように、上下の10%範囲の色を少し変えています。

```js:title=index-2.js
import React, { useState, useEffect, useRef } from 'react';
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
    <div>
      <div className={styles.mainB}>
        <TargetComponent>target</TargetComponent>
        <TargetComponent>target</TargetComponent>
        <div className={styles.frame}></div>
      </div>
    </div>
  )
}

export default Demo2
```

```css:title=index.css
.title {
  position: absolute;
  top: 10vh;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.mainB {
  position: relative;
  min-height: 400vh;
  margin: 0 auto;
  padding: 60px 50px 0;
  background: #ddd;
  box-sizing:border-box;
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.block {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100vh;
  width: 200px;
  height: 50vh;
  @media screen and (min-width:813px) {
    margin-left: 50px;
  }
  @media screen and (max-width:812px) {
    margin: 100vh auto 0;
  }
}
.frame {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
    background: rgba(0,0,0,.1);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10%;
    background: rgba(0,0,0,.1);
  }
}
.scroll {
  background: palegreen;
  &In {
    background: paleturquoise;
  }
}
```

[デモはこちら](https://codeclip.netlify.app/demo/demo-4/index-2)

## Polyfillについて
Intersection Observerはそのままでは `IE11`、`iOS Safari`などで動きません。  
IEならまだしも、iOS Safariを切ることにはなかなかの勇気が必要です。  
なのでPolyfillで対応しましょう。
npmで`intersection-observer`をインストールします。

```bash:title=shell
npm install intersection-observer
```

インストールを終えたら`gatsby-browser.js`を用いてインポートします。


```js:title=gatsby-browser.js
// IntersectionObserver polyfill (Safari, IE)
export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
}
```

これでIE11, iOS Safariでも動くようになっているはずです。

## まとめ
Intersection Observerを使用したスクロールアニメーションの実装ができました。  
冒頭にも書きましたが、スクロールイベントとIntersection Observerを比較した際、パフォーマンス点で後者が優れているので特別な事情がない限りは積極的に使用していきましょう。  

## 参考

[Intersection Observer API - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)