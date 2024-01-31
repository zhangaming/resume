---
title: 朋友们的分享
tag:
  - 分享
categories:
  - 分享
keywords: '分享'
addrlink: dda8c81b
date: 2021-02-02 02:02:07
description:
top_img:
cover: 'https://img.zhangaming.com/mayday/dna.jpg'
---
# Vercel

https://vercel.com/new/templates

# 蚂蚁金服

https://pro.antdv.com/ //中后台框架

https://www.antdv.com/docs/ ui

# vue 常用指令

传送门：https://juejin.cn/post/6906028995133833230

https://mp.weixin.qq.com/s/UgoWuC5KAcaojq3bqHRDhA

https://www.cnblogs.com/tuspring/p/12169978.html

# Vue JSON Schema Form

https://github.com/lljj-x/vue-json-schema-form

# git 表情

https://gitmoji.carloscuesta.me/

# 网易云api
https://neteasecloudmusicapi.vercel.app/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
# 一个基于 Electron + Vue 开发的音乐软件

<a href="https://github.com/lyswhut/lx-music-desktop"  target="_blank">洛雪音乐助手桌面版</a>

# Jsonschema

https://ajv.js.org/

http://json-schema.org/

# 工具库

https://www.lodashjs.com/

# 开启 Gzip 压缩

需要后端在 nginx 添加 http_gzip_static_module 模块并配置 gzip 来支持

```js
//vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    // 生产环境，开启gzip压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8,
          deleteOriginalAssets: true, // 删除源文件
        })
      )
    }
  },
}
```

# 通用正则

```js
/**
 * @description 通用正则
 */
export const regexp = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
  isZipCode: /^[0-9]{6}$/,
  phone: /^((0\d{2,3}-\d{7,8})|(0\d{2,3}-\d{7,8}#\d{3,7})|(\d{7,8})|(\d{7,8}#\d{3,7})|((13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}))$/,
  idCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
  isAccount: /^\w+$/, // 字母下划线数字
  integer: /^([1-9]\d*|[0]{1,1})$/, // 0开头的正整数
  isUppercaseLetter: /^[A-Z]+$/, // 大写字母
  isUppercaseLetterAndNumber: /^[A-Z][A-Z0-9]*$/, // 大写字母开头，包含大写字母与数字
  isUppercaseLetterAndNumberStr: /^[A-Z][A-Z0-9\-/]*$/, // 大写字母开头，包含大写字母与数字
}
```

## 加密手机号

```js
var shouJi = '13356781234'
var shouJi_jiaMi = shouJi.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1****$3')
console.log('加密后的手机号为：' + shouJi_jiaMi)

var str1 = '13991367972'
var reg = /^(\d{3})\d*(\d{4})$/
var str2 = str1.replace(reg, '$1****$2')

var showPhone = phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
```

# 增加首屏加载速度，移除 prefetch 和 preload

```js
//vue.config.js

module.exports = {
  chainWebpack: (config) => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch')
    / 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');
  },
};

```

# 开发规范

## 命名规则

### Component

所有的 Component 文件都是以大写开头 (除了 index.vue)
例子：
@/components/BackToTop/index.vue
@/components/Charts/Line.vue
@/views/example/components/Button.vue

### JS 文件

所有的.js 文件都遵循横线连接 (kebab-case)
例子：
@/utils/open-window.js
@/views/svg-icons/require-icons.js
@/components/MarkdownEditor/default-options.js

### Views

在 views 文件下，所有的.vue 文件都遵循横线连接 (kebab-case),为了与 Component 文件进行区分，并且没有大小写敏感问题
例子：
@/views/index.vue
@/views/cashier/cashier-dialog.vue
