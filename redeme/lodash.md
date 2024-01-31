---
title: lodash的功能分类
tag:
 - js
categories:
 - js
keywords: "js,lodash"
addrlink: dda8c81b
date: 2021-03-27 11:05:07
description:
top_img:
cover: "https://img.zhangaming.com/mayday/dna.jpg"
---

# 文档地址

https://www.lodashjs.com/

# 常用方法 

有用到再加入

## 防抖函数

```js
import debounce from 'lodash.debounce'
// vue 在change监听
 <template slot="positionName" slot-scope="text, record">
  <a-input v-model="record['positionName']" @change="changeName(record)" placeholder="请输入岗位名称" />
  </template>
// methods
changeName(data) {
      this.modifyProjectMember(data)
    },
modifyProjectMember: debounce(function(data) {
  const params = {
    id: data.id,
    positionName: data.positionName
  }
  modifyProjectMember(params).then(res => {
    if (res.code === 200) {
      console.log('请求成功', data)
    }
  })
}, 500),
```

# 数组

## 数组转对象
### _.fromPairs
>_.fromPairs(pairs)
(Object): 返回一个新对象。 与_.toPairs相反 _.toPairs对象转数组
```js
_.fromPairs([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }

```

## 拆分数组
### _.chunk
>_.chunk(array, [size=1])
(Array): 返回一个包含拆分区块的新数组（注：相当于一个二维数组）
```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```
### _.drop
>_.drop(array, [n=1])
(Array): 返回array剩余切片。
```js
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]

```
### _.dropRight
>_.dropRight(array, [n=1])
(Array): 返回array剩余切片。
```js
_.dropRight([1, 2, 3]);
// => [1, 2]
 
_.dropRight([1, 2, 3], 2);
// => [1]
 
_.dropRight([1, 2, 3], 5);
// => []
 
_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]

```




## 过滤
### _.compact
>_.compact(array)
(Array): 返回过滤掉假值的新数组。
```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]

```
### _.difference
>_.difference(array, [values])
(Array): 返回一个过滤值后的新数组。
```js
_.difference([3, 2, 1], [4, 2]);
// => [3, 1]
```
### _.differenceBy
>_.differenceBy(array, [values], [iteratee=_.identity])
(Array): 返回一个过滤值后的新数组。
```js
_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]
 
// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]

```
### _.differenceWith
>_.differenceWith(array, [values], [comparator])
(Array): 返回一个过滤值后的新数组。
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]

```
### _.dropWhile
>_.dropWhile(array, [predicate=_.identity])
(Array): 返回array剩余切片。
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']
 
// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']
 
// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']

```
### _.dropRightWhile
>_.dropRightWhile(array, [predicate=_.identity])
(Array): 返回array剩余切片。
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['barney']
 
// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ['active', false]);
// => objects for ['barney']
 
// The `_.property` iteratee shorthand.
_.dropRightWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']

```
### _.initial
>_.initial(array)
去除数组array中的最后一个元素
```js
_.initial([1, 2, 3]);
// => [1, 2]

```
### _.intersection
>_.intersection([arrays])
(Array): 返回一个包含所有传入数组交集元素的新数组。
```js
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```
### _.intersectionBy
>_.intersectionBy([arrays], [iteratee=_.identity])
```js
_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]
 
// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]

```
### _.intersectionWith
>_.intersectionWith([arrays], [comparator])
(Array): 返回一个包含所有传入数组交集元素的新数组。
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]

```

## 组合数组
### _.concat
>_.concat(array, [values])
(Array): 返回连接后的新数组。
```js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]

```

## 查询数组及元素下标
### _.indexOf
>_.indexOf(array, value, [fromIndex=0])
(number): 返回 值value在数组中的索引位置, 没有找到为返回-1。
```js
_.indexOf([1, 2, 1, 2], 2);
// => 1
 
// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3

```
### _.lastIndexOf
>_.lastIndexOf(array, value, [fromIndex=array.length-1])
这个方法类似_.indexOf ，区别是它是从右到左遍历array的元素。
```js
_.lastIndexOf([1, 2, 1, 2], 2);
// => 3
 
// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1

```
### _.findIndex
>_.findIndex(array, [predicate=_.identity], [fromIndex=0])
(number): 返回找到元素的 索引值（index），否则返回 -1
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2

```
### _.findLastIndex
>_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])
(number): 返回找到元素的 索引值（index），否则返回 -1
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2
 
// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0
 
// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2
 
// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0

```
### _.head
>_.head(array)
(*): 返回数组 array的第一个元素。
```js
_.head([1, 2, 3]);
// => 1
 
_.head([]);
// => undefined

```
### _.last
>_.last(array)
(*): 返回array中的最后一个元素
```js
_.last([1, 2, 3]);
// => 3
```

## 填充 替换数组
### _.fill
>_.fill(array, value, [start=0], [end=array.length])
(Array): 返回 array。

```js
var array = [1, 2, 3];
 
_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']
 
_.fill(Array(3), 2);
// => [2, 2, 2]
 
_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]

```

## 减少嵌套或者扁平化
### _.flatten
>_.flatten(array) 
减少一级array嵌套深度。
```js
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]

```
### _.flattenDeep
>_.flattenDeep(array)
将array递归为一维数组。
```js
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]

```
### _.flattenDepth
>_.flattenDepth(array, [depth=1])
根据 depth 递归减少 array 的嵌套层级
```js
var array = [1, [2, [3, [4]], 5]];
 
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
 
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]

```

## 数组转字符串
### _.join
>_.join(array, [separator=','])
(string): 返回连接字符串。

```js
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'

```