---
title: 函数编写的几种方式
tag:
 - javascript
 - 构造函数
categories:
 - javascript
 - 构造函数
keywords: "js, javascript 函数"
addrlink: dda8c81b
date: 2020-05-6 17:30:33
description:
top_img:
cover: "https://img.zhangaming.com/mayday/dna.jpg"
---

#  函数编写的几种方式

```js
function checkName() {}
function checkEmail() {}
function checkPassword() {}
```

## 另外一种形式

```js
var checkName = function() {}
var checkEmail = function() {}
var checkPassword = function() {}
```

## 把变量放到对象里面

```js
var checkObject = {
  checkName: function() {},
  checkEmail: function() {},
  checkPassword: function() {}
}

console.log(checkObject.checkName())
```

## 对象的另外一种形式

```js
var checkObject = function() {}
checkObject.checkName = function() {}
checkObject.checkEmail = function() {}
checkObject.checkPassword = function() {}

console.log(checkObject.checkName())
```

## 调用函数时 返回一个新的对象

```js
var checkObject = function() {
  return {
    checkName: function() { console.log(1) },
    checkEmail: function() {},
    checkPassword: function() {},
  }
}

var test = checkObject()
test.checkName()
```

## 将对象看成类

```js
var checkObject = function() {
  this.checkName = function() { console.log(1) }
  this.checkEmail = function() {}
  this.checkPassword = function() {}
}

var test = new checkObject()
test.checkName()
```

## 挂载在原型,使之创建对象实例的时候，创建出来的对象所拥有的方法就都是一个

```js
var checkObject = function() {}
checkObject.prototype.checkName = function() { console.log(1) }
checkObject.prototype.checkEmail = function() {}
checkObject.prototype.checkPassword = function() {}
```

## 另外一种写法

```js
var checkObject = function() {}
checkObject.prototype = {
  checkName: function() { console.log(1) },
  checkEmail: function() {},
  checkPassword: function() {}
}

var test = new checkObject()
console.log(test.checkName())
```

## 省去调用3个方法，减少书写3个test

```js
var checkObject = {
  checkName: function () { return this },
  checkEmail: function () { return this },
  checkPassword: function () { return this }
}

console.log(checkObject)
```

## 同样的方式放到类的原型对象中

```js
var checkObject = function() {}
checkObject.prototype = {
  checkName: function() { return 1 },
  checkEmail: function() { return this },
  checkPassword: function() { return this },
}

var test = new checkObject()
console.log(test.checkName())
```

## 在Function中添加

```js
Function.prototype.checkName = function() { return 1 }

var test = function() {}
console.log(test.checkName())
```

## 抽象成统一的添加方法功能

```js
Function.prototype.addMethod = function(name, fn) {
  this[name] = fn
}

var methods = function() {}
methods.addMethod('checkName', function() {
  console.log('do something~')
})
```

## 链式添加

```js
Function.prototype.addMethod = function(name, fn) {
  this[name] = fn
  return this
}

var methods = function() {}

methods.addMethod('checkName', function() {
  return this
}).addMethod('checkEmail', function() {
  return 2
})


console.log(methods.checkName().checkEmail())
```
