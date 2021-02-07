---
slug: post-8
title: useEffect の第二引数の配列を空にすると state が更新されない件
date: 2021-02-07
update: 2021-02-07
tag:
  - JavaScript
  - React
  - React Hooks
---

## 概要

まあタイトルのとおりなんですが、この前仕事で useEffect の挙動をうっかり忘れてハマってしまったので、その解決策をメモ。

## 前提

- React-hooks の基本がわかる
- WebSocket については省略

## state が更新されない状況とは

useEffect で第二引数の依存配列を空にしてコンポーネントのマウント時になんらかの処理させたい時ありますよね。  
そんな時に state を参照しても更新されないよという話です。

基本的は依存配列に state 渡せよって話なので、あんまり上記のようなケースはないのですが、問題になるのは`setInterval`とか`addEventListener`とかをマウント時に使う時ですね。

私の場合はちょっと特殊だったのですが、WebSocket を実装したケースで問題になったので、今回はそれを例にしたいと思います。

WebSocket わからない方は非同期通信を行ってるってことだけわかれば大丈夫だと思います。

参考 URL: [https://developer.mozilla.org/ja/docs/Web/API/WebSocket](https://developer.mozilla.org/ja/docs/Web/API/WebSocket)

### state が更新されないコード

まずは全体のコードから。

```js:title=index.js
import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";

const Index = () => {
  const [fruit, setFruit] = useState("orange");
  const ws = useRef();

  const selectFruit = e => {
    // データの送信
    // 今回は"wss://echo.websocket.org"にデータを送ってるので、送信が成功すると、送った内容がそのまま返ってくる
    // →messageイベントが発火する
    ws.current.send(e.currentTarget.getAttribute("data-fruit"));
  };

  useEffect(() => {
    // この URL にWebSocketでデータを送ったら、送ったデータがそのまま返ってくる
    const url = "wss://echo.websocket.org";

    // WebSocket 接続を作成
    ws.current = new WebSocket(url);

    // 接続が開始できた時
    ws.current.addEventListener("open", e => {
      console.log("接続開始");
    });

    // メッセージを受け取った時
    // 今回は selectFruit 関数で send したデータがそのまま返ってくる
    ws.current.addEventListener("message", e => {
      // fruitがすでに選択されていたらアラートを出すはず
      if (fruit === e.data) {
        alert("Select different fruit.");
      }
      setFruit(e.data);
    });

    // エラーが発生した時
    ws.current.addEventListener("error", e => {
      console.log("エラー : " + e.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        useEffectの第二引数の配列を空にするとstateが更新されない件
      </h1>
      <p className={styles.selected}>fruit: {fruit}</p>
      <div className={styles.btns}>
        <button onClick={selectFruit} data-fruit="orange">
          orange
        </button>
        <button onClick={selectFruit} data-fruit="apple">
          apple
        </button>
        <button onClick={selectFruit} data-fruit="banana">
          banana
        </button>
      </div>
    </div>
  );
};

export default Index;
```

```scss:title=index.module.scss
.main {
  min-height: 100vmax;
  box-sizing: border-box;
  @media screen and (min-width: 813px) {
    width: 90%;
    margin: 0 auto;
    padding: 60px 0;
  }
  @media screen and (max-width: 812px) {
    padding: 16vw 5.333vw 0;
  }
}
.title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width: 812px) {
    margin-top: 5.333vw;
    font-size: 5.333vw;
  }
}
.selected {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  @media screen and (max-width: 812px) {
    margin-top: 5.333vw;
    font-size: 4.267vw;
  }
}
.btns {
  margin-top: 20px;
  @media screen and (max-width: 812px) {
    margin-top: 5.333vw;
  }
  button {
    &:nth-child(n + 2) {
      margin-left: 20px;
      @media screen and (max-width: 812px) {
        margin-left: 5.333vw;
      }
    }
  }
}
```

[state が更新されないデモページ](/demo/demo-8)

※デモページでは WebSocket の接続が開始されるまでローディングの分岐を入れてますが、今回の趣旨には関係ないため、上記コードでは省略しています。

デモページで適当にボタンをクリックしてみてください。  
なぜか orange のボタンをクリックした時に必ずアラートが出るのがわかると思います。

### なぜ更新されないのか

以下の部分をみてください。

```js:title=index.js
ws.current.addEventListener("message", e => {
  // fruitがすでに選択されていたらアラートを出すはず
  if (fruit === e.data) {
    alert("Select different fruit.");
  }
  setFruit(e.data);
});
```

本来なら `fruit` の state と新しく選択したボタンを比較して、

- 同じ値ならアラートを出す
- 違う値なら `setFruit` 関数を発火するだけ

ということをしたいコードになります。

しかしながら、これだと`messageイベント`内の`fruit`には常に orange が入ってる状態になります。

`setFruit`自体は機能してるので、return の中の`fruit`（下記部分）は更新されます。

```html
<p className="{styles.selected}">fruit: {fruit}</p>
```

これ初めてみた人には不思議な挙動だと思いますが、クロージャを知っていればなんとなく理解できると思います。

```js
const [fruit, setFruit] = useState("orange");

//マウント時のみ実行
useEffect(() => {
  ws.current.addEventListener("message", e => {
    // 初回レンダー時のfruit(orange)をキャプチャ
    if (fruit === e.data) {
      alert("Select different fruit.");
    }
    setFruit(e.data);
  });
}, []);
```

`useEffect`が呼び出された時に、`addEventListener`のコールバックが`fruit`をキャプチャするのですが、今回は`useEffect`の第二引数を空にしているため、マウント時のみしか`useEffect`が実行されません。つまり`fruit`の値がマウント時以降、更新されないわけです。

その結果、常に`addEventListener`内の`fruit`が初期値(orange)を参照することになります。

## 解決策

では、どうするかということですが、まずは解決したコードを載せます。

```js:title=index-2.js
import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";

const Index = () => {
  const [fruit, setFruit] = useState("orange");
  const ws = useRef();
  const refFruit = useRef(fruit);

  const selectFruit = e => {
    ws.current.send(e.currentTarget.getAttribute("data-fruit"));
  };

  useEffect(() => {
    const url = "wss://echo.websocket.org";
    ws.current = new WebSocket(url);

    ws.current.addEventListener("open", e => {
      console.log("接続開始");
    });

    ws.current.addEventListener("message", e => {
      if (refFruit.current === e.data) {
        alert("Select different fruit.");
      }
      setFruit(e.data);
    });

    ws.current.addEventListener("error", e => {
      console.log("エラー : " + e.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refFruit.current = fruit;
  }, [fruit]);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        useEffectの第二引数の配列を空にするとstateが更新されない件 解決ver
      </h1>
      <p className={styles.selected}>fruit: {fruit}</p>
      <div className={styles.btns}>
        <button onClick={selectFruit} data-fruit="orange">
          orange
        </button>
        <button onClick={selectFruit} data-fruit="apple">
          apple
        </button>
        <button onClick={selectFruit} data-fruit="banana">
          banana
        </button>
      </div>
    </div>
  );
};

export default Index;
```

[state が更新されるデモページ](/demo/demo-8/index-2)

デモページでボタンをクリックしてもらうとわかると思いますが、期待通りの挙動をしていると思います。

以下の三箇所が重要になります。

```js
// useRefで新しく定義
const refFruit = useRef(fruit);

// useRefで定義した変数を比較する
ws.current.addEventListener("message", e => {
  if (refFruit.current === e.data) {
    alert("Select different fruit.");
  }
  setFruit(e.data);
});

// fruit を依存配列に入れて refFruitを更新する
useEffect(() => {
  refFruit.current = fruit;
}, [fruit]);
```

詳しく内部でどうなってるのかはよくわかりませんが、`useRef`を使うことによって、いい感じに変更可能な値を定義できるみたいです。

簡単にいうとクラスにおける`this`みたいな挙動を実現してくれるわけです。

## まとめ

`useRef`を使用することによって、更新可能な値が定義できるということでした。  
たまーにこういうケースに出会うんですが、結構トリッキーな解決方法に感じるので忘れないようにしたいですね。

## 参考

[副作用の依存リストが頻繁に変わりすぎる場合はどうすればよいですか？ - フックに関するよくある質問 – React](https://ja.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)

[React Hooks の useEffect 内で setInterval 等を呼び出すと state 等の値が変化しない問題の解決策 - Tkr Blog](https://kgtkr.net/blog/2019/03/20/react-hooks-effect)
