---
title: 一个简单方法的复制内容
tag:
 - html
categories:
 - html
keywords: "html"
addrlink: dda8c81b
date: 2020-07-03 10:42:07
description:
top_img:
cover: "https://img.zhangaming.com/mayday/dna.jpg"
---

### 复制黏贴

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title> 页面名称 </title>
</head>
<body>
<p>点击复制后在右边textarea CTRL+V看一下</p>
<input type="button" id="btn" value="复制"/>
<textarea rows="4"></textarea>
<script type="text/javascript">
function copyText(text) {
    var textarea = document.createElement("textarea");
    var currentFocus = document.activeElement;
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.focus();
    if (textarea.setSelectionRange)
        textarea.setSelectionRange(0, textarea.value.length);
    else
        textarea.select();
    try {
        var flag = document.execCommand("copy");
    } catch(eo){
        var flag = false;
    }
    document.body.removeChild(textarea);
    currentFocus.focus();
    return flag;
}

document.getElementById('btn').onclick = function(){
    var a='这里是需要复制的内容';
    var flag = copyText(a);//这个必须在DOM对象的事件线程中执行
    alert(flag ? "复制成功！" : "复制失败！");
};

```
</script>
</body>
</html>