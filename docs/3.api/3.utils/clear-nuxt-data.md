---
title: 'clearNuxtData'
description: 删除缓存数据、错误状态和 useAsyncData 及 useFetch 的挂起承诺。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
如果您想使另一个页面的数据获取失效，此方法非常有用。
::

## 类型

```ts
clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

* `keys`: 一个或多个在 [`useAsyncData`](/docs/api/composables/use-async-data) 中使用的键，用于删除其缓存数据。如果未提供键，**所有数据**都将失效。