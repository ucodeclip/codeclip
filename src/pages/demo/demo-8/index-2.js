import React, { useEffect, useState, useRef } from "react";
import LayoutDemo from "components/layout/layout-demo";
import Seo from "components/seo/seo";
import styles from "./index.module.scss";

const Index = () => {
  const [fruit, setFruit] = useState("orange");
  const [loading, setLoading] = useState(true);
  const ws = useRef();
  const refFruit = useRef(fruit);

  const selectFruit = (e) => {
    ws.current.send(e.currentTarget.getAttribute("data-fruit"));
  };

  useEffect(() => {
    const url = "wss://echo.websocket.org";
    ws.current = new WebSocket(url);

    ws.current.addEventListener("open", (e) => {
      console.log("接続開始");
      setLoading(false);
    });

    ws.current.addEventListener("message", (e) => {
      if (refFruit.current === e.data) {
        alert("Select different fruit.");
      }
      setFruit(e.data);
    });

    ws.current.addEventListener("error", (e) => {
      console.log("エラー : " + e.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refFruit.current = fruit;
  }, [fruit]);

  return (
    <LayoutDemo>
      <Seo
        title="【Demoページ】useEffectの第二引数の配列を空にするとstateが更新されない件 解決ver"
        description="【Demoページ】useEffectの第二引数の配列を空にするとstateが更新されない件　解決ver"
        type="article"
      />
      <div className={styles.main}>
        <h1 className={styles.title}>
          useEffectの第二引数の配列を空にするとstateが更新されない件 解決ver
        </h1>
        <p className={styles.selected}>fruit: {fruit}</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
        )}
      </div>
    </LayoutDemo>
  );
};

export default Index;
