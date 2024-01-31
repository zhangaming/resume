---
title: JavaScript设计模式
tag:
 - 设计模式
 - javascript
categories:
 - javascript
 - 设计模式
keywords: "javascript,算法"
addrlink: dda8c81b
date: 2020-07-20 17:42:07
description:
top_img:
cover: "https://img.zhangaming.com/mayday/dna.jpg"
---

## 面向对象编程

### 函数编写的几种方式

详细内容看前面的文章

### 封装-继承-多态

详细内容看前面的文章

## 创建型设计模式

### 简单工厂模式

> <a href="https://www.runoob.com/design-pattern/factory-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/06/19
 * @description: 简单工厂模式
 */

// 非简单工厂模式

var LoginAlert = function(text) {
  this.content = text
}
LoginAlert.prototype.show = function() {
  console.log('alert is show')
}
var userNameAlert = new LoginAlert('username')
userNameAlert.show()
var passwordAlert = new LoginAlert('password')
passwordAlert.show()

var LoginConfirm = function(text) {
  this.content = text
}
LoginConfirm.prototype.show = function() {
  console.log('confirm')
  // 显示确认框
}
var loginFailConfirm = new LoginConfirm('username is tan90')
loginFailConfirm.show()

var LoginPrompt = function(text) {
  this.content = text
}
LoginPrompt.prototype.show = function() {
  console.log('prompt')
  // 显示提示框
}
var loginFailPrompt = new LoginPrompt('prompt is tan90')
loginFailPrompt.show()

/**
 * 简单工厂模式
 *
 * 多个类，只提供1个。
 * 封装在一个函数，通过函数创建需要的对象，就不用关注这些对象基于哪些类及为工程函数
 */

// 篮球基类
var Basketball = function() {
  this.intro = 'basketball~~~'
}
Basketball.prototype = {
  getMember: function() {
    console.log('team people 5')
  },
  getBallColor: function() {
    console.log('basketball color')
  }
}


// 足球基类
var Football = function() {
  this.intro = 'football~~~'
}
Football.prototype = {
  getMember: function() {
    console.log('team people 11')
  },
  getBallColor: function() {
    console.log('football color')
  }
}

// 网球基类
var Tennis = function() {
  this.intro = 'tennis~~~'
}
Tennis.prototype = {
  getMember: function() {
    console.log('team people 1')
  },
  getBallColor: function() {
    console.log('tennis color')
  }
}


// 运动工厂
var SprotsFactory = function(name) {
  switch(name) {
    case 'NBA':
      return new Basketball()
    case 'wordCup':
      return new Football()
    case 'FrenchOpen':
      return new Tennis()
  }
}

// 调用创建
var text = SprotsFactory('wordCup')

console.log(text.getMember())


/**
 * 故而上面非工厂模式可以改造一下下
 */
var PopFactory = function(name) {
  switch(name) {
    case 'alert':
      return new Basketball()
    case 'confirm':
      return new Football()
    case 'prompt':
      return new Tennis()
  }
}


/**
 * 3个类是相同的,可以抽象提取
 * 类似于寄生式继承，不过o没有继承任何类或者对象
 */

// 工厂模式
function createBook(name, time, type) {
  var o = new Object()
  o.name = name
  o.time = time
  o.type = type
  o.getName = function() {
    console.log(this.name)
  }
  return o
}

var book1 = createBook('js book', '2018', 'js')
var book2 = createBook('css book', '2018', 'css')

book1.getName()

/**
 * 抽象相同点。比如共有属性this.content, 原型共有方法 show
 */

function createPop(type, text) {
  var o = new Object()
  o.content = text
  o.show = function () { }

  if (type == 'alert') {
    console.log(text)
  }
  if (type == 'confirm') {
    console.log('confirm')
  }
  if (type == 'prompt') {
    console.log('prompt')
  }
  return o
}

var test = createPop('alert', 'username ~~~~')
```

### 工厂方法模式

> <a href="https://www.runoob.com/design-pattern/factory-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/06/19
 * @description: 工厂方法模式
 */

// 通过创建类，然后实例对象方式

var Java = function(content) {
 
  // 创建对象时，通过闭包，直接执行，将内容按需求插入
  (function(content) {
    var div = document.createElement('div')
    div.innerHTML = content
    div.style.color = 'green'
    document.getElementById('container').appendChild(div)
  })(content)
   // 将内容保存在content里面
  this.content = content
}

var PHP = function(content) {
  // 创建对象时，通过闭包，直接执行，将内容按需求插入
  (function(content) {
    var div = document.createElement('div')
    div.innerHTML = content
    div.style.color = 'yellow'
    div.style.background = 'red'
    document.getElementById('container').appendChild(div)
  })(content)
   // 将内容保存在content里面
  this.content = content
}

// 语言工厂～
function LanguageFactory(type, content) {
  switch(type) {
    case 'java':
      return new Java(content)
    case 'php':
      return new PHP(content)
  }
}

LanguageFactory('php', 'Java or PHP ?')


/**
 * 将工厂方法看作是一个实例对象的工厂类
 * 采用安全模式类
 * 将创建对象的基类放在工厂方法类的原型中
 */

// 安全模式类: 在构造函数开始的时候判读当前对象this指向是不是类，如果是通过new创建对象，不是的话那可能在全局志向window，就要重新返回新创建对象了。

var Demo = function() {
  if (!(this instanceof Demo)) {
    return new Demo()
  }
}
Demo.prototype = {
  show () {
    console.log('ok')
  }
}
var d = new Demo()
var dd = Demo()

console.log(d.show())
console.log(dd.show())


/**
 * 安全的工厂方法
 */

var Factory = function(type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content)
    return s
  } else {
    return new Factory(type, content)
  }
}

// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
  Java: function(content) {
    // ...
  },
  JavaScript: function(content) {
    // ...
  },
  UI: function(content) {
    this.content = content
    (function(content) {
      // body...
    })(content)
  },
  PHP: function(content) {
    // ...
  }
}

Factory('Java', 'java book')

```

### 抽象工厂模式

> <a href="https://www.runoob.com/design-pattern/abstract-factory-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/07/20
 * @description: 抽象工厂模式
 */

/**
 * 抽象类 (可以声明但是不能使用的类，可以手动抛出错误来模拟抽象类)
 * car类中的方法，一旦子类创建一个对象从父类继承没有重写的话，实例化对象就会调用父类，
 * 如果父类有抛出错误，那么可以对忘记重写子类是有帮助的。
 */

var Car = function() {
  Car.prototype = {
    getPrice: function() {
      return new Error('抽象方法不能调用')
    },
    getSpeed: function() {
      return new Error('抽象方法不能调用')
    }
  }
}


/**
 * 抽象工厂模式
 */

var VehicleFactory = function(subType, superType) {
  // 判断抽象工厂中是否有抽象类
  if (typeof VehicleFactory[superType] === 'function') {
    // 缓存类
    function F() {}
    // 继承父类属性和方法
    F.prototype = new VehicleFactory[superType]()
    // 将子类constructor指向子类
    subType.constructor = subType
    // 子类原型继承父类
    subType.prototype = new F()
  } else {
    // 不存在掏出错误
    throw new Error('未创建该抽象类')
  }
}

// 小车抽象类
VehicleFactory.Car = function() {
  this.type = 'car'
}
VehicleFactory.Car.prototype = {
  getPrice: function() {
      return new Error('抽象方法不能调用')
    },
    getSpeed: function() {
      return new Error('抽象方法不能调用')
    }
}

var Lamborghini = function(price, speed) {
  this.price = price
  this.speed = speed
}
// 对象工厂对Car抽象类的继承
VehicleFactory(Lamborghini, 'Car')
Lamborghini.prototype.getPrice = function() {
  return this.price
}
Lamborghini.prototype.getSpeed = function() {
  return this.speed
}

var test = new Lamborghini(1, 2)
console.log(test) //{ price: 1, speed: 2 }
```

### 建造者模式
> <a href="https://www.runoob.com/design-pattern/builder-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/07/20
 * @description: 建造者模式
 */

// 将一个复杂对象的构建层与其表示层相互分离

// 创建一个人类
var Human = function(param) {
  // 技能
  this.skill = param && param.skill || '保密'
  // 兴趣爱好
  this.hobby = param && param.hobby || '保密'
}

// 类人原型方法
Human.prototype = {
  getSkill () {
    return this.skill
  },
  getHobby () {
    return this.hobby
  }
}

// 实例化姓名类
var Named = function(name) {
  var that = this
  // 构造器 构造函数解析姓名的姓与名
  that.wholeName = name
  if (name.indexOf(' ') > -1) {
    that.FirstName = name.slice(0, name.indexOf(' '))
    that.secondName = name.slice(name.indexOf(' '))
  }
  // (function(name, that) {
  //   that.wholeName = name
  //   if (name.indexOf(' ') > -1) {
  //     that.FirstName = name.slice(0, name.indexOf(' '))
  //     that.secondName = name.slice(name.indexOf(' '))
  //   }
  // })(name, that)
}

// 实例化职位类
var Work = function(work) {
  var that = this
  // 构造器 构造函数中通过传入的职位特征来设置相关职位以及描述
  switch(work) {
    case 'code':
      that.work = '工程师'
      that.workDescript = '写代码...'
      break
    case 'UI':
    case 'UE':
      that.work = '设计师'
      that.workDescript = '画画图..'
    default :
      that.work = work
      that.workDescript = '没有相关～'
  }
}

// 更换期望的职位
Work.prototype.changeWork = function(work) {
  this.work = work
}

// 添加对职位的描述
Work.prototype.changeDescript = function(setence) {
  this.workDescript = setence
}


// 创建一名应聘者，如上面抽象的3个类
// 写一个建造者，通过对3个类组合调用，可以创建一个完整的应聘者


/**
 * 建造者
 * @name: 全名
 * @work: 期望职位
 */
var Person = function(name, work) {
  // 创建应聘者缓存对象
  var _person = new Human()
  // 创建应聘者姓名解析对象
  _person.name = new Named(name)
  // 创建应聘者期望姓名
  _person.work = new Work(work)

  return _person
}

var person = new Person('阿 明', 'code')

console.log(person)
```

### 原型模式
> <a href="https://www.runoob.com/design-pattern/prototype-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/07/23
 * @description:原型模式
 */

/**
 * 用原型实例之乡创建对象的类，
 * 使用于创建新的对象的类共享原型对象的属性以及方法
 */

 // 轮播图
var LoopImages = function(imgArr, container) {
  this.imgagesArr = imgArr  // 图片数组
  // 构造函数继承图片轮播类
  this.container = container  // 图片容器
  this.createImage = function() {}  // 创建轮播图图片
  this.changeImage = function() {}  // 切换下一张图片
}

// 上下滑动切换类
var SlideLoopImg = function(imgArr, container) {
  // 构造函数继承图片轮播类
  LoopImages.call(this, imgArr, container)
  // 重写继承的切换下一张图片方法
  this.changeImage = function() {
    console.log('SlideLoopImg changeImage function...')
  }
}

// 渐隐切换类
var FadeLoopImg = function(imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container)
  // 切换箭头私有变量
  this.arrow = arrow
  this.changeImage = function() {
    console.log('FadeLoopImg changeImage function')
  }
}

// 实例化一个渐隐切换图片类

var fadeImg = new FadeLoopImg([
  '1.png',
  '2.png',
  '3.png'
], 'side', ['left.png', 'righ.png'])

fadeImg.changeImage()

/**
 * 优化
 * 原型模式就是将可复用的，可共享的，耗时大的基类中提取然后放到原型中
 * 子类通过组合继承，寄生组合继承 继承方法和属性
 * 在子类中需要重写的方法进行重写
 * 结果就是子类创建的对象有子类的属性和方法也共享了基类的原型方法
 */

 var LoopImages = function(imgArr, container) {
  this.imgagesArr = imgArr  // 数组
  this.container = container  // 容器
}
LoopImages.prototype = {
  // 创建轮播图片
  createImage () {
    console.log('创建轮播图片')
  },
  // 切换下一张图片
  changeImage () {
    console.log('切换下一张图片')
  }
}

// 上下滑动切换类
var SlideLoopImg = function(imgArr, container) {
  // 构造函数继承图片轮播
  LoopImages.call(this, imgArr, container)
}
SlideLoopImg.prototype = new LoopImages()
// 重写继承的切换下一张图方法
SlideLoopImg.prototype.changeImage = function() {
  console.log('重写继承的切换下一张图方法')
}

// 渐隐切换类
var FadeLoopImg = function(imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container)
  // 切换箭头私有变量
  this.arrow = arrow
}
FadeLoopImg.prototype = new LoopImages()
FadeLoopImg.prototype.changeImage = function() {
  console.log('FadeLoopImg changeImage function')
}

// 实例化一个渐隐切换图片类

var fadeImg = new FadeLoopImg([
  '1.png',
  '2.png',
  '3.png'
], 'side', ['left.png', 'righ.png'])

fadeImg.changeImage()

/**
 * 原型继承，通过对对象属性或方法进行复制来实现创建
 */

 /**
 * 基于已经存在的模板对象克隆出新的对象的模式
 * 浅复制(引用类型属性共享)
 * 深复制(引用类型属性复制)
 */

 function prototypeExted() {
  var F = function() {},  // 缓存类，为实例化返回对象临时创建
      args = arguments,
      i =  0,
      len = args.length
  for (; i <len; i++) {
    // 遍历对象中的属性复制到缓存的原型中
    for (var j in args[i]) {
      F.prototype[j] = args[i][j]
    }
  }
  return new F()
}

var brid = prototypeExted({
  speed: 20,
  fly () {
    console.log('fly speed  ' + this.speed)
  },
  run (speed) {
    console.log('run speed ' + speed)
  }
})

brid.fly()
brid.run(666)

```

### 单例模式
> <a href="https://www.runoob.com/design-pattern/singleton-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/07/23
 * @description:单例模式
 */


 // 只允许实例化一次的对象


function getId(id) {
  return document.getElementById(id)
}

function setCss(id, key, value) {
  g(id).style[key] = value
}

function attr(id, key, value) {
  g(id)[key] = value
}

function html(id, value) {
  g(id).innerHTML = value
}

function on(id, type, fn) {
  g(id)['on' + type] = fn
}

/**
 * 命名空间的方法
 */
var angelasu = {
  g (id) {
    return document.getElementById(id)
  },
  css (id, key, value) {
    this.g(id).style[key] = value
  }
  // ...
}


/**
 * 静态变量
 */

var C = (function(){
  // 私有变量
  var conf = {
    MAX_NUM: 100,
    MIN_NUM: 1,
    COUNT: 1000
  }
  // 返回取值器对象
  return {
    // 取值器方法
    get (name) {
      return conf[name] ? conf[name] : null
    }
  }
})()

var count = C.get('MIN_NUM')
console.log(count)


/**
 * 延迟创建的单例模式
 */

var LazySingle = (function(){
  // 单例实例引用
  var _instance = null

  // 单例
  function Single() {
    /*定义私有属性和方法*/
    return {
      publicMethod () {},
      publicProperty: '1.0'
    }
  }
  // 获取单例对象接口
  return function() {
    if (!_instance) {
      _instance = Single()
    }
    return _instance
  }
})()

console.log(LazySingle().publicProperty)
```

## 结构性设计模式

### 外观模式
> <a href="https://www.runoob.com/design-pattern/facade-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/07/23
 * @description: 外观模式
 */

 /** 将一组复杂的子系统接口提供一个更高级的统一接口 */

document.onclick = function(e) {
  e.preventDefault()
  if (e.target !== document.getElementById('input')) {
    hidePageAlert()
  }
}
function hidePageAlert() {
  // 隐藏提示框
}

/**
 * 兼容方式。防止重新定义
 */

// 外观模式实现
function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    // 支持dom2级事件
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    // 不支持addEventListener支持attachEvent
    dom.attachEvent('on' + type, fn)
  } else {
    // 支持on + 事件名
    dom['on' + type] = fn
  }
}

/**
 * 解决 不支持e.target和e.preventDefault()
 */

// 获取事件对象
let getEvent = function(event) {
  // ie 返回 window.event  标准 event
  return event || window.event
}

// 获取元素
var getTarget = function(event) {
  var event = getEvent(event)
  // ie event.srcElement 标准 event.target
  return event.target || event.srcElement
}

// 阻止默认行为
var preventDefault = function(event) {
  var event = getEvent(event)
  if (event.preventDefault) {
    // 标准浏览器
    event.preventDefault()
  } else {
    // ie浏览器
    event.retrunValue = false
  }
}

document.onclick = function(e) {
  // 阻止默认行为
  preventDefault(e)
  // 获取目标
  if (getTarget(e) !== document.getElementById('input')) {
    hideInputSug()
  }
}

// 简约版例子
var A = {
  g (id) {
    return document.getElementById(id)
  },
  css (id, key, value) {
    document.getElementById.style[key] = value
  }
  // ...
}
```

### 适配器模式
> <a href="https://www.runoob.com/design-pattern/adapter-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2018/07/23
 * @description: 适配器模式
 */


/*
 * 适配异类框架 如:JQuery
 */
 var su = su || {}
// 通过 id 获取元素
su.g = function(id) {
  return document.getElementById(id)
}

// 绑定事件
su.on = function(id, type, fn) {
  // 字符串 id 处理 ，否则以元素处理
  var dom = typeof id === 'string' ? this.g(id) : id

  // dom2
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    // ie dom2
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}

su.on(window, 'load', function() {
  su.on('button', 'click', function() {
    // ...
  })
})


/**
 * 参数适配
 */

function doSomeThing(name, title, age, color, size, prize) {}

// 适配器
function doSomeThing(obj) {
  var _adapter = {
    name: 'angelasu',
    title: 'design patterns',
    age: '22',
    color: 'pink',
    size: 707,
    prize: 21
  }
  for (let i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i]
  }
  // do sth..
}


/**
 * 数据适配
 */

var arr = ['js', 'book', 'web', '3/11s']

// 适配成对象
var obj = {
  name: '',
  type: '',
  title: '',
  time: ''
}

function arrToObjAdapter(arr) {
  return {
    name: arr[0],
    type: arr[1],
    title: arr[2],
    time: arr[3],
  }
}

var adapterData = arrToObjAdapter(arr)

console.log(adapterData)


/**
 * 服务端数据适配
 */

function ajaxAdapter(data) {
  return [data['key1'], data['key2'], data['key3']]
}

$.ajax({
  url: 'url',
  success: function(data) {
    if (data) {
      doSomeThing(ajaxAdapter(data))
    }
  }
})
```

### 装饰器模式
> <a href="https://www.runoob.com/design-pattern/decorator-pattern.html" terget="blank">说明介绍点这里，许向一个现有的对象添加新的功能，同时又不改变其结构。</a>

```js
/*
 * @author: 张复明
 * @date: 2020/08/24
 * @description: 装饰器模式
 */

/** 不改变原对象的基础上，通过对其进行包装托章 */

// 输入框提示
var telInput = document.getElementById('tel_input')
// 输入格式提示文案
var telWarnText = document.getElementById('tel_warn_text')
// 点击输入框显示输入框输入格式提示文案
input.onclick = function() {
  telWarnText.style.display = 'inline-block'
}


/**
 * 装饰已有的功能对象
 */

// 装饰者
var decorator = function(input , fn) {
  // 获取事件源
  var input = document.getElementById('input')
  // 若事件源已经绑定事件
  if (typeof input.onclick === 'function') {
    // 缓存事件源原有回调
    var olcClickFn = input.onclick
    // 为事件源定义新的事件
    input.onclick = function() {
      // 事件源原有的回调函数
      olcClickFn()
      // 执行时间源新增回调函数
      fn()
    }
  } else {
    // 事件源未绑定事件，直接为事件源添加新增回调函数
    input.onclick = fn
  }
  // 做其他事情
}

// 使用
decorator('tel_input', function() {
  document.getElementById('tel_demo_text').style.display = 'none'
})
```

### 桥接模式
> <a href="https://www.runoob.com/design-pattern/bridge-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/08/24
 * @description: 桥接模式
 */


// 多维度变化的同时，不增加负责度并且降低耦合达到解耦

var spans = document.getElementsByTagName('span')
// 绑定特效
spans[0].onmouseover = function() {
  this.style.color = 'red'
  this.style.background = '#ddd'
}
spans[0].onmouseout = function() {
  this.style.color = '#333'
  this.style.background = '#fff'
}
spans[0].onmouseover = function() {
  this.getElementsByTagName('strong')[0].style.color = 'red'
  this.getElementsByTagName('strong')[0].style.background = '#ddd'
}
spans[1].onmouseover = function() {
  this.getElementsByTagName('strong')[0].style.color = '#333'
  this.getElementsByTagName('strong')[0].style.background = '#fff'
}
// ...


/**
 * 抽象  提取共同点
 */

function changeColor(dom, color, bg) {
  dom.style.color = color
  dom.style.background = bg
}

var spans = document.getElementsByTagName('span')

span[0].onmouseover = function() {
  changeColor(this, 'red', '#ddd')
}

span[0].onmouseout = function() {
  changeColor(this, '#333', '#fff')
}


/**
 * 多元化对象
 */

function Speed(x, y) {
  this.x = x
  this.y = y
}

Speed.prototype.run = function() {
  console.log('Go Go Go~~~')
}

// 着色单元
function Color(color) {
  this.color = color
}
Color.prototype.draw = function() {
  console.log('draw color')
}
// 变形单元
function Shape(shape) {
  this.shape = shape
}
Shape.prototype.change = function() {
  console.log('change shape')
}
// 说话单元
function Speek(word) {
  this.word = word
}
Speek.prototype.say = function() {
  console.log('write font')
}


// 创建一些类 做相应的事情
function People(x, y, f) {
  this.speed = new Speed(x, y)
  this.font = new Speek(f)
}
People.prototype.init = function() {
  this.speed.run()
  this.font.say()
}

var test = new People(10, 12, 30)
test.init()
```

### 组合模式
> <a href="https://www.runoob.com/design-pattern/composite-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming 
 * @date: 2020/08/24
 * @description: 组合模式
 */

// 将对象组合成树形结构以标示"部门整体"的层次结构

var News = function() {
  // 子组件容器
  this.children = []
  // 当前组件元素
  this.element = null
}

News.prototype = {
  init () {
    throw new Error('请重写方法')
  },
  add () {
    throw new Error('请重写方法')
  },
  getElement () {
    throw new Error('请重写方法')
  },
}


/**
 * 容器类
 * 应用寄生组合式继承
 */

// 容器类构造函数
var Container = function(id, parent) {
  // 构造函数继承父类
  News.call(this)
  // 模块id
  this.id = id
  // 模块的父容器
  this.parent = parent
  // 构建方法
  this.init()
}

// 寄生式继承父类原型方法
inheritPrototype(Container, News)
// 构建方法
Container.prototype.init = function() {
  this.element = document.createElement('ul')
  this.element.id = this.id
  this.element.calssName = 'new-container'
}
// 添加子元素方法
Container.prototype.add = function(child) {
  // 在子元素容器插入子元素
  this.children.push(child)
  // 插入当前组件元素树中
  this.element.appendChild(child.getElement())
  return this
}
// 获取当前元素的方法
Container.prototype.getElement = function() {
  return this.element
}


/**
 * 创建一个新闻类
 */

var ImageNews = function(url, href, classname) {
  News.call(this)
  this.url = url || ''
  this.href = href || '#'
  this.classname = classname || 'normal'
  this.init()
}
inheritPrototype(ImageNews, News)
ImageNews.prototype.init = function() {
  this.element = document.createElement('a')
  var img = new Image()
  img.src = this.url
  this.element.appendChild(img)
  this.element.className = 'image-news' + this.classname
  this.element.href = this.href
}
ImageNews.prototype.add = function() {}
ImageNews.prototype.getElement = function() {
  return this.element
}


var test = new Container('news', document.body)
test.add(new ImageNews('normal').add().add())
```

### 享元模式
> <a href="https://www.runoob.com/design-pattern/flyweight-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/09/04
 * @description: 享元模式
 */
// 运用共享技术有效地支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销

var dom = null,  // 缓存创建的元素
    paper = 0,  // 当前页数
    num = 5,  // 每页几条
    i = 0,  // 创建元素时保存的变量
    len = article.length  // 数据长度

for (; i < len; i++) {
  dom = document.creatElement('div')
  dom.innerHTML = atricle[i]
  if ( i >= num) {
    dom.style.display = 'none'  // 默认显示第一页，超出隐藏
  }
  document.getElementById('container').appendChild(dom)
}


// 下一页事件
document.getElementById('next_page').onclick = function() {
  var div = document.getElementById('container').getElementsByTagName('div'),

  // 获取所有元素
      j = k = n = 0 // j,k循环变量 n 当前页显示的第一个新闻序号
      n = ++paper % Math.ceil(len / num) * num  // 获取当前页显示的第一个序号
      for (; j < len; j++) {
        div[j].style.display = 'none'
      }
      for (; k < 5; k++) {
        if (div[n + k]) {
          div[n + k].style.display = 'block'
        }
      }
}


/**
 * 享元对象
 */
var Flyweight = function() {
  // 已创建的元素
  var created = []
  // 创建一个包装容器
  function create() {
    var dom = document.creatElement('div')
    document.getElementById('container').appendChild(dom)
    // 缓存新创建元素
    created.push(dom)
    return dom
  }
  return {
    getDiv () {
      if (created.length < 5) {
        return create()
      } else {
        // 获取第一个元素插到最后面
        var div = created.shift()
        created.push(div)
        return div
      }
    }
  }
}



/**
 * 享元动作
 * 共同的动作，所以有一个通用的享元类
 */

var Flyweight = {
  moveX: function (x) {
    this.x = x
  },
  moveY: function (y) {
    this.y = y
  }
}

var Player = function(x, y, c) {
  this.x = x
  this.y = y
  this.color = c
}
Player.prototype = Flyweight
Player.prototype.changeColor = function(c) {
  this.color = c
}

// 继承移动
var man = function(x, y, r) {
  this.x = x
  this.y = y
  this.r = r
}
man.prototype = Flyweight
man.prototype.changeR = function(r) {
  this.r = r
}

var test = new Player(5, 6, '#000')

console.log(test)

```

## 行为设计模式

### 模板方法模式

```js
/*
 * @author: aming
 * @date: 2020/09/04
 * @description: 模版方法模式
 */

/**
 * 将多个模型抽象化归一
 * 比如提示框
 */

var Alert = function(data) {
  if (!data) return
    this.panel = document.createElement('div')
}

Alert.prototype = {
  init: function() {
    this.panel.appendChild(this.closeBtn)
    document.body.appendChild(this.panel)
    // 绑定事件
    this.bindEvent()
    this.show()
  },
  bindEvent () {
    var _this = this
    this.closeBtn.onclick = function() {
      _this.fail()
      _this.hide()
    }
    this.confirmBtn.onclick = function() {
      _this.success()
      _this.hide()
    }
  }，
  hide: function() {
    this.panel.style.display = 'none'
  },
  show: function() {
    this.panel.style.display = 'block'
  }
}

var RightAlert = function(data) {
  Alert.call(this, data)
  this.confirmBtn.className = this.confirmBtn.className + ' right'
}
RightAlert.prototype = new Alert()

// 标题提示框
var TitleAlert = function(data) {
  // 继承基本提示框构造函数
  Alert.call(this, data)
  // 设置标题内容
  this.title = data.title
  // 设置标题组件
  this.titleNode = document.createElement('h3')
  // 标题内容
  this.titleNode.innerHTML = this.title
}
// 继承基本提示框
TitleAlert.prototype = new Alert()
// 基本提示框创建方法拓展
RightAlert.prototype.init = function() {
  this.panel.insertBefore(this.titleNode, this.panel.firstChild)
  // 继承基本的init
  Alert.prototype.init.call(this)
}

// 带有取消按钮的框
var CancleAlert = function(data) {
  // 继承标题提示框的构造函数
  TitleAlert.call(this, data)
  this.cancel = data.cancel
  this.cancelBtn = document.createElement('span')
  this.cancelBtn.className = 'cancel'
  this.cancelBtn.innerHTML = this.cancel || '取消'
}

// 继承标题提示框原型方法
CancleAlert.prototype = new Alert()
CancleAlert.prototype.init = function() {
  // 继承标题提示框创建方法
  TitleAlert.prototype.init.call(this)
  this.panel.appendChild(this.cancelBtn)
}
CancleAlert.prototype.bindEvent = function() {
  var _this = this
  // 标题提示框绑定方法继承
  TitleAlert.prototype.bindEvent.call(_this)

  this.cancelBtn.onclick = function() {
    _this.fail()
    _this.hide()
  }
}

// 实例
new CancleAlert({
  title: 'title',
  content: 'content',
  success: function() {},
  fail: function() {}
}).init()
```

### 观察者模式
> <a href="https://www.runoob.com/design-pattern/observer-pattern.html" terget="blank">说明介绍点这里</a>

```js
/*
 * @author: aming
 * @date: 2020/09/04
 * @description: 观察者模式
 */


// 创建一个观察者

var Observer = (function() {
  var _message = {}
  return {
    // type: 消息类型 fn: 相应的处理动作
    regist(type, fn) {
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn]
      } else {
        _message[type].push(fn)
      }
    },
    // type: 消息类型 args: 动作执行时需要传递的参数
    fire(type, args) {
      if (!_message[type])
        return
      var events = {
        type: type,
        args: args || []
      },
      i = 0,
      len = _message[type].length
      for (; i < len; i++) {
        // 依次执行注册的消息对应的动作序列
        _message[type][i].call(this, events)
      }
    },
    // type: 消息类型 fn: 执行的某一动作
    remove(type, fn) {
      if (_message[type] instanceof Array) {
        var i = _message[type].length - 1
        for (; i >= 0; i) {
          _message[type[i] === fn && _message[type].splice(i, 1)]
        }
      }
    }
  }
})()


Observer.regist('test', function(e) {
  console.log(e.type, e.args.msg, '==============e')
})

Observer.fire('test', {msg: '测试～～～'})



/**
 * 对象间解耦
 */

// 订阅者
var Student = function(result) {
  var _this = this
  _this.result = result
  _this.say = function() {
    console.log(_this.result)
  }
}

Student.prototype.answer = function(question) {
  Observer.regist(question, this.say)
}

Student.prototype.sleep = function(question) {
  console.log(this.result + ' ' + question + ' 已被注销')
  Observer.remove(question, this.say)
}

// 观察者
var Teacher = function() {}

Teacher.prototype.ask = function(question) {
  console.log('问题是 ' + question)
  Observer.fire(question)
}


var student1 = new Student('student1 回答'),
    student2 = new Student('student2 回答'),
    student3 = new Student('student3 回答')

student1.answer('question1')
student2.answer('question2')
student3.answer('question3')
student3.sleep('go sleep')

var teacher = new Teacher()

teacher.ask('teacher ... question1')
teacher.ask('teacher ... question2')
```

### 状态模式

### 策略模式

### 职责链模式

### 命令模式

### 访问者模式

### 中介者模式

### 备忘录模式

### 迭代器模式

### 解释器模式

## 技巧型设计模式

### 链模式

### 委托模式

### 数据访问对象模式

### 节流模式

### 简单模板模式

### 惰性模式

### 参与者模式

### 等待者模式