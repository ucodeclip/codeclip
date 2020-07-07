---
slug: post-5
title: GatsbyJSでページ遷移アニメーションを実装する（前編）
date: 2020-07-07
update: 2020-07-07
tag:
  - GatsbyJS
  - アニメーション
  - GSAP
---

## 概要
GatsbyJSでページ遷移アニメーションの実装する方法についてです。  
ちょっと長くなったので「前編」・「後編」にわけました。  
ページ遷移アニメーションにもいくつかの選択肢があるみたいですが、今回は`Gatsby Plugin Transition Link`のプラグインを使用しました。  
またアニメーション自体の実装には`GSAP`を採用しています。  
`Gatsby Plugin Transition Link`にはデフォルトに備わっているアニメーション（`AniLink`）を使用する方法と、自分でカスタマイズしたアニメーションを実装する方法(`TransitionLink`)があるのですが、この記事は「前編」ということで`AniLink`について解説していきます。  
自分で高度なアニメーションを実装する方法については「後編」に書いていきます。


## 前提
- `Gatsby Plugin Transition Link`プラグインを使う
- デフォルトに備わっているアニメーション(`AniLink`)のみを扱い、カスタマイズアニメーション(`TransitionLink`)に関しては「後編」で扱う
- アニメーションの実装には`GSAP`を使う

## プラグインのインストール
なにはともあれ、まずはプラグインのインストール。  
`Gatsby Plugin Transition Link`と`GSAP`をインストールします。  
※前編では`GSAP`を自分で実装することはないのですが、`AniLink`を使用する場合には必ず`GSAP`が必要になります。

```bash:title=shell
npm i gatsby-plugin-transition-link gsap
```

プラグインのインストールができたら`gatsby-config.js`に`gatsby-plugin-transition-link`の記述をします。

```js:title=gatsby-config.js
module.exports = {
    plugins: [
      `gatsby-plugin-transition-link`
    ]
];
```

これで準備は完了です。

## AniLinkの実装
`Gatsby Plugin Transition Link`には独自にページ遷移を実装するための機能がいくつかあります。  
その中でも、もっとも簡単にページ遷移を実装する方法として`AniLink`が存在します。  
`AniLink`は`Gatsby Plugin Transition Link`にデフォルトで備わっているページ遷移アニメーションを簡単に実装できるかわりに、細かいカスタマイズはできません。


まずは`AniLink`をimportします。

```js:title=AniLink-1.js
import AniLink from "gatsby-plugin-transition-link/AniLink";
```

`AniLink`のページ遷移には下記の四つの種類があります。  
- painDrop : クリックしたところから円のアニメーションが出現
- swipe    : ページがサイドにスライドする
- cover    : ページを完全に覆うように要素が被さる
- fade     : フェードで切り替わる

百聞は一件にしかずということで、実装例を見ていきましょう。

```js:title=AniLink-1.js
import React from 'react';
import AniLink from "gatsby-plugin-transition-link/AniLink";//AniLinkのインストール
import styles from "./index.module.scss";


const AniLink1 = () => {
  return (
    <div>
      <div className={styles.main}>
        <h1 className={styles.title}>【AniLink-1ページ】</h1>
        <ul className={styles.AniLinkList}>
          <li>
            {/*
              <paintDrip>
              to       : 遷移先
              duration : アニメーションの時間
              hex      : 色
            */}
            <AniLink
              paintDrip
              to="/demo/demo-5/AniLink-2"
              duration={1}
              hex="#0000ff"
            >
              【paintDrip】AniLink-2へ
            </AniLink>
          </li>
          <li>
            {/*
              <swipe>
              to       : 遷移先
              top      : 重なりの上に来る要素
                         exit か entry を指定。
              duration : アニメーションの時間
            */}
            <AniLink
              swipe
              to="/demo/demo-5/AniLink-2"
              top="exit"
              duration={1}
            >
              【swipe】AniLink-2へ
            </AniLink>
          </li>
          <li>
            {/*
              <cover>
              to        : 遷移先
              duration  : アニメーションの時間
              bg        : 色
              direction : カバー要素の方向
                          up,down,left,right を指定
            */}
            <AniLink
              cover
              to="/demo/demo-5/AniLink-2"
              duration={1}
              bg="#663399"
              direction="down"
            >
              【cover】AniLink-2へ
            </AniLink>
          </li>
          <li>
            {/*
              <fade>
              to        : 遷移先
              duration  : アニメーションの時間
            */}
            <AniLink
              fade
              to="/demo/demo-5/AniLink-2"
              duration={1}
            >
              【fade】AniLink-2へ
            </AniLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AniLink1;
```

```js:title=AniLink-2.js
import React from 'react';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Layout from "../../../components/layout/layout";
import SEO from "../../../components/seo/seo";
import styles from "./index.module.scss";


const AniLink2 = () => {
  return (
    <div>
      <div className={styles.main}>
        <h1 className={styles.title}>【AniLink-2ページ】</h1>
        <ul className={styles.AniLinkList}>
          <li>
            <AniLink fade to="/demo/demo-5/AniLink-1">
              【fade】AniLink-1へ
            </AniLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AniLink2;
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
  background: #ddd;
  box-sizing: border-box;
  @media screen and (min-width:813px) {
    padding: 60px 50px;
  }
  @media screen and (max-width:812px) {
    padding: 16vw 5.333vw 0;
  }
}
.AniLinkList {
  margin-top: 5vmax;
  li {
    + li {
      @media screen and (min-width:813px) {
        margin-top:  30px;
      }
      @media screen and (max-width:812px) {
        margin-top: 8vw;
      }
    }
  }
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

[デモページ](https://codeclip.netlify.app/demo/demo-5/AniLink-1)

上記ページでアニメーションが動いてるのが確認できると思います。

## まとめ
プラグインをインポートするだけで簡単にページ遷移アニメーションが実装できました。  
ただ、`AniLink`では四種類のアニメーションしか表現できないので、自分でもう少し複雑なアニメーションを実装したい場合には`TransitionLink`という別の方法があります。
`TransitionLink`に関しては近日中に「後編」で書いていこうと思います。

## 参考
[Gatsby Plugin Transition Link : 公式Document](https://transitionlink.tylerbarnes.ca/)