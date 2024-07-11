---
title: 'clearNuxtData'
description: 清除 useAsyncData 和 useFetch 的缓存数据、错误状态和挂起的 Promise。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
这个方法在您需要失效另一个页面的数据获取时非常有用。
::

## 类型

```ts
clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

* `keys`: 用于在 [`useAsyncData`](/docs/api/composables/use-async-data) 中删除其缓存数据的一个或一个字符串数组。如果没有提供键，**所有的数据**将被失效。
