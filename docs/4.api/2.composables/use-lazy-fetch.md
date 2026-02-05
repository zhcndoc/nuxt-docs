---
title: 'useLazyFetch'
description: 这是对 useFetch 的封装，通过设置 `lazy` 选项为 `true`，会立即触发导航。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch` 是对 [`useFetch`](/docs/3.x/api/composables/use-fetch) 的封装，通过将 `lazy` 选项设置为 `true`，使得在处理函数解析之前立即触发导航。

## 用法

默认情况下，[`useFetch`](/docs/3.x/api/composables/use-fetch) 会阻塞导航，直到其异步处理函数解析完成。而 `useLazyFetch` 则允许导航立即进行，数据在后台异步获取。

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
`useLazyFetch` 拥有和 [`useFetch`](/docs/3.x/api/composables/use-fetch) 相同的签名。
::

::warning
等待 `useLazyFetch` 仅保证了调用初始化。在客户端导航时，数据可能不会立即可用，因此你必须在组件模板中处理 `pending` 状态。
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
`useLazyFetch` 等同于设置了 `lazy: true` 选项的 `useFetch`。完整的类型定义请参考 [`useFetch`](/docs/3.x/api/composables/use-fetch)。
::

## 参数

`useLazyFetch` 接受和 [`useFetch`](/docs/3.x/api/composables/use-fetch) 相同的参数：

- `URL`（`string | Request | Ref<string | Request> | () => string | Request`）：要请求的 URL 或请求对象。
- `options`（对象）：同 [`useFetch` 选项](/docs/3.x/api/composables/use-fetch#parameters)，但 `lazy` 会自动设为 `true`。

:read-more{to="/docs/3.x/api/composables/use-fetch#parameters"}

## 返回值

返回与 [`useFetch`](/docs/3.x/api/composables/use-fetch) 相同的 `AsyncData` 对象：

| 名称     | 类型                                                  | 描述                                                                                                          |
| -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `data`   | `Ref<DataT \| undefined>`                             | 异步请求的结果数据。                                                                                           |
| `refresh`| `(opts?: AsyncDataExecuteOptions) => Promise<void>`  | 手动刷新数据的函数。                                                                                           |
| `execute`| `(opts?: AsyncDataExecuteOptions) => Promise<void>`  | `refresh` 的别名。                                                                                             |
| `error`  | `Ref<ErrorT \| undefined>`                            | 若请求失败，返回错误对象。                                                                                     |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`   | 请求的当前状态。                                                                                               |
| `clear`  | `() => void`                                          | 将 `data` 和 `error` 重置为 `undefined`，状态设为 `idle`，并取消所有挂起的请求。                              |

:read-more{to="/docs/3.x/api/composables/use-fetch#return-values"}

## 示例

### 处理挂起状态

```vue [pages/index.vue]
<script setup lang="ts">
/* 导航会在请求完成前发生。
 * 在组件模板中直接处理 'pending' 和 'error' 状态
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

:read-more{to="/docs/3.x/getting-started/data-fetching"}
