---
title: js带小数位数字相加和判断对象类型
tag:
 - 面试题
 - 判断对象类型
 - javascript
categories:
 - javascript
 - 判断对象类型
keywords: "js,数字相加,判断对象类型"
addrlink: dda8c81b
date: 2020-04-15 18:17:07
description:
top_img:
cover: "https://img.zhangaming.com/mayday/dna.jpg"
---

##小数位相加
```js
var sq1,sq2,m
try{
  sq1 = num1.toString().split('.')[1].length;
}
catch(e){
  sq1 = 0;
}
try{
  sq2 = num1.toString().split('.')[1].length;
}
catch(e){
  sq2 = 0;
}
m = Math.pow(10,Math.max(sq1,sq2))
```
这是一个方法里面的  最后是return m


## 判断对象类型最全面

```js
console.log(Object.prototype.toString.call("jerry")); //[object String]
console.log(Object.prototype.toString.call(12)); //[object Number]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
console.log(Object.prototype.toString.call(null)); //[object Null]
console.log(Object.prototype.toString.call({
  name: "jerry"
})); //[object Object]
console.log(Object.prototype.toString.call(function () {})); //[object Function]
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call(new Date)); //[object Date]
console.log(Object.prototype.toString.call(/\d/)); //[object RegExp]
function Person() {};
console.log(Object.prototype.toString.call(new Person)); //[object Object]
```