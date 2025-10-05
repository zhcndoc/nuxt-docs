---
title: 'refreshNuxtData'
description: 刷新 Nuxt 中所有或特定的 asyncData 实例
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`refreshNuxtData` 用于重新获取所有或特定的 `asyncData` 实例，包括来自 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)、[`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data)、[`useFetch`](/docs/4.x/api/composables/use-fetch) 和 [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch) 的数据。  

::note
如果你的组件被 `<KeepAlive>` 缓存并进入 deactivated（停用）状态，组件内的 `asyncData` 仍会被重新获取，直到组件被卸载为止。
::

## 类型

```ts [Signature]
export function refreshNuxtData (keys?: string | string[])
```

## 参数

* `keys`：用于获取数据的一个字符串或字符串数组。该参数为**可选**。当未显式指定 `keys` 时，所有的 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 和 [`useFetch`](/docs/4.x/api/composables/use-fetch) 键都会被重新获取。

## 返回值

`refreshNuxtData` 返回一个 Promise，当所有或特定的 `asyncData` 实例刷新完成时该 Promise 解析。

## 示例

### 刷新所有数据

下面的示例会刷新在 Nuxt 应用中使用 `useAsyncData` 和 `useFetch` 获取的所有数据。

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refreshAll () {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div>
    <button
      :disabled="refreshing"
      @click="refreshAll"
    >
      重新获取所有数据
    </button>
  </div>
</template>
```

### 刷新特定数据

下面的示例只刷新键匹配 `count` 和 `user` 的数据。

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refresh () {
  refreshing.value = true
  try {
    // 你也可以传入一个键数组来刷新多个数据
    await refreshNuxtData(['count', 'user'])
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div v-if="refreshing">
    加载中
  </div>
  <button @click="refresh">
    刷新
  </button>
</template>
```

::note
如果你可以访问到 `asyncData` 实例，建议优先使用其 `refresh` 或 `execute` 方法来重新获取数据。
::

:read-more{to="/docs/4.x/getting-started/data-fetching"}