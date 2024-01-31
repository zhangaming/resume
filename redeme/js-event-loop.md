---
title: js eventLoop事件执行顺序
tag:
 - 笔试题
 - javascript
categories:
 - 面试题
 - eventLoop事件执行顺序
keywords: "js, 面试题,javascript"
addrlink: dda8c81b
date: 2020-09-16 17:10:33
description:
top_img:
cover: "https://img.zhangaming.com/mayday/dna.jpg"
---

## 随机取35以内的7个不重复的整数

```js
let arr = []


while (arr.length<7) {
  let num =parseInt( (Math.random()*10)+1)
  if(!arr.some(item=>item===num)){
    arr.push(num)
  }
}
console.log(arr)
```

## 宏微任务

### 宏任务


```js
#	浏览器	Node
setTimeout	√	√
setInterval	√	√
setImmediate	x	√
requestAnimationFrame	√	x
```

### 微任务

```js
#	浏览器	Node
process.nextTick	x	√
MutationObserver	√	x
Promise.then catch finally	√	√
```

### 例子

```js
//主线程直接执行
console.log('1');
// 丢到宏事件队列中
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
//微事件1
process.nextTick(function() {
    console.log('6');
})
// 主线程直接执行
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    //微事件2
    console.log('8')
})
//丢到宏事件队列中
setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// 1->7->6->8->2->4->9->11->3->10->5->12
```

过程解析
```js
首先浏览器执行js进入第一个宏任务进入主线程, 直接打印console.log('1')

• 遇到 setTimeout  分发到宏任务Event Queue中

• 遇到 process.nextTick 丢到微任务Event Queue中

• 遇到 Promise， new Promise 直接执行 输出 console.log('7');

• 执行then 被分发到微任务Event Queue中

•第一轮宏任务执行结束，开始执行微任务 打印 6,8

•第一轮微任务执行完毕，执行第二轮宏事件，执行setTimeout

•先执行主线程宏任务，在执行微任务，打印'2,4,3,5'

•在执行第二个setTimeout,同理打印 ‘9,11,10,12’

•整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。

以上是在浏览器环境下执行的数据，只作为宏任务和微任务的分析，我在node环境下测试打印出来的顺序为：1，7，6，8，2，4，9，11，3，10，5，12。node环境执行结果和浏览器执行结果不一致的原因是：浏览器的Event loop是在HTML5中定义的规范，而node中则由libuv库实现。libuv库流程大体分为6个阶段：timers，I/O callbacks，idle、prepare，poll，check，close callbacks，和浏览器的microtask，macrotask那一套有区别。
```

## 笔试题 

> 下面有四道题目

### 第一题
```js
setTimeout(() => {
  console.log(4);
}, 0);

new Promise(resolve=>{
  console.log(1);
  for(let i =0;i<10000;i++){
      i == 9999 && resolve();
  }
  console.log(2)
}).then(()=>{
  console.log(5)
})

console.log(3)

//答案 1, 2, 3  5 4
```

### 第二题

```js
console.log('A');

setTimeout(()=>console.log('B'),1000)

const start = new Date()

while(new Date()-start<3000){}

console.log('C')

setTimeout(()=>console.log('D'),0)

new Promise((resolve,reject)=>{
  console.log('EEE');
  foo.bar(100)
}).then(()=>console.log('F'))
.then(()=>console.log('G'))
.catch(()=>console.log('H'))
console.log('I')

// 答案
// A
// C
// EEE
// I
// H
// B
// D
```

### 第三题

```js
console.log(1);
setTimeout(() => {
  console.log(2);
  new Promise(resolve => {
    console.log(3);
    setTimeout(() => console.log(4), 0); //宏
      for (let i = 1; i < 1000; i++) {
        resolve();
      }
      console.log(5);
    })
    .then(() => {
      setTimeout(() => console.log(12), 0); //宏
      console.log(11);
    });

    console.log(6);

    setTimeout(() => {
        console.log(7); //宏
    }, 0);
    
}, 0);

Promise.resolve().then(() => {
  console.log(8);
});

setTimeout(() => {
  console.log(10);
},0);

// 答案 NODE: // 1 8 2 3 5 6 10 11 4 7 12
// 答案 WINDOW: // 1 8 2 3 5 6 11 10 4 7 12

```

### 第四题

```js
setTimeout(()=>{
  console.log('0')
})

new Promise((resolve,reject)=>{
  console.log('1')
  resolve();
}).then(()=>{
  console.log('2')
  new Promise((resolve,reject)=>{
    console.log('3')
    resolve()
  }).then(()=>{
    console.log('4')
  }).then(()=>{
    console.log('5')
  }).then(()=>{
    console.log('13')
  })
}).then(()=>{
  console.log('6')
}).then(()=>{
  console.log('11')
})

new Promise((resolve,reject)=>{
  console.log('7')
  resolve()
}).then(()=>{
  console.log('8')
})
.then(()=>{
  console.log('12')
})

// 答案 层数代表then的位置

// 1
// 7
// 第一层
// 2
// 3
// 第一层
// 8
// 第1层
// 4
// 第2层
// 6
// 第2层
// 12
// 第2层
// 5
// 第3层
// 11
// 第3层
// 13
// 0

```