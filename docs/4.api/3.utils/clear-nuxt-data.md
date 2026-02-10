---
title: 'clearNuxtData'
description: 删除 useAsyncData 和 useFetch 的缓存数据、错误状态和未决的 promise。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
如果你想使另一个页面的数据获取失效，此方法很有用。
::

## 类型

```ts [Signature]
export function clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## 参数

* `keys`：一个用于在 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 中的键或键数组，用来删除它们的缓存数据。如果未提供任何键，将使**所有数据**失效。
