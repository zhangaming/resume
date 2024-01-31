---
title: 使用cubeui写出饿了么移动端案例
tag:
 - vue
 - cubeui
 - element
categories:
 - vue
 - cubeui
keywords: "cubeui,vue, 饿了么, element"
addrlink: dda8c81b
date: 2020-04-14 18:14:07
description:
top_img:
cover: "https://img.zhangaming.com/img/vue.png"
---

## 使用cubeui+mock+better-scoller+stylus
{% hideBlock 项目链接 %}
<a href="https://cube.zhangaming.com/"  target="_blank">cubeui</a>
{% endhideBlock %}


## 关于模拟数据的方法
模拟接口有很多种 
我一开始 使用的是在 vue-config里去配置devServer before(app)

```js
devServer: {
    before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
```
后面考虑线上 改用mock

```js

// 将所有的mock文件引入
require('@/mock/goods')
require('@/mock/ratings')
require('@/mock/seller')
// 在这里可以做一些通用的配置
const Mock = require('mockjs')
//设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
  timeout: 0 - 300
})


```
这里是三个文件中的其中一个文件的接口模拟
```js

const Mock = require('mockjs')
const appData = require('@/assets/data.json')
const seller = appData.seller
Mock.mock('/api/seller','get',{
    errno: 0,
    data: seller

})


```
模拟接口去请求  然后只要正常调用就行了 请求赋值
```js
  import { getGoods } from 'api'
  ···
  getGoods({
    id: this.seller.id
  }).then((goods) => {
    this.goods = goods
  })          


```


## 购物车小球 

小球事先准备了十个
```js

 const BALL_LEN = 10
  const innerClsHook = 'inner-hook'

  function createBalls() {
    let balls = []
    for (let i = 0; i < BALL_LEN; i++) {
      balls.push({show: false})
    }
    return balls
  }

```

关于购物车小球 效果 之前css有用到stickyball 这里主要是一个过渡效果

```html
<div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

```

然后是 三种状态   这里首先建一个空数组存放小球

这个地方涉及到cubeui的cearetapi先看api等会讲这块
当然下面的效果只是给小球增加过渡效果
分别是点击后 beforeDrop计算小球起始位置
drpping 小球的位移终点 

最后拿到数组第一个元素的值并删除并且让元素小球消失隐藏

```js
beforeDrop(el) {
        const ball = this.dropBalls[this.dropBalls.length - 1]
        const rect = ball.el.getBoundingClientRect()
        const x = rect.left - 32
        const y = -(window.innerHeight - rect.top - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      },
      dropping(el, done) {
        this._reflow = document.body.offsetHeight
        el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
        el.addEventListener('transitionend', done)
      },
      afterDrop(el) {
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },

```

##  createAPI  

createAPI 是cube-ui 里的一个方法 主要是生成组件

### 首先是注册

```js

import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
import ShopCartStikcy from 'components/shop-cart-sticky/shop-cart-sticky'
import Food from 'components/food/food'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartStikcy)
createAPI(Vue, Food)

```

### 先查看组件 这里看购物车组件怎么样

```js

  import CartControl from 'components/cart-control/cart-control'
  import popupMixin from 'common/mixins/popup'
  const EVENT_SHOW = 'show'
  const EVENT_ADD = 'add'
  const EVENT_LEAVE = 'leave'

  export default {
    name: 'shop-cart-list',
    mixins: [popupMixin],
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.listContent.refresh()
        })
      })
    },
    methods: {
      onAdd(target) {
        this.$emit(EVENT_ADD, target)
      },
      afterLeave() {
        this.$emit(EVENT_LEAVE)
      },
      maskClick() {
        this.hide()
      },
      empty() {
        this.dialogComp = this.$createDialog({
          type: 'confirm',
          content: '清空购物车？',
          $events: {
            confirm: () => {
              this.selectFoods.forEach((food) => {
                food.count = 0
              })
              this.hide()
            }
          }
        })
        this.dialogComp.show()
      }
    },
    components: {
      CartControl
    }
  }

```

### 调用创建组件

```js
_showShopCartList() {
 this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
    $props: {
      selectFoods: 'selectFoods'
    },
    $events: {
      leave: () => {
        this._hideShopCartSticky()
      },
      hide: () => {
        this.listFold = true
      },
      add: (el) => {
        this.shopCartStickyComp.drop(el)
      }
    }
  })
  this.shopCartListComp.show()
},              
```

可以看出 他这里是跟普通组件一样  传参数 和绑定触发事件 show 和 hide是里面组件的显示隐藏


## better-scoll的使用 多看文档吧

这个作者很喜欢用better-scroll

地址在这 写的好的话 体验跟原生一样

<a href="https://ustbhuangyi.github.io/better-scroll/#/zh/"  target="_blank">better-scroll文档</a>
<a href="https://ustbhuangyi.github.io/better-scroll/#/examples/zh/" target="_blank">better-scroll示例</a>

