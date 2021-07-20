---
slug: post-6
title: GatsbyJSでページ遷移アニメーションを実装する（後編）
date: 2020-07-26
update: 2020-07-26
tag:
  - GatsbyJS
  - アニメーション
  - GSAP
---

## 概要

GatsbyJS でページ遷移アニメーションを実装する方法の後編になります。  
「[前編](/blog/post-5)」に引き続き、`Gatsby Plugin Transition Link`プラグインを使用したページ遷移アニメーションの実装になります。  
今回は`TransitionLink`（カスタムアニメーション）の実装について書いていこうと思います。  
また、アニメーション自体の実装には`GSAP`を採用しています。

## 前提

- `Gatsby Plugin Transition Link`プラグインを使う
- カスタマイズアニメーション(`TransitionLink`)のみを扱い、デフォルトに備わっているアニメーション(`AniLink`)に関しては「前編」で扱う
- アニメーションの実装には`GSAP`を使う

## プラグインのインストール

「[前編](/blog/post-5)」に書いてありますので、そちらをご参照ください。

## TransitionLink の実装

まずは`TransitionLink`を import します。

```js
import TransitionLink from "gatsby-plugin-transition-link";
```

`TransitionLink`の基本的な使い方ですが、`to`、`exit`、`entry`の 3 つのプロパティを持たせることができます。

- `to` : リンク先
- `exit` : 現在のページに関することを定義する
- `enty` : リンク先のページに関することを定義する

`GSAP`等でアニメーションを定義しておき、下記のように`trigger`を用いて`entry`、`exit`内で関数を発火させます。  
`entry`、`exit`には length や delay といったプロパティを持たせることができます。

```js
<TransitionLink
  to="/demo/demo-6/TransitionLink-2"
  exit={{
    // 現在のページ
    // nodeで現在のページがラップされたdomを取得できる
    // lengthでアニメーションの長さを指定
    trigger: ({ node }) => ExitAnimation(node),
    length: 1,
  }}
  entry={{
    // 飛び先のページ
    // nodeでリンク先のページがラップされたdomを取得できる
    // delayでページ遷移までの遅延を指定
    trigger: ({ node }) => EntryAnimation(node),
    delay: 0.6,
  }}
>
  TransitionLink-2へ
</TransitionLink>
```

では、実際に実装してみます。

```js:title=TransitionLink-1.js
import React from 'react';
import TransitionLink from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";

const TransitionLink1 = () => {
  const exitAnimation = (node) => {
    gsap.to(node, {rotation: 45, duration: 1, opacity: 1});
  }
  const entryAnimation = (node) => {
    gsap.from(node, {rotation: 45, duration: 1, opacity: 1});
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionLink-1ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionLink-2"
            exit={{
              // nodeを渡す
              // exitAnimationを発火
              trigger: ({ node }) => exitAnimation(node),
              length: 1
            }}
            entry={{
              // nodeを渡す
              // entryAnimationを発火
              trigger: ({ node }) => entryAnimation(node),
              delay: 1,
              length: 1
            }}
          >
            TransitionLink-2へ
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}

export default TransitionLink1;
```

```js:title=TransitionLink-2.js
import React from 'react';
import TransitionLink from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";

const TransitionLink2 = () => {
  const exitAnimation = (node) => {
    gsap.to(node, {y: 100, duration: 1, opacity: 0});
  }
  const enterAnimation= (node) => {
    gsap.from(node, {y: 100, duration: 1, opacity: 0});
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionLink-2ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionLink-1"
            exit={{
              trigger: ({ node }) => exitAnimation(node),
              length: 1
            }}
            entry={{
              trigger: ({ node }) => enterAnimation(node),
              delay: 1,
              length: 1
            }}
          >
            TransitionLink-1へ
          </TransitionLink>
        </div>
      </div>
    </div>
  )
}

export default TransitionLink2;
```

```css:title=index.module.scss
.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.main {
  min-height: 100vmax;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    width: 90%;
    margin: 0 auto;
    padding: 60px 0;
  }
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.TransitionContainer {
  margin-top: 1vmax;
}
.TransitionLink {
  position: relative;
  a {
    color: #4ab4fc;
    display: block;
    font-weight: 600;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
```

[TransitionLink のデモページ](https://codeclip.netlify.app/demo/demo-6/TransitionLink-1)

## TransitionState の実装

`TransitionState`を使用するとページ内もしくはコンポーネント内の任意の場所で遷移状態を取得することができます。  
言葉にするとわかりづらいですが、要するに一部のコンポーネントだけ別のアニメーションを適応させることができるようになります。

なにはともあれ、まずは import します。

```js
import { TransitionState } from "gatsby-plugin-transition-link";
```

`TransitionState`で取得できる状態は、`entering`、`entered`、`exiting`、`exited`の 4 種類になります。

- `entering` : 出現中
- `entered` : 出現
- `exiting` : 消失中
- `exited` : 消失

また上記 4 種類の状態とは別に`mount`を取得することができます。  
`mount`ではマウントされたか・されていないかを true・false で取得します。

```js
const TransitionTarget = ({mount,transitionStatus}) => {
  return (
    // ...略...
  )
}
<TransitionState>
  {({ mount, transitionStatus }) => {
    // mountでマウントされたか・されてないかを渡す
    // transitionStatusで遷移状態を渡す
    return (
      <TransitionTarget mount={mount} status={transitionStatus} />
    )
  }}
</TransitionState>
```

基本的な使い方は上記のよう形になると思います。

`mount`、`transitionStatus`に、いつどのような値が渡ってくるのか確かめて見ましょう。

```js:title=TransitionState-1.js
import React from 'react';
import TransitionLink, {TransitionState} from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";

const TransitionTarget = ({mount, status}) => {
  console.log(mount, status)
  const mountFlg = mount ? 'true' : 'false';
  return (
    <div className={styles.TransitionStateBox}>
      mount: {mountFlg}<br />
      status: {status}
    </div>
  )
}

const TransitionState1 = () => {
  const exitAnimation = (node) => {
    gsap.to(node, {duration: 3, opacity: 0});
  }
  const entryAnimation = (node) => {
    gsap.from(node, {duration: 3, opacity: 0});
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionState-1ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionState-2"
            exit={{
              // nodeを渡す
              // exitAnimationを発火
              trigger: ({ node }) => exitAnimation(node),
              length: 3
            }}
            entry={{
              // nodeを渡す
              // entryAnimationを発火
              trigger: ({ node }) => entryAnimation(node),
              delay: 3,
              length: 3
            }}
          >
            TransitionState-2へ
          </TransitionLink>
        </div>
        <TransitionState>
          {({ mount, transitionStatus }) => {
            return (
                <TransitionTarget mount={mount} status={transitionStatus}/>
            )
          }}
        </TransitionState>
      </div>
    </div>
  )
}

export default TransitionState1;
```

```js:title=TransitionState-2.js
import React from 'react';
import TransitionLink, {TransitionState} from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";


const TransitionTarget = ({mount, status}) => {
  console.log(mount, status)
  const mountFlg = mount ? 'true' : 'false';
  return (
    <div className={styles.TransitionStateBox}>
      mount: {mountFlg}<br />
      status: {status}
    </div>
  )
}

const TransitionState2 = () => {
  const exitAnimation = (node) => {
    gsap.to(node, {duration: 3, opacity: 0});
  }
  const entryAnimation = (node) => {
    gsap.from(node, {duration: 3, opacity: 0});
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionState-2ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionState-1"
            exit={{
              // nodeを渡す
              // exitAnimationを発火
              trigger: ({ node }) => exitAnimation(node),
              length: 3
            }}
            entry={{
              // nodeを渡す
              // entryAnimationを発火
              trigger: ({ node }) => entryAnimation(node),
              delay: 3,
              length: 3
            }}
          >
            TransitionState-1へ
          </TransitionLink>
        </div>
        <TransitionState>
          {({ mount, transitionStatus }) => {
            return (
                <TransitionTarget mount={mount} status={transitionStatus}/>
            )
          }}
        </TransitionState>
      </div>
    </div>
  )
}

export default TransitionState2;
```

```css:title=index.module.css
.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.main {
  min-height: 100vmax;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    width: 90%;
    margin: 0 auto;
    padding: 60px 0;
  }
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.TransitionContainer {
  margin-top: 1vmax;
}
.TransitionLink {
  position: relative;
  a {
    color: #4ab4fc;
    display: block;
    font-weight: 600;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
.TransitionStateBox {
  margin-top: 2vmax;
  background: #232946;
  color: #fff;
  padding: 3%;
}
```

[TransitionState のデモページ](https://codeclip.netlify.app/demo/demo-6/TransitionState-1)

上記デモページでも実際に渡ってくる値が確認できると思います。

## TransitionState を用いたアニメーションの実装

では、実際に`TransitionState`を用いてアニメーションを実装しましょう。

```js:title=TransitionStateAnimation-1.js
import React, {useRef} from 'react';
import TransitionLink, {TransitionState} from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";

const TransitionTarget = ({mount, status}) => {
  const target = useRef(null)　//useRefでdomの取得
  const entryAnimation = (target) => {
    gsap.to(target, {y: 0, duration: 1, opacity: 1});
  }
  if( mount && status === 'entered' ){
    //statusがenteredの時にアニメーション発火
    entryAnimation(target.current)
  }

  return (
    <div className={styles.TransitionTarget} ref={target}>
      Animation Target
    </div>
  )
}

const TransitionStateAnimation1 = () => {
  const exitAnimation = (node) => {
    gsap.to(node, {y: 100, duration: 1, opacity: 0});
  }
  const entryAnimation = (node) => {
    gsap.from(node, {y: 100, duration: 1, opacity: 0});
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionStateAnimation-1ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionStateAnimation-2"
            exit={{
              // nodeを渡す
              // exitAnimationを発火
              trigger: ({ node }) => exitAnimation(node),
              length: 1
            }}
            entry={{
              // nodeを渡す
              // entryAnimationを発火
              trigger: ({ node }) => entryAnimation(node),
              delay: 1,
              length: 1
            }}
          >
            TransitionState-2へ
          </TransitionLink>
        </div>
        <TransitionState>
          {({ mount, transitionStatus }) => {
            return (
                <TransitionTarget mount={mount} status={transitionStatus}/>
            )
          }}
        </TransitionState>
      </div>
    </div>
  )
}

export default TransitionStateAnimation1;
```

```js:title=TransitionStateAnimation-2.js
import React, {useRef} from 'react';
import TransitionLink, {TransitionState} from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";

const TransitionTarget = ({mount, status}) => {
  const target = useRef(null) //useRefでdomの取得
  const entryAnimation = (target) => {
    gsap.to(target, {x: 0, duration: 1, opacity: 1});
  }
  if( mount && status === 'entered' ){
    //statusがenteredの時にアニメーション発火
    entryAnimation(target.current)
  }

  return (
    <div className={styles.TransitionTarget2} ref={target}>
      Animation Target
    </div>
  )
}

const TransitionStateAnimation2 = () => {
  const exitAnimation = (node) => {
    gsap.to(node, {x: 100, duration: 1, opacity: 0});
  }
  const entryAnimation = (node) => {
    gsap.from(node, {x: 100, duration: 1, opacity: 0});
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionStateAnimation-2ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionStateAnimation-1"
            exit={{
              // nodeを渡す
              // exitAnimationを発火
              trigger: ({ node }) => exitAnimation(node),
              length: 1
            }}
            entry={{
              // nodeを渡す
              // entryAnimationを発火
              trigger: ({ node }) => entryAnimation(node),
              delay: 1,
              length: 1
            }}
          >
            TransitionState-1へ
          </TransitionLink>
        </div>
        <TransitionState>
          {({ mount, transitionStatus }) => {
            return (
                <TransitionTarget mount={mount} status={transitionStatus}/>
            )
          }}
        </TransitionState>
      </div>
    </div>
  )
}

export default TransitionStateAnimation2;
```

```css:index.module.css
.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.main {
  min-height: 100vmax;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    width: 90%;
    margin: 0 auto;
    padding: 60px 0;
  }
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.TransitionContainer {
  margin-top: 1vmax;
}
.TransitionLink {
  position: relative;
  a {
    color: #4ab4fc;
    display: block;
    font-weight: 600;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
.TransitionTarget {
  margin-top: 2vmax;
  padding: 3%;
  background: #232946;
  color: #fff;
  text-align: center;
  opacity: 0;
  transform: translate(0, 100%);
}
.TransitionTarget2 {
  margin-top: 2vmax;
  padding: 3%;
  background: #232946;
  color: #fff;
  text-align: center;
  opacity: 0;
  transform: translate(100%, 0);
}
```

[TransitionStateAnimation のデモページ](https://codeclip.netlify.app/demo/demo-6/TransitionStateAnimation-1)

## TransitionPortal の実装

`TransitionPortal`はページ遷移前と遷移後で共通の要素を使いたい時に使用します。

まずは、import を忘れずに。

```js
import { TransitionPortal } from "gatsby-plugin-transition-link";
```

```js
const CommonParts = () => {
  return (
    //...略...
  )
}
<TransitionPortal>
  <CommonParts />
</TransitionPortal>
```

基本的な使い方は上記の形になります。  
共通で使いたい部分を`TransitionPortal`でラップするだけです。

使い方がわかったところで、実装してみましょう。

```js:title=TransitionPortal-1.js
import React, {useRef} from 'react';
import TransitionLink, {TransitionPortal} from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";

const TransitionPortal1 = () => {
  const commonLayer = useRef(null) //useRefでdomを取得
  const exitAnimation = () => {
    gsap.timeline()
    .to(commonLayer.current, {
      y: '0%',
      ease: "power1.easeInOut",
      duration: .5,
    })
    .to(commonLayer.current, {
      y: '100%',
      ease: "power1.easeInOut",
      duration: .5,
    })
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionPortal-1ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionPortal-2"
            exit={{
              trigger: () => exitAnimation(),
              length: 1
            }}
            entry={{
              delay: .5,
              length: 1
            }}
          >
            TransitionPortal-2へ
          </TransitionLink>
        </div>
        <TransitionPortal>
          // 遷移前後での共通部分
          // useRefでdomの取得
          <div
            ref={commonLayer}
            style={{
              position: 'fixed',
              background: '#4b2571',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              transform: 'translateY(-100%)',
            }}
          />
        </TransitionPortal>
      </div>
    </div>
  )
}

export default TransitionPortal1;
```

```js:title=TransitionPortal-2.js
import React, {useRef} from 'react';
import TransitionLink, {TransitionPortal} from "gatsby-plugin-transition-link";
import gsap from 'gsap'
import styles from "./index.module.scss";

const TransitionPortal2 = () => {
  const commonLayer = useRef(null)
  const exitAnimation = () => {
    gsap.timeline()
    .to(commonLayer.current, {
      y: '0%',
      ease: "power1.easeInOut",
      duration: .5,
    })
    .to(commonLayer.current, {
      y: '100%',
      ease: "power1.easeInOut",
      duration: .5,
    })
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>【TransitionPortal-2ページ】</h1>
      <div className={styles.TransitionContainer}>
        <div className={styles.TransitionLink}>
          <TransitionLink
            to="/demo/demo-6/TransitionPortal-1"
            exit={{
              trigger: () => exitAnimation(),
              length: 1
            }}
            entry={{
              delay: .5,
              length: 1
            }}
          >
            TransitionPortal-1へ
          </TransitionLink>
        </div>
        <TransitionPortal>
          // 遷移前後での共通部分
          // useRefでdomの取得
          <div
            ref={commonLayer}
            style={{
              position: 'fixed',
              background: '#4b2571',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              transform: 'translateY(-100%)',
            }}
          />
        </TransitionPortal>
      </div>
    </div>
  )
}

export default TransitionPortal2;
```

```css:title=index.module.scss
.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width:812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.main {
  min-height: 100vmax;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    width: 90%;
    margin: 0 auto;
    padding: 60px 0;
  }
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.TransitionContainer {
  margin-top: 1vmax;
}
.TransitionLink {
  position: relative;
  a {
    color: #4ab4fc;
    display: block;
    font-weight: 600;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
```

[TransitionPortal のデモページ](https://codeclip.netlify.app/demo/demo-6/TransitionPortal-1)

ページ遷移の前後で共通のレイヤーが上に覆いかぶさっているのがわかると思います。

## まとめ

`TransitionLink`を使うことによってオリジナルのアニメーションを簡単に実装することができました。  
今回は基本的な機能について書きましたが、このブログで紹介した機能以外にも色々あるのでぜひ使ってみてください。

## 参考

[Gatsby Plugin Transition Link](https://transitionlink.tylerbarnes.ca/)  
[GreenSock(GSAP)](https://greensock.com/gsap/)
