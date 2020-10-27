---
slug: post-7
title: Canvasを使って桜がふるアニメーションを実装する
date: 2020-10-27
update: 2020-10-27
tag:
  - JavaScript
  - Canvas
---

## 概要
Cansvasと簡単な数学(sin,cos)を使って桜が降るアニメーションを実装したのでそのメモになります。

[完成デモはこちら](https://ucodeclip.github.io/codeclip_sample/demo-7/06/)

## 前提
- 基本的なJavaScriptがわかる
- 基本的なcanvasの描写
- 数学的な詳細は省く

## 桜の花びらの描写
まずは桜の花びらの描写をしてみましょう。  
桜の花びらをネットで調べると下のサイトがヒットしました。  
[https://sites.google.com/site/cinderellajapan/huanocg/huano-qu-xian](https://sites.google.com/site/cinderellajapan/huanocg/huano-qu-xian)  

数学的なことは説明しません（できません）が、重要なのは以下の式っぽいです。

```js
ulim=0.8;

h(x):=if(x<ulim,0,ulim-x);

r0(x):=(-1)^mod(floor(n/pi*x),2)*(n/pi*x-floor(n/pi*x))+mod(floor(n/pi*x),2);

r(x):=r0(x)+2*h(r0(x));
```

これをJSで実装すると桜の花びらっぽくなるようなので、実際にJSに変換します。

```js
//ulim=0.8;
const ulim = 0.8;

//h(x):=if(x<ulim,0,ulim-x);
const h = (x) => {
  if(x < ulim){
    return 0
  }else {
    return ulim - x;
  }
}

// r0(x):=(-1)^mod(floor(n/pi*x),2)*(n/pi*x-floor(n/pi*x))+mod(floor(n/pi*x),2);
const r0 = (x) => {
  //n/pi*xを変数に変換する
  const V = n/Math.PI*x;

  //modをJSに変換
  const mod = (a,b) =>{
     return a % b;
  };

  //floorをJSに変換
  const floor = (a) => {
    return Math.floor(a);
  };

　//-1^mod(floor(n/pi*x),2)*(n/pi*x-floor(n/pi*x))+mod(floor(n/pi*x),2);
  return Math.pow(-1,mod(floor(V),2))*(V-floor(V))+mod(floor(V),2);
}

//r(x):=r0(x)+2*h(r0(x));
const r = (x) => {
  retun r0(x) + 2*h(r0(x))
}
```

上記の変換した式を使って実装してみます。

```html:title=index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Canvas Sample</title>
  <!-- これはreset.css -->
  <link rel="stylesheet" href="./assets/css/index.css">
  <script src="./assets/js/index.js"></script>
</head>
<body>
  <canvas id="canvas"></canvas>
</body>
</html>
```

```js:title=index.js
(function(){
  //必要な変数の宣言
  let canvas,ctx,positionX,positionY,sakura;
  let winW = window.innerWidth;
  let winH = window.innerHeight;

  window.addEventListener('DOMContentLoaded',function(){
    //初期設定
    init();

    //桜の描写
    render();
  })

  function init(){
    //canvasを用意
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = winW;
    canvas.height = winH;

    //桜の初期位置
    positionX = winW/2;
    positionY = winH/2;

    sakura = new Sakura(ctx,positionX,positionY);
  }

  function render(){

    //桜の描写処理
    sakura.render();
  }
})()

//桜の描写関連はクラスに分けておく
class Sakura {
  constructor(ctx,positionX,positionY){
    this.ctx = ctx;
    this.size = 100;//桜の大きさの調整
    this.n = 5;//桜の花びらの枚数
    this.positionX = positionX;
    this.positionY = positionY;
  }

  render(){
    this.ctx.save();
    //描写位置を中央に
    this.ctx.translate(this.positionX,this.positionY);
    this.ctx.beginPath();
    this.ctx.fillStyle = 'pink';
    this.ctx.moveTo(0,0);

    //0~2πまで x,y を描写する
    for(let i = 0; i < (Math.PI*2); i+= 0.01){
      //計算した結果
      let rv = this._calc(i);

      //距離（rv）にcosをかけてX軸の位置を計算
      let x = this.size * rv * Math.cos(i);
      //距離（rv）にsinをかけてY軸の位置を計算
      let y = this.size * rv * Math.sin(i);

      this.ctx.lineTo(x, y);
    }

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore()
  }

  _calc(x){
    //桜の花びらの枚数
    const ulim = 0.8;
    const h = (x) => {
      if(x < ulim){
        return 0
      }else {
        return ulim - x;
      }
    }
    const r0 = (x) => {
      //this.nは桜の枚数
      const V = this.n/Math.PI*x;
      const mod = (a,b) =>{
        return a % b;
      };
      const floor = (a) => {
        return Math.floor(a);
      };
      return Math.pow(-1,mod(floor(V),2))*(V-floor(V))+mod(floor(V),2);
    }
    const r = (x) => {
      return r0(x) + 2*h(r0(x))
    }
    return r(x)
  }
}
```

[デモはこちら](https://ucodeclip.github.io/codeclip_sample/demo-7/01/)

## 桜の花びらを降らせる
それでは桜の花びらを実際に振らせていきましょう。

### 桜の花びらを上から下に移動する
`requestAnimationFrame`を使用して桜の花びらを上から下に移動させます。

```js:title=index.js
(function(){
  //必要な変数の宣言
  let canvas,ctx,positionX,positionY,sakura;
  let winW = window.innerWidth;
  let winH = window.innerHeight;

  window.addEventListener('DOMContentLoaded',function(){
    //初期設定
    init();

    //桜の描写
    render();
  })

  function init(){
    //canvasを用意
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = winW;
    canvas.height = winH;

    //桜の初期位置
    positionX = winW/2;
    positionY = 0;

    sakura = new Sakura(ctx,winH,winW,positionX,positionY);
  }

  function render(){
    //canvasのリセット
    ctx.clearRect(0, 0, winW, winH);

    //canvasの背景色
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, winW, winH);

    //桜の描写処理
    sakura.update();
    sakura.render();

    //ループ
    requestAnimationFrame(render)
  }
})()

//桜の描写関連はクラスに分けておく
class Sakura {
  constructor(ctx,winH,winW,positionX,positionY){
    this.ctx = ctx;
    this.winH = winH;
    this.winW = winW;
    this.size = 100;//桜の大きさの調整
    this.n = 5;//桜の花びらの枚数
    this.positionX = positionX;
    this.positionY = positionY;
  }

  update(){
    this.positionY += 5;
    if(this.positionY > this.winH){
      this.positionY = -this.size;
    }
  }

  render(){
    this.ctx.save();
    this.ctx.translate(this.positionX,this.positionY);
    this.ctx.beginPath();
    this.ctx.fillStyle = 'pink';
    this.ctx.moveTo(0,0);

    //0~2πまで x,y を描写する
    //ループの範囲をthis.nで割ると桜の花びら一枚分の描写になる
    for(let i = 0; i < (Math.PI*2 / this.n); i+= 0.01){
      //計算した結果
      let rv = this._calc(i);

      //距離（rv）にcosをかけてX軸の位置を計算
      let x = this.size * rv * Math.cos(i);
      //距離（rv）にsinをかけてY軸の位置を計算
      let y = this.size * rv * Math.sin(i);

      this.ctx.lineTo(x, y);
    }

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore()
  }

  _calc(x){
    //桜の花びらの枚数
    const ulim = 0.8;
    const h = (x) => {
      if(x < ulim){
        return 0
      }else {
        return ulim - x;
      }
    }
    const r0 = (x) => {
      //this.nは桜の枚数
      const V = this.n/Math.PI*x;
      const mod = (a,b) =>{
        return a % b;
      };
      const floor = (a) => {
        return Math.floor(a);
      };
      return Math.pow(-1,mod(floor(V),2))*(V-floor(V))+mod(floor(V),2);
    }
    const r = (x) => {
      return r0(x) + 2*h(r0(x))
    }
    return r(x)
  }
}
```

[デモはこちら](https://ucodeclip.github.io/codeclip_sample/demo-7/02/)


### 回転させる
これだけでは自然な動きとは程遠いので花びらに回転を加えます。  
この時、`canvasのrotateメソッド`だけでなく花びらのy軸の大きさ(下記ソースコードでの`this.scaleY`の部分)を変動させることによって三次元に回転させるように見せることができます。

```js:title=index.js
(function(){
  //必要な変数の宣言
  let canvas,ctx,positionX,positionY,sakura;
  let winW = window.innerWidth;
  let winH = window.innerHeight;

  window.addEventListener('DOMContentLoaded',function(){
    //初期設定
    init();

    //桜の描写
    render();
  })

  function init(){
    //canvasを用意
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = winW;
    canvas.height = winH;

    //桜の初期位置
    positionX = winW/2;
    positionY = 0;

    sakura = new Sakura(ctx,winH,winW,positionX,positionY);
  }

  function render(){
    //canvasのリセット
    ctx.clearRect(0, 0, winW, winH);

    //canvasの背景色
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, winW, winH);

    //桜の描写処理
    sakura.update();
    sakura.render();
    requestAnimationFrame(render)
  }
})()

//桜の描写関連はクラスに分けておく
class Sakura {
  constructor(ctx,winH,winW,positionX,positionY){
    this.ctx = ctx;
    this.winH = winH;
    this.winW = winW;
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = 100;//桜の大きさの調整
    this.n = 5;//花びらの枚数
    this.scaleY = 1;//花びらのY軸の大きさ
  }

  update(){
    this.positionY += 5;
    if(this.positionY > this.winH){
      this.positionY = -this.size;
    }

    this.scaleY += 0.02
  }

  render(){
    this.ctx.save();
    this.ctx.translate(this.positionX,this.positionY);
    //sinを使って回転させる
    this.ctx.rotate(Math.sin(this.positionY * Math.PI/180));
    this.ctx.beginPath();
    this.ctx.fillStyle = 'pink';
    this.ctx.moveTo(0,0);

    //0~2πまで x,y を描写する
    //ループの範囲をthis.nで割ると桜の花びら一枚分の描写になる
    for(let i = 0; i < (Math.PI*2 / this.n); i+= 0.01){
      //計算した結果
      let rv = this._calc(i);

      //距離（rv）にcosをかけてX軸の位置を計算
      let x = this.size * rv * Math.cos(i);
      //距離（rv）にsinをかけてY軸の位置を計算
      //Math.cos(this.scaleY)でY軸の大きさを0~1にする（回転しているように見える）
      let y = this.size * Math.cos(this.scaleY) * rv * Math.sin(i);

      this.ctx.lineTo(x, y);
    }

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore()
  }

  _calc(x){
    //桜の花びらの枚数
    const ulim = 0.8;
    const h = (x) => {
      if(x < ulim){
        return 0
      }else {
        return ulim - x;
      }
    }
    const r0 = (x) => {
      //this.nは桜の枚数
      const V = this.n/Math.PI*x;
      const mod = (a,b) =>{
        return a % b;
      };
      const floor = (a) => {
        return Math.floor(a);
      };
      return Math.pow(-1,mod(floor(V),2))*(V-floor(V))+mod(floor(V),2);
    }
    const r = (x) => {
      return r0(x) + 2*h(r0(x))
    }
    return r(x)
  }
}
```
[デモはこちら](https://ucodeclip.github.io/codeclip_sample/demo-7/03/)

### 横の移動に幅をつける
次にx軸方向の移動に幅をつけます。  
これによってゆらゆらを落ちてくる様子を実装できます。

```js:title=index.js
(function(){
  //必要な変数の宣言
  let canvas,ctx,positionX,positionY,sakura;
  let winW = window.innerWidth;
  let winH = window.innerHeight;

  window.addEventListener('DOMContentLoaded',function(){
    //初期設定
    init();

    //桜の描写
    render();
  })

  function init(){
    //canvasを用意
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = winW;
    canvas.height = winH;

    //桜の初期位置
    positionX = winW/2;
    positionY = 0;

    sakura = new Sakura(ctx,winH,winW,positionX,positionY);
  }

  function render(){
    //canvasのリセット
    ctx.clearRect(0, 0, winW, winH);

    //canvasの背景色
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, winW, winH);

    //桜の描写処理
    sakura.update();
    sakura.render();
    requestAnimationFrame(render)
  }
})()

//桜の描写関連はクラスに分けておく
class Sakura {
  constructor(ctx,winH,winW,positionX,positionY){
    this.ctx = ctx;
    this.winH = winH;
    this.winW = winW;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionStartX = this.positionX;
    this.positionRangeX = 100;//x軸方法の幅
    this.positionRangeAddX = 0;
    this.size = 100;//桜の大きさの調整
    this.n = 5;//花びらの枚数
    this.scaleY = 1;//花びらのY軸の大きさ
  }

  update(){
    this.positionY += 5;
    if(this.positionY > this.winH){
      this.positionY = -this.size;
    }

    //x軸方向に動かす
    this.positionRangeAddX += 0.05;
    this.positionX = this.positionStartX + Math.sin(this.positionRangeAddX)*this.positionRangeX;

    this.scaleY += 0.02
  }

  render(){
    this.ctx.save();
    this.ctx.translate(this.positionX,this.positionY);
    //sinを使って回転させる
    this.ctx.rotate(Math.sin(this.positionY * Math.PI/180));
    this.ctx.beginPath();
    this.ctx.fillStyle = 'pink';
    this.ctx.moveTo(0,0);

    //0~2πまで x,y を描写する
    //ループの範囲をthis.nで割ると桜の花びら一枚分の描写になる
    for(let i = 0; i < (Math.PI*2 / this.n); i+= 0.01){
      //計算した結果
      let rv = this._calc(i);

      //距離（rv）にcosをかけてX軸の位置を計算
      let x = this.size * rv * Math.cos(i);
      //距離（rv）にsinをかけてY軸の位置を計算
      //Math.cos(this.scaleY)でY軸の大きさを0~1にする（回転しているように見える）
      let y = this.size * Math.cos(this.scaleY) * rv * Math.sin(i);

      this.ctx.lineTo(x, y);
    }

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore()
  }

  _calc(x){
    //桜の花びらの枚数
    const ulim = 0.8;
    const h = (x) => {
      if(x < ulim){
        return 0
      }else {
        return ulim - x;
      }
    }
    const r0 = (x) => {
      //this.nは桜の枚数
      const V = this.n/Math.PI*x;
      const mod = (a,b) =>{
        return a % b;
      };
      const floor = (a) => {
        return Math.floor(a);
      };
      return Math.pow(-1,mod(floor(V),2))*(V-floor(V))+mod(floor(V),2);
    }
    const r = (x) => {
      return r0(x) + 2*h(r0(x))
    }
    return r(x)
  }
}
```
[デモはこちら](https://ucodeclip.github.io/codeclip_sample/demo-7/04/)


### ランダム性を持たせる
だいぶ自然な動きに近くなってきました。  
今度は大きさや位置にランダム性を持たせてみます。

```js:title=index.js
(function(){
  //必要な変数の宣言
  let canvas,ctx,positionX,positionY,sakura;
  let winW = window.innerWidth;
  let winH = window.innerHeight;

  window.addEventListener('DOMContentLoaded',function(){
    //初期設定
    init();

    //桜の描写
    render();
  })

  function init(){
    //canvasを用意
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = winW;
    canvas.height = winH;

    sakura = new Sakura(ctx,winH,winW);
  }

  function render(){
    //canvasのリセット
    ctx.clearRect(0, 0, winW, winH);

    //canvasの背景色
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, winW, winH);

    //桜の描写処理
    sakura.update();
    sakura.render();
    requestAnimationFrame(render)
  }
})()

//桜の描写関連はクラスに分けておく
class Sakura {
  constructor(ctx,winH,winW){
    this.ctx = ctx;
    this.winH = winH;
    this.winW = winW;
    this.positionX = this._random(0,winW);
    this.positionY = this._random(0,winH);
    this.positionStartX = this.positionX;
    this.positionRangeX = this._random(50,100);//x軸方法の幅
    this.positionRangeAddX = this._random(0,Math.PI*2);
    this.size = this._random(30,60);//桜の大きさの調整
    this.n = 5;//花びらの枚数
    this.scaleY = this._random(0,Math.PI*2);//花びらのY軸の大きさ
    this.scaleAddY = 0.02;
    this.rorate = this._random(0,Math.PI*2);//初期の回転角度
  }

  update(){
    //花びらの大きさによって落ちるスピードを変える
    this.positionY += this.size / 30;
    if(this.positionY > this.winH + this.size){
      this.positionY = -this.size;
    }

    //x軸方向に動かす
    this.positionRangeAddX += 0.05;
    this.positionX = this.positionStartX + Math.sin(this.positionRangeAddX)*this.positionRangeX;

    this.scaleY += this.scaleAddY;
  }

  render(){
    this.ctx.save();
    this.ctx.translate(this.positionX,this.positionY);
    //sinを使って回転させる
    this.ctx.rotate(Math.sin(this.positionY * Math.PI/180) + this.rorate);
    this.ctx.beginPath();
    this.ctx.fillStyle = 'pink';
    this.ctx.moveTo(0,0);

    //0~2πまで x,y を描写する
    //ループの範囲をthis.nで割ると桜の花びら一枚分の描写になる
    for(let i = 0; i < (Math.PI*2 / this.n); i+= 0.01){
      //計算した結果
      let rv = this._calc(i);

      //距離（rv）にcosをかけてX軸の位置を計算
      let x = this.size * rv * Math.cos(i);
      //距離（rv）にsinをかけてY軸の位置を計算
      //Math.cos(this.scaleY)でY軸の大きさを0~1にする（回転しているように見える）
      let y = this.size * Math.cos(this.scaleY) * rv * Math.sin(i);

      this.ctx.lineTo(x, y);
    }

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore()
  }

  _calc(x){
    //桜の花びらの枚数
    const ulim = 0.8;
    const h = (x) => {
      if(x < ulim){
        return 0
      }else {
        return ulim - x;
      }
    }
    const r0 = (x) => {
      //this.nは桜の枚数
      const V = this.n/Math.PI*x;
      const mod = (a,b) =>{
        return a % b;
      };
      const floor = (a) => {
        return Math.floor(a);
      };
      return Math.pow(-1,mod(floor(V),2))*(V-floor(V))+mod(floor(V),2);
    }
    const r = (x) => {
      return r0(x) + 2*h(r0(x))
    }
    return r(x)
  }

  _random(min, max){
    return (Math.floor(Math.random()*(max + 1 - min)) + min);
  }
}
```
[デモはこちら](https://ucodeclip.github.io/codeclip_sample/demo-7/05/)


## 桜の花びらを複数描写する
最後に桜の花びらを複数描写します。

```js:title=index.js
(function(){
  //必要な変数の宣言
  let canvas,ctx,positionX,positionY,sakura;
  let winW = window.innerWidth;
  let winH = window.innerHeight;
  //桜の花びらの配列を作る
  let sakuras = [];
  //花びらの総枚数
  let num = 50;

  window.addEventListener('DOMContentLoaded',function(){
    //初期設定
    init();

    //桜の描写
    render();
  })

  function init(){
    //canvasを用意
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = winW;
    canvas.height = winH;

    //numの数だけループ
    for(let i = 0; i < num; i++){
      sakuras.push(new Sakura(ctx,winH,winW));
    }
  }

  function render(){
    //canvasのリセット
    ctx.clearRect(0, 0, winW, winH);

    //canvasの背景色
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, winW, winH);

    //桜の描写処理
    //花びらの総枚数分ループする
    sakuras.forEach(sakura => {
      sakura.update();
      sakura.render();
    });
    requestAnimationFrame(render)
  }
})()

//桜の描写関連はクラスに分けておく
class Sakura {
  constructor(ctx,winH,winW){
    this.ctx = ctx;
    this.winH = winH;
    this.winW = winW;
    this.positionX = this._random(0,winW);
    this.positionY = this._random(0,winH);
    this.positionStartX = this.positionX;
    this.positionRangeX = this._random(50,100);//x軸方法の幅
    this.positionRangeAddX = this._random(0,Math.PI*2);
    this.size = this._random(30,60);//桜の大きさの調整
    this.n = 5;//花びらの枚数
    this.scaleY = this._random(0,Math.PI*2);//花びらのY軸の大きさ
    this.scaleAddY = 0.02;
    this.rorate = this._random(0,Math.PI*2);//初期の回転角度
  }

  update(){
    //花びらの大きさによって落ちるスピードを変える
    this.positionY += this.size / 30;
    if(this.positionY > this.winH + this.size){
      this.positionY = -this.size;
    }

    //x軸方向に動かす
    this.positionRangeAddX += 0.05;
    this.positionX = this.positionStartX + Math.sin(this.positionRangeAddX)*this.positionRangeX;

    this.scaleY += this.scaleAddY;
  }

  render(){
    this.ctx.save();
    this.ctx.translate(this.positionX,this.positionY);
    //sinを使って回転させる
    this.ctx.rotate(Math.sin(this.positionY * Math.PI/180) + this.rorate);
    this.ctx.beginPath();
    this.ctx.fillStyle = 'pink';
    this.ctx.moveTo(0,0);

    //0~2πまで x,y を描写する
    //ループの範囲をthis.nで割ると桜の花びら一枚分の描写になる
    for(let i = 0; i < (Math.PI*2 / this.n); i+= 0.01){
      //計算した結果
      let rv = this._calc(i);

      //距離（rv）にcosをかけてX軸の位置を計算
      let x = this.size * rv * Math.cos(i);
      //距離（rv）にsinをかけてY軸の位置を計算
      //Math.cos(this.scaleY)でY軸の大きさを0~1にする（回転しているように見える）
      let y = this.size * Math.cos(this.scaleY) * rv * Math.sin(i);

      this.ctx.lineTo(x, y);
    }

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore()
  }

  _calc(x){
    //桜の花びらの枚数
    const ulim = 0.8;
    const h = (x) => {
      if(x < ulim){
        return 0
      }else {
        return ulim - x;
      }
    }
    const r0 = (x) => {
      //this.nは桜の枚数
      const V = this.n/Math.PI*x;
      const mod = (a,b) =>{
        return a % b;
      };
      const floor = (a) => {
        return Math.floor(a);
      };
      return Math.pow(-1,mod(floor(V),2))*(V-floor(V))+mod(floor(V),2);
    }
    const r = (x) => {
      return r0(x) + 2*h(r0(x))
    }
    return r(x)
  }

  _random(min, max){
    return (Math.floor(Math.random()*(max + 1 - min)) + min);
  }
}
```

[デモはこちら](https://ucodeclip.github.io/codeclip_sample/demo-7/06/)  

以上で複数枚の桜の花びらを自然に降らせることができました。

## まとめ
sin,cosを使用することによって自然なアニメーションを簡単に取り入れることができました。  
普段の生活で使うことはあまりないですが、数学・物理を取り入れることができれば、より様々な表現ができると思います。

## 参考

[Canvas API](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API)  
[桜の花びら](https://sites.google.com/site/cinderellajapan/huanocg/huano-qu-xian)