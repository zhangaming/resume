---
title: 修改npm源码后上传自己的npm再下载修改后的包
tag:
 - vue
 - npm
categories:
 - npm
keywords: "vue,npm, xlsx"
addrlink: dda8c81b
date: 2020-04-20 16:14:07
description:
top_img:
cover: "https://img.zhangaming.com/img/vue.png"
---

## 起因

需求是要求前端导出execl 并且导出的execl里 能添加样式  颜色等
导出的话默认xlsx就好了 但是颜色这个 我最后只能去选择xlsx-style

## 遇到的问题

在厦门npm i xlsx-style 完之后  使用时 报错
\node_modules\xlsx-style\dist\cpexcel.js 807行 的 var cpt = require(’./cpt’ + ‘able’); 改成 var cpt = cptable;
这是直接改源码 

但是呢 考虑到我们是自动部署 不可能上线了 还去改包的源码
所以采取的是上传自己的包

## 处理方式

1.下载要修改的包并进行修改, 将package.json文件下的 作者版本和名字改掉

2.在npm注册验证邮箱通过 
这里有个小坑 我的验证邮箱都跑去垃圾箱了 害我等半天

3.npm publish上去

最后成功项目里面去引用就行了

4.npm uninstall原来的包 然后重新下载

aming-xlsx-style


## 额外收获

跑去问朋友朋友理解错了我的意思
他理解成我要修改原方法

```js
import XLSX from 'xlsx-style'

XLSX.prototype.test =(()=>{
  //原来的伪代码
  console.log('修改的代码')
  //原来的伪代码
})
```

 

 ## 已用修改的包

 aming-xlsx-style 导出的表格能添加样式 颜色


##  amingditor 富文本编辑器 修改位置

### 效果实现
要实现此种效果，需要为图片包裹一层a链接，即可实现点击图片跳转网页

实现效果如下，点击图片后点击图片栏会在弹出框中可以插入超链接
<img src="https://www.passerma.com/api/file/blogimg?imgurl=61-1591234348389.png" style="max-width:100%;">
只需要修改源码的两块地方即可

### 第一步添加原型方法
需要找到源码里修改dom的原型DomElement.prototype，未修改前对应位置140行

在原型中添加下面这个方法，用于实现a链接包裹图片

```js
appendGoLink: function append(goLink) {
      return this.forEach(function (elem) {
          var ele = document.createElement('a')
          if(elem.parentNode.localName == 'p'){
            elem.parentNode.replaceChild(ele, elem)
          }else{
            let achild = elem.parentNode.parentNode;
            achild.replaceChild(ele,elem.parentNode)
          }
          ele.appendChild(elem)
          if(goLink){
            ele.href = goLink
            ele.setAttribute('target', '_blank')
          }else{
            ele.removeAttribute('href')
            ele.removeAttribute('target')
          }
      })
    },

```

### 第二布 修改菜单栏
找到源码里的图片操作原型Image.prototype，未修改前对应位置2653行  
_createEditPanel:function _createEditPanel()
第一步添加两个随机id，用于获取输入框和按钮
然后去判断原来选择的图片外是否有链接  在创建时判断是否赋值

```js
var goLink = getRandom('goLink')
var goLinkBtnId = getRandom('goLinkBtnId')

var $img = editor._selectedImg;
        var $el = $img[0];
        var $value = ''
        if($el.parentNode.localName == 'p'){
          $value = ''
        }else{
          let achild = $el.parentNode;
          console.log("achild",achild)
          if(achild.attributes[0]&&achild.attributes[0].value){
            $value = achild.attributes[0].value
          }else{
            $value = ''
          }
        }
```

第二步修改原来的dom结构，添加一个输入框以及按钮
只需将tabsConfig里的tql的值替换为以下：

```js
'<div>\n                    <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">\n                        <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">\u6700\u5927\u5BBD\u5EA6\uFF1A</span>\n                        <button id="' + width30 + '" class="left">30%</button>\n                        <button id="' + width50 + '" class="left">50%</button>\n                        <button id="' + width100 + '" class="left">100%</button>\n                    </div>\n                    <div>\n                     <input id="' + goLink +'" type="text" class="block" value="'+$value+'" placeholder="\u8d85\u94fe\u63a5\u5730\u5740" /></td>\n                        <div class="w-e-button-container">\n                            <button id="'+ goLinkBtnId +'" class="right">\u63D2\u5165</button>\n                          </div>\n                    </div>\n                     <div class="w-e-button-container">\n                        <button id="' + delBtn + '" class="gray left">\u5220\u9664\u56FE\u7247</button>\n                    </div>\n                </div>'
```

请自行将其按照原格式码成一行

第三步在事件数组中新增一个点击事件

```js
{
                selector: '#' + goLinkBtnId,
                type: 'click',
                fn: function fn() {
                    var $img = editor._selectedImg
                    console.log('$img',$img)
                    var $linkUrl = $('#' + goLink)
                    var url = $linkUrl.val().trim()
                    $img.appendGoLink(url)
                    self._active = false;
                    self.$elem.removeClass('w-e-active');
                    // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                    return true
                }
            },

```

至此就可以实现给图片添加超链接了

### 最后发包npm publish

```js
"name": "",
  "title": "",
  "version": "",
  "description": "",
  "homepage": "",
  "author": {
    "name": "",
    "url": ""
  },
  "keywords": [
    "",
    "web 富文本编辑器"
  ],
  "main": "release/wangEditor.js",
  "repositories": [
    {
      "type": "",
      "url": ""
    }
  ],

```

入口很关键  main