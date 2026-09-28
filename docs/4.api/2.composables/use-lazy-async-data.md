---
title: useLazyAsyncData
description: 这是一个封装了 useAsyncData 的函数，能够在处理器解析完成前立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData` 通过将 `lazy` 选项设为 `true`，封装了 [`useAsyncData`](/docs/api/composables/use-async-data)，使其能够在处理器解析完成前触发导航。

::note
默认情况下，[`useAsyncData`](/docs/api/composables/use-async-data) 会阻塞导航，直到其异步处理器解析完成。`useLazyAsyncData` 则允许导航立即进行，同时在后台继续获取数据。
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

`useLazyAsyncData` 让导航在获取数据的同时继续进行。在使用结果之前，请在组件模板中检查 `status === 'pending'` 和 `status === 'error'`。

::warning
`useLazyAsyncData` 是一个由编译器转换的保留函数名，因此你不应将自己的函数命名为 `useLazyAsyncData`。
::

## 类型

```ts [Signature]
export function useLazyAsyncData<ResT, DataE = unknown, DataT = ResT> (
  handler: AsyncDataHandler<ResT>,
  options?: AsyncDataOptions<ResT, DataT>,
): AsyncData<DataT, DataE> & Promise<AsyncData<DataT, DataE>>

export function useLazyAsyncData<ResT, DataE = unknown, DataT = ResT> (
  key: MaybeRefOrGetter<string>,
  handler: AsyncDataHandler<ResT>,
  options?: AsyncDataOptions<ResT, DataT>,
): AsyncData<DataT, DataE> & Promise<AsyncData<DataT, DataE>>
```

`useLazyAsyncData` 的签名与 [`useAsyncData`](/docs/api/composables/use-async-data) 相同。

## 参数

`useLazyAsyncData` 接受与 [`useAsyncData`](/docs/api/composables/use-async-data) 相同的参数，并会自动将 `lazy` 选项设为 `true`。

:read-more{to="/docs/api/composables/use-async-data#parameters"}

## 返回值

`useLazyAsyncData` 返回与 [`useAsyncData`](/docs/api/composables/use-async-data) 相同的值。

:read-more{to="/docs/api/composables/use-async-data#return-values"}

## 示例

```vue [app/pages/index.vue]
<script setup lang="ts">
/* useLazyAsyncData 允许导航在获取完成前继续。
  在模板中处理加载和错误状态。
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // 因为 count 可能初始为 null，
  // 所以你不能立即访问其内容，但可以监听它。
})
</script>

<template>
  <div v-if="status === 'pending'">
    加载中
  </div>
  <div v-else-if="status === 'error'">
    加载 count 时出错
  </div>
  <div v-else>
    {{ count }}
  </div>
</template>
```

:read-more{to="/docs/getting-started/data-fetching"}
