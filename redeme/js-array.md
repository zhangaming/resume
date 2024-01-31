---
title: 关于数组的整理
tag:
 - javascript
 - 数组
 - array
categories:
 - javascript
 - 数组
keywords: "数组,array,javascript"
addrlink: dda8c81b
date: 2020-10-28 11:32:07
description:
top_img:
cover: "https://img.zhangaming.com/mayday/dna.jpg"
---

## 操作数组的增删改

### push、unshift、pop、shift
```js
var arr =['b']
arr.push('c') //往数组后存入  [ 'b', 'c' ]
arr.unshift('a') //往数组前存入  [ 'a', 'b', 'c' ]
arr.pop(); //删掉数组最后面一个 [ 'a', 'b' ]
arr.shift();//删掉数组最前面一个 [ 'b' ]
```

### slice与 splice 的差别
slice ：不会改变原数组

```js
var arr = ['a','b','c']
let newarr0 = arr.slice(0,1); // newarr0:[ 'a' ] 
let newarr1 = arr.slice(0,2); // newarr1:[ 'a', 'b' ]  
let newarr2 = arr.slice(1,2); // newarr2:[ 'a' ] [ 'b' ] 
console.log(arr) //[ 'a', 'b', 'c' ]
```

splice： 会改变原数组
```js
var brr = ['a','b','c']
let newbrr0 = brr.splice(0,2,'b') // newbrr0: [ 'a', 'b' ] , brr: [ 'b', 'c' ]

var crr = ['a','b','c']
let newcrr0 = crr.splice(0,1,'b') // newcrr0: [ 'a' ] , crr: [ 'b', 'b', 'c' ]

// 常用于删除

var drr = ['a','b','c']
drr.splice(1,1)
console.log(drr)// ['a','c']
```

## 数组的遍历

 ### forEach
 forEach 是Array中基本的一个遍历方法。

```js
const arr = [1,2,3]
arr.forEach((item, index, array) => {
    console.log(item, index, array)
})

// output
1 0 [1,2,3]
2 1 [1,2,3]
3 2 [1,2,3]
```

forEach 方法中到callback有三个参数:
* 数组当前项
* 对应数组到索引
* 数组本身

forEach 接受一个必须到回调函数参数，还可以接受一个可选到上下文参数(改变回调函数里面到this指向)。如果没传入第二参数，则指向window，严格模式为undefined
比如:
```js
const arr = [1,2,3]
const obj = {name: angela}

arr.forEach((item, index, array) => {
    console.log(item, index, array, this)
}, obj)

//output
1 0 [1, 2, 3] {name: 'angela'}
2 1 [1, 2, 3] {name: 'angela'}
3 2 [1, 2, 3] {name: 'angela'}
```

 ### map
 map方法是将原来对数组按照一定对规则映射出一个新的数组再返回。

```js
// callback参数
[].map((value, index, array) => {
    // ...
})
```

数值求平方例子:

```js
const data = [1,2,3]
const array = data.map(item => {
    return item * item
})
console.log(array)

//output
  [1, 4, 9]
  ```

  如果callback没有return 则会输出undefiend

  ```js
  const data = [1,2,3]
  const array = data.map(item => {
      item * item
  })
  console.log(array)

  //output
  [undefiend, undefiend, undefiend]
```

### for of 和 for in
  >可以查看数组实例的 entries()，keys() 和 values()

  for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象.与forEach()不同的是，它可以正确响应break、continue和return语句
  for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用for-in循环（这也是它的本职工作）或内建的Object.keys()方法：
  ```js
  for (var key of Object.keys(someObject)) {
    console.log(key + ": " + someObject[key]);
  }
  ```

  遍历map对象时适合用解构,例如：
  ```js
  for (var [key, value] of phoneBookMap) {
    console.log(key + "'s phone number is: " + value);
  }
  ```

  当你为对象添加myObject.toString()方法后，就可以将对象转化为字符串，同样地，当你向任意对象添加myObjectSymbol.iterator方法，就可以遍历这个对象了。
  举个例子，假设你正在使用jQuery，尽管你非常钟情于里面的.each()方法，但你还是想让jQuery对象也支持for-of循环，你可以这样做：
  ```js
  jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  ```
  所有拥有Symbol.iterator的对象被称为可迭代的。在接下来的文章中你会发现，可迭代对象的概念几乎贯穿于整门语言之中，不仅是for-of循环，还有Map和Set构造函数、解构赋值，以及新的展开操作符。

  for...of的步骤:
  for-of循环首先调用集合的Symbol.iterator方法，紧接着返回一个新的迭代器对象。迭代器对象可以是任意具有.next()方法的对象；for-of循环将重复调用这个方法，每次循环调用一次。举个例子，这段代码是我能想出来的最简单的迭代器：
  ```js
  var zeroesForeverIterator = {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function () {
      return {done: false, value: 0};
    }
  };
  ```

## 数组的过滤 和 查找

### filter和includes结合 （过滤数组）
```js

const arr1 = [{ id: 1, name: '老大' }, { id: 2, name: '老二' }];
const arr2 = [{ id: 1, name: '老大' }, { id: 3, name: '老三' }];
 
// 获取到arr1的所有id集合
let arr1Ids = arr1.map(item => item.id);
 
// 过滤arr2中不包含arr1相同的id数组。
const result = arr2.filter(item => !arr1Ids.includes(item.id));
console.log(result)
// [ { id: 3, name: '老三' } ]
```

### filter和some结合 （过滤数组）
```js

let arr1=[{id:1,name:'老大'},{id:2,name:'老二'}] 
let arr2=[{id:1,name:'老大'},{id:3,name:'老三'},{id:4,name:'老四'},{id:5,name:'老五'},] 
 
let add=arr2.filter(item=>!arr1.some(ele=>ele.id===item.id)) 
console.log(add)
// [ { id: 3, name: '老三' },
//   { id: 4, name: '老四' },
//   { id: 5, name: '老五' } ]
```

### filter

filter 相当于过滤后返回新的数组。(true则通过，false不通过)

```js
const arr = [1, 2, 3]

let arr1 = arr.filter((item, index, array) => {
    return item
})

//output
[1, 2, 3]


let arr2 = arr.filter((item, index, array) => {
    return item>=2
})

//output
[2, 3]
```

### includes

```js
let arr1Ids = [1,2,3]
console.log(arr1Ids.includes(1))
//true
```

### some
some方法只要数组中的某个值，符合就true，反之false。

```js
function big(item, index, array) {
    return item >= 4
}

const count = [1, 2, 3]
const count2 = [1, 2, 3, 4]
count.some(big)  // output false
count2.some(big)  // output true

console.log(count.some(ele=>ele ==1))//true
console.log(count.some(ele=>ele ==5))//false
```

### every
every和some类似,但是是所有的值都符合才true，否则为false


```js
function big(item, index, array) {
    return item >= 3
}

const count = [2, 3, 4].every(big)  // output false
const count2 = [3, 4, 5].every(big) // output true
```

### indexOf
indexOf说白了就是找那个元素在不在数组里面，第几个是不是它

```js
array.indexOf(searchElement, fromIndex)
```

返回整数索引值，如果没有(严格匹配)，返回-1, fromIndex参数可选，如果没有或者格式不对,使用默认值0

例子:

```js
const data = [2, 5, 7, 3, 5]

console.log(data.indexOf(1))
// -1

console.log(data.indexOf(2))
// 0

console.log(data.indexOf(5))
// 1

console.log(data.indexOf(5, 2))
// 4
```

### lastIndexOf
lastIndexOf 方法与 indexOf 方法类似。只是从末尾开始查找，且fromIndex默认值为-1

### find / findIndex

find 方法把所有的数组成员执行回调函数，直到找到一个为true的时候返回该成员。否则返回undefiend

```js
const value = [1, 5, 10 ,15].find((el, index, array) => {
    return el > 9
})

console.log(value) // 10

const value2 = [1, 5, 10 ,15].find((el, index, array) => {
    return el > 20
})

console.log(value2) // undefiend
```


findIndex 与find是类似的，只不过它返回的是索引，如果都不符合，那么返回-1

```js
const value = [1, 5, 10 ,15].findIndex((el, index, array) => {
    return el > 9
})

console.log(value) // 2

const value2 = [1, 5, 10 ,15].find((el, index, array) => {
    return el > 20
})

console.log(value2) // -1
```
## 数组的排序
>在扩展里 sort

## 关于reduce的用法

可以去看另一篇文章<a href="https://hexo-aming.vercel.app/2020/04/15/array-reduce/"><<JS数组reduce()方法详解及高级技巧>></a>

reduce 中文有 '减少'， '约减'的意思

```js
array.reduce(callback[, initialValue])
```

callback函数接受4个参数 (initialValue 参数可选 标示初始值)
* 之前值 previous
* 当前值 current
* 索引值 index
* 数组本身 array


### 计算总数
```js
const sum = [1, 2, 3, 4].reduce((previous, current, index, array) => {
    return previous + current
})
console.log(sum)

// output
// 10
```

解析:
1. initialValue不存在，所以pervious等于数组的第一个元素
2. current 在第一次调用的时候就是2

```js
// 初始设置
previous = initialValue = 1, current = 2

// 第一次迭代
previous = (1 + 2) = 3, current = 3

// 第二次迭代
previous = (3 + 3) = 6, current = 4

// 第三次迭代
previous = (6 + 4) = 10, current = undefiend (退出)
```

### 例子: 数组扁平化～
[[1,2],[3,4],[5,6]].flat(Infinity) 在浏览器中可用
```js
const matrix = [[1,2],[3,4],[5,6]]

const flatten = matrix.reduce((pre, cur) => {
    return pre.concat(cur)
})

console.log(flatten)

// output
// [1,2,3,4,5,6]
```

## 去重

### 最好的实现：
```js
var arr = [3, 2, 3, 1, 4,0,0, true, false, "3", "22", "2", 2]
function norepeat (arr) {
  var resArr = [];
  var obj = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    console.log(typeof arr[i])
    if (!(obj[arr[i] + typeof arr[i]])) {
      resArr.push(arr[i]);
      obj[arr[i] + typeof arr[i]] = 1;
    }
  }
  return resArr;
}
var res = norepeat(arr);
console.log(res);
```

### 如果数组内是数字
  #### set
 ```js
  Array.from(new Set(array));
 ```

  #### filter
  ```js
  let arr = [1,2,2,3,4,5,6];
  let newArr = arr.filter((x,index,self)=>{self.indexOf(x) === index})
  console.log(arr)
  ```

 ### 使用 new Map和filter 

 ```js
  var a = [
    {name:'1',id:'1'},{name:'1',id:'1'},
    {name:'3',id:'3'},{name:'4',id:'4'}
  ]
  var b = new Map()
  var res = a.filter((item)=>!b.has(item.id)&&b.set(item.id,true))
  console.log(res)

  function unique(arr){
      const res = new Map()
      return list.filter((a)=>!res.has(a.name)&&res.set(a.name,1))
  }
 ```
 这里还可以进行优化，比如name属性我们可以通过item[val]的方式动态的改变～


## 数组扁平化

>数组扁平化是指将一个多维数组变为一维数组
```js
[1, [2, 3, [4, 5]]]  ------>    [1, 2, 3, 4, 5]
```

### 核心
遍历数组arr，若arr[i]为数组则递归遍历，直至arr[i]不为数组然后与之前的结果concat。 

### reduce
遍历数组每一项,若值为数组则递归遍历,否则concat

```js
function flatten(arr){
  return arr.reduce((result,item)=>{
    return result.concat(Array.isArray(item) ? flatten(item):item)
  },[])
}
```
reduce是数组的一种方法，它接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

reduce包含两个参数：回调函数，传给total的初始值

```js
// 求数组的各项值相加的和： 
arr.reduce((total, item)=> {  // total为之前的计算结果，item为数组的各项值
    return total + item;
}, 0);
```

### toString & split
调用数组的toString方法,将数组变为字符串 然后再用split 分割还原为数组 
```js
function flatten(arr) {
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
} 
```

### join & split

和上面的toString一样,join也可以将数组转换为对象
```js
function flatten(arr) {
    return arr.join(',').split(',').map(function(item) {
        return parseInt(item);
    })
}
```

### 递归
递归的遍历每一项,若为数组则继续遍历,否则concat

```js
function flatten(arr) {
    var res = [];
    arr.map(item => {
        if(Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    });
    return res;
}
```

### 扩展运算符
es6的扩展运算符能将二维数组变为一维

```js
[].concat(...[1, 2, 3, [4, 5]]);  // [1, 2, 3, 4, 5]
```
根据这个结果我们可以做一个遍历，若arr中含有数组则使用一次扩展运算符，直至没有为止

```js
function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```

## 扩展

### 扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
```

扩展运算符与正常的函数参数可以结合使用，非常灵活。

```js
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
```
扩展运算符后面还可以放置表达式
```js
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
```
注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
```js
(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2
```
#### 替代函数的apply方法

```js
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);

// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);

// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);

// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
```

#### 复制数组
```js
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```
#### 合并数组

```js
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
不过，这两种方法都是浅拷贝，使用的时候需要注意。
```js
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true
```

#### 解构赋值
```js
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

// 例子
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
```js
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

#### 字符串
```js
[...'hello']
// [ "h", "e", "l", "l", "o" ]

'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
```
#### 实现了 Iterator 接口的对象
```js
Number.prototype[Symbol.iterator] = function*() {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
}

console.log([...5]) // [0, 1, 2, 3, 4]
```
上面代码中，先定义了Number对象的遍历器接口，扩展运算符将5自动转成Number实例以后，就会调用这个接口，就会返回自定义的结果。
```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```
上面代码中，arrayLike是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。

#### Map 和 Set 结构，Generator 函数
扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构
```js
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```
Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
```js
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```

### Array.from()

>Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map
类数组对象
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
```js
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```
只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
```js
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
```
如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
```js
Array.from([1, 2, 3])
// [1, 2, 3]

Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js
Array.from([1, 2, 3], (x) => x * x)
```
下面的例子是取出一组 DOM 节点的文本内容。

```js
let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)
```

### Array.of()
>Array.of方法用于将一组值，转换为数组。
```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```
Array.of方法可以用下面的代码模拟实现。
```js
function ArrayOf(){
  return [].slice.call(arguments);
}
```

### copyWithin
>数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)

[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

### find() 和 findIndex()
>数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
```js
[1, 4, -5, 10].find((n) => n < 0)
// -5
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10

[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

这两个方法都可以发现NaN

```js
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

### 数组实例的 fill()

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]
```

### 数组实例的 entries()，keys() 和 values()
>ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

```

### 数组实例的 includes()
```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```
该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始

```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

### 数组实例的 flat()，flatMap() 
>数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。

浏览器中可用，node中不生效

```js
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]

[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

```

flatMap
```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
```

### sort()
>sort()  方法用于对数组的元素进行排序，并返回数组。语法：arrayObject.sort(sortby);参数sortby  可选，用来规定排序的顺序，但必须是函数。

例一：按照字母顺序排序
```js
let arr =['tom','ani','love','sai','fei'].sort()
console.log(arr)
//[ 'ani', 'fei', 'love', 'sai', 'tom' ]
```

例二:按照字母顺序排序

```js
let arr =['12','323','1000','50'].sort()
console.log(arr)
// [ '1000', '12', '323', '50' ]
```

例三：升序排序

```js
function sortNum(a,b){
  return a-b
}
let arr =['12','323','1000','50'].sort(sortNum)
console.log(arr)
// [ '12', '50', '323', '1000' ]
```

例四：降序排序
```js
function sortNum(a,b){
  return b-a
}
let arr =['12','323','1000','50'].sort(sortNum)
console.log(arr)
```

例五：按照数组对象中某个属性值进行排序
```js
var arr1 = [
  {name:'张飞',age:34},
  {name:'关羽',age:30},
  {name:'刘备',age:60}
]

function campare(prop){
  return function(a,b){
    var value1 = a[prop];
    var value2 = b[prop];
    return value1 - value2 
  }
}

let result = arr1.sort(campare('age'))
console.log(result)
// [ { name: '关羽', age: 30 }, 
//   { name: '张飞', age: 34 }, 
//   { name: '刘备', age: 60 } ]
```

例六：根据参数来确定是升序还是降序

```js
var arr1 = [
  {name:'张飞',age:34},
  {name:'关羽',age:30},
  {name:'刘备',age:60}
]

function sortBy(attr,rev){
  if(rev == undefined){
    rev = 1
  }else{
    rev = (rev)? 1:-1;
  }
  return function(a,b){
    a = a[attr];
    b = b[attr];
    if(a<b){
      return rev* -1;
    }
    if(a>b){
      return rev*1
    }
    return 0
  }
}

let result = arr1.sort(sortBy('age',true))
console.log(result)

// [ { name: '关羽', age: 30 }, 
//   { name: '张飞', age: 34 }, 
//   { name: '刘备', age: 60 } ]

let result2 = arr1.sort(sortBy('age',false))
console.log(result2)


// [ { name: '刘备', age: 60 }, 
//   { name: '张飞', age: 34 }, 
//   { name: '关羽', age: 30 } ]
```

### 帮同学处理数组内部嵌套 排序

```js
let ary = res.data.list;

function campare(name){
  return function(a,b){
    let Aresult = a['platform_list'].filter(item=>item.name === name) ;//拿到 对面名称 例如亚马孙的数组
    let Bresult = a['platform_list'].filter(item=>item.name === name) ;

    // 对 order_num_arr.order_num_rate 进行排序
    
   return Aresult[0].order_num_arr.order_num_rate - Bresult[0].order_num_arr.order_num_rate
  }
}

let result = ary.sort(campare('亚马逊'))

```

# 数组处理封装方法

 ## 使用callback倒计时
 ```js
const all_yzm = function(callback){
  const TIME_COUNT = 60;//默认倒计时
  let time = ''
  let timer = null;

  if(!timer){
    time = TIME_COUNT;
    timer = setInterval(() => {
      if(time>0 && time<=TIME_COUNT){
        time--;
      }else{
        clearInterval(timer)
        timer =null;
        time = '重新获取'
      }
      callback(time)
    }, 1000);
  }
}

all_yzm(function(time){
  console.log(time)
  // 还要赋值
})

const all_yzm2 = function(time){
  const TIME_COUNT = 60;//默认倒计时
  let timer = null;

  if(!timer){
    timer = setInterval(() => {
      if(time>0 && time<=TIME_COUNT){
        time--;
      }else{
        clearInterval(timer)
        timer =null;
        time = '重新获取'
      }
      console.log(time)
    }, 1000);
  }
}

// all_yzm(function(time){
//   console.log(time)
// })
all_yzm2(60)
 ```

 ## 一个数组插入另一个数组中

 ```js

let Arr =[{a:1},{a:2},{a:3}];
let Brr =[{b:1},{b:2},{b:3}];         
function insert(index,arr1,arr2){
  console.time(1)
  let result = [...arr2.slice(0,index),...arr1,...arr2.slice(index)]
  console.timeEnd(1)
  return result
}


console.log(insert(1,Arr,Brr))
//1: 0.226ms
//[ { b: 1 }, { a: 1 }, { a: 2 }, { a: 3 }, { b: 2 }, { b: 3 } ]
 ```

 ## 数组中阶乘

 ```js
var arr = []
function func(skuarr=[], i, list){
for (let j=0; j<list[i].length; j++) {
if (i<list.length-1) {
skuarr[i] = list[i][j]
func(skuarr, i+1, list)
} else {
// 拓展运算符合并数组
arr.push([...skuarr,list[i][j]])
}
}
return arr
}
const list = [
　　['黑色','红色','白色'],
　　['S','M'],
　　['好','差']
]
console.log(func([],0,list))

// [ [ '黑色', 'S', '好' ],
//   [ '黑色', 'S', '差' ],
//   [ '黑色', 'M', '差' ],
//   [ '红色', 'S', '好' ],
//   [ '红色', 'S', '差' ],
//   [ '红色', 'M', '好' ],
//   [ '红色', 'M', '差' ],
//   [ '白色', 'S', '好' ],
//   [ '白色', 'S', '差' ],
//   [ '白色', 'M', '好' ],
//   [ '白色', 'M', '差' ] ]
 ```