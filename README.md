# nano-storage

nano storage 是一个简化的 localStorage 及 sessionStorage 方法

## Feature

- gzip 0.2kb, 仅仅是一个工具方法
- 直接下标取值，取值直接走对象缓存
- 自动持久化
- 支持 Typescript
- 支持版本规划

## Use

NanoStorage 第一个参数是 storage 的 key，第二个参数是初始化对象，NanoStorage 会以初始化对象为范型作为后续的对象提示，为了项目对象更好的理解，建议所有使用的对象都有一个初始化的值

```js
import { NanoStorage } from "nano-storage";
const store = NanoStorage('app_name', {
  name:'dog';
  age: 20,
});

console.log(store.val.name); // "dog"
console.log(store.val.age); // 20

// 更新内容
store.assign({name:'fish'});
console.log(store.val.name); // "fish"

// 还原初始化内容
store.set(store.defaultValues);
```

## 使用 sessionStorage

nano-storage 默认使用 localstorage, 若要使用 sessionStorage 可以设置 storage 为 'sessionStorage':

```js
const store = NanoStorage('user-data', {
  name:'dog';
  age: 20,
}, {
  storage: 'sessionStorage',
});
```

## 统一设置版本

所有 NanoStorage 的 key 等于 key + version

```js
NanoStorage.version = "_0.0.1";
```

## 个别对象单独版本

NanoStorage.version 是所有 对象都设置的版本号，若有个别对象希望不一样的版本号，可以设置 version 对象

```js
const store = NanoStorage('user-data', {
  name:'dog';
  age: 20,
}, {
  version: '0.0.2'
});
```
