---
title: 'useLazyFetch'
description: 这个围绕 useFetch 的封装通过将 `lazy` 选项设置为 `true`，立即触发导航。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch` 是对 [`useFetch`](/docs/4.x/api/composables/use-fetch) 的封装，通过将 `lazy` 选项设置为 `true`，在处理器解析前就触发导航。

## 用法

默认情况下， [`useFetch`](/docs/4.x/api/composables/use-fetch) 会阻塞导航，直到异步处理器解析完成。`useLazyFetch` 允许导航立即进行，数据则在后台获取。

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    正在加载...
  </div>
  <div v-else-if="status === 'error'">
    加载帖子时出错
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 执行相关操作 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` 具有与 [`useFetch`](/docs/4.x/api/composables/use-fetch) 相同的函数签名。
::

::warning
等待 `useLazyFetch` 会初始化调用，但不会等待数据。在客户端导航期间，在使用结果之前，请在组件模板中检查 `status === 'pending'` 和 `status === 'error'`。
::

::warning
`useLazyFetch` 是编译器转换后的保留函数名，因此不应将自己的函数命名为 `useLazyFetch`。
::

## 类型

```ts [Signature]
export function useLazyFetch<ResT, ErrorT = NuxtError<unknown>, DataT = ResT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<ResT, DataT>,
): AsyncData<DataT, ErrorT> & Promise<AsyncData<DataT, ErrorT>>
```

::note
`useLazyFetch` 等价于设置了 `lazy: true` 选项的 `useFetch`。完整类型定义详见 [`useFetch`](/docs/4.x/api/composables/use-fetch)。
::

## 参数

`useLazyFetch` 接受与 [`useFetch`](/docs/4.x/api/composables/use-fetch) 相同的参数：

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`)：要请求的 URL 或请求对象。
- `options` (对象)：与 [`useFetch` 选项](/docs/4.x/api/composables/use-fetch#parameters) 相同，`lazy` 选项会自动设置为 `true`。

:read-more{to="/docs/4.x/api/composables/use-fetch#parameters"}

## 返回值

返回与 [`useFetch`](/docs/4.x/api/composables/use-fetch) 相同的 `AsyncData` 对象：

| 名称      | 类型                                                | 说明                                                                                                      |
|-----------|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 异步获取的结果。                                                                            |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 手动刷新数据的函数。                                                                           |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。                                                                                             |
| `error`   | `Ref<ErrorT \| undefined>`                          | 数据获取失败时的错误对象。                                                                        |
| `status`   | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 数据请求的状态。可用于区分 `idle`、`pending`、`success` 和 `error`。                     |
| `pending` | `Ref<boolean>`                                      | 请求进行中时为 `true`。参见 [`useFetch`](/docs/4.x/api/composables/use-fetch#return-values)。        |
| `clear`   | `() => void`                                        | 将 `data` 重置为 `undefined`、将 `error` 重置为 `undefined`、将 `status` 设为 `idle`，并取消任何待处理的请求。 |

:read-more{to="/docs/4.x/api/composables/use-fetch#return-values"}

## 示例

### 处理加载状态

```vue [app/pages/index.vue]
<script setup lang="ts">
/* useLazyFetch 允许在 fetch 完成之前继续导航。
 * 在模板中处理加载和错误状态。
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // 因为初始时 posts 可能是 null，所以无法立即访问其内容，但可以通过观察其变化处理
})
</script>

<template>
  <div v-if="status === 'pending'">
    正在加载...
  </div>
  <div v-else-if="status === 'error'">
    加载帖子时出错
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 执行相关操作 -->
    </div>
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
