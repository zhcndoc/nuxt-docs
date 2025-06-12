---
title: 'clearNuxtData'
description: 删除 useAsyncData 和 useFetch 的缓存数据、错误状态以及待处理的 Promise。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
如果你想使另一个页面的数据获取失效，此方法非常有用。
::

## 类型

```ts
clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

* `keys`：用于 [`useAsyncData`](/docs/api/composables/use-async-data) 的一个或多个键，用于删除它们的缓存数据。如果未提供键，则**所有数据**都会被失效。