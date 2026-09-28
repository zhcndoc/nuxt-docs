---
title: 'useLazyFetch'
description: 这是对 useFetch 的封装，通过设置 `lazy` 选项为 `true`，会立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch` 是 [`useFetch`](/docs/api/composables/use-fetch) 的封装，通过将 `lazy` 选项设为 `true`，在处理函数解析前触发导航。

## 用法

默认情况下，[`useFetch`](/docs/api/composables/use-fetch) 会阻止导航，直到其异步处理函数解析完成。`useLazyFetch` 会立即继续导航，同时在后台获取数据。

```vue [pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    加载中 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 在此处理 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` 与 [`useFetch`](/docs/api/composables/use-fetch) 具有相同的签名。
::

::warning
等待 `useLazyFetch` 仅保证调用已初始化。在客户端导航时，数据可能不会立即可用，因此你必须在组件模板中处理 `pending` 状态。
::

::warning
`useLazyFetch` 是编译器保留的函数名，因此不要自行命名函数为 `useLazyFetch`。
::

## 类型

```ts [Signature]
export function useLazyFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>
```

::note
`useLazyFetch` 等同于将 `lazy: true` 选项设为 `true` 的 `useFetch`。有关完整的类型定义，请参阅 [`useFetch`](/docs/api/composables/use-fetch)。
::

## 参数

`useLazyFetch` 接受与 [`useFetch`](/docs/api/composables/use-fetch) 相同的参数：

- `URL`（`string | Request | Ref<string | Request> | () => string | Request`）：要获取的 URL 或请求。
- `options`（对象）：与 [`useFetch` 选项](/docs/api/composables/use-fetch#parameters)相同，其中 `lazy` 会自动设为 `true`。

:read-more{to="/docs/api/composables/use-fetch#parameters"}

## 返回值

返回与 [`useFetch`](/docs/api/composables/use-fetch) 相同的 `AsyncData` 对象：

| Name      | Type                                                | Description                                                                                                      |
|-----------|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 异步获取结果。                                                                            |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 用于手动刷新数据的函数。                                                                           |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。                                                                                             |
| `error`   | `Ref<ErrorT \| undefined>`                          | 如果数据获取失败，则为错误对象。                                                                        |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 数据请求的状态。                                                                                      |
| `pending` | `Ref<boolean>`                                      | 指示当前请求是否正在进行的布尔标志。                                              |
| `clear`   | `() => void`                                        | 将 `data` 重置为 `undefined`，将 `error` 重置为 `undefined`，将 `status` 设置为 `idle`，并取消任何正在进行的请求。 |

:read-more{to="/docs/api/composables/use-fetch#return-values"}

## 示例

### 处理挂起状态

```vue [pages/index.vue]
<script setup lang="ts">
/* 在请求完成前会发生导航。
 * 请在组件模板中直接处理 'pending' 和 'error' 状态
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // 由于 posts 可能初始为 null，你无法马上访问其内容，但可以通过 watch 监听其变化。
})
</script>

<template>
  <div v-if="status === 'pending'">
    加载中 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 在此处理 -->
    </div>
  </div>
</template>
```

:read-more{to="/docs/getting-started/data-fetching"}
