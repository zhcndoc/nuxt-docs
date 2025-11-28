---
title: useLazyAsyncData
description: 这是一个封装了 useAsyncData 的函数，能够在处理器解析完成前立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData` 提供了一个对 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 的封装，通过将 `lazy` 选项设置为 `true`，使得导航在处理器解析之前立即触发。

::note
默认情况下，[`useAsyncData`](/docs/4.x/api/composables/use-async-data) 会阻塞导航，直到其异步处理器解析完成。而 `useLazyAsyncData` 允许导航立即发生，同时数据请求在后台继续进行。
::

## 用法

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyAsyncData('posts', () => $fetch('/api/posts'))
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      加载中...
    </div>
    <div v-else-if="status === 'error'">
      加载文章时出错
    </div>
    <div v-else>
      {{ posts }}
    </div>
  </div>
</template>
```

使用 `useLazyAsyncData` 时，导航会在请求完成之前发生，这意味着你必须在组件模板中直接处理 `pending` 和 `error` 状态。

::warning
`useLazyAsyncData` 是一个由编译器转换的保留函数名，因此你不应将自己的函数命名为 `useLazyAsyncData`。
::

## 类型

```ts [Signature]
export function useLazyAsyncData<DataT, ErrorT> (
  handler: (ctx?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, ErrorT>

export function useLazyAsyncData<DataT, ErrorT> (
  key: string,
  handler: (ctx?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, ErrorT>
```

`useLazyAsyncData` 与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 具有相同的签名。

## 参数

`useLazyAsyncData` 接受与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 相同的参数，且自动将 `lazy` 选项设置为 `true`。

:read-more{to="/docs/4.x/api/composables/use-async-data#parameters"}

## 返回值

`useLazyAsyncData` 返回与 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 相同的值。

:read-more{to="/docs/4.x/api/composables/use-async-data#return-values"}

## 示例

```vue [app/pages/index.vue]
<script setup lang="ts">
/* 导航会在数据获取完成之前发生。
  请直接在组件模板中处理 'pending' 和 'error' 状态
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // 因为 count 可能初始为 null，
  // 所以你不能立即访问其内容，但可以监听它。
})
</script>

<template>
  <div>
    {{ status === 'pending' ? '加载中' : count }}
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
