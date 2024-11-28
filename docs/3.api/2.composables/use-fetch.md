---
title: 'useFetch'
description: '使用一个支持 SSR 的组合式函数从 API 端点获取数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

这个组合式函数为 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`$fetch`](/docs/api/utils/dollarfetch) 提供了一个方便的包装器。它根据 URL 和获取选项自动生成一个键，为基于服务端路由的请求 URL 提供类型提示，并推断 API 响应类型。

::note
`useFetch` 是一个组合式函数，它应该在设置函数、插件或路由中间件中直接调用。它返回响应式的组合式对象，并处理将响应添加到 Nuxt 的 payload 中，这样它们就可以在没有客户端重取数据的情况下从服务器传递到客户端，当页面进行 hydrate 时。
::

## 使用

```vue [pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title']
})
</script>
```

::warning
如果您使用的是自定义 `useFetch` 包装器，请不要在组合式函数中等待它，因为这可能会导致意外的行为。请遵循[这个配方](/docs/guide/recipes/custom-usefetch#custom-usefetch)获取更多关于如何创建自定义异步数据获取器的信息。
::

::note
`data`、`status` 和 `error` 是 Vue refs，在 `<script setup>` 中使用时应通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 是普通函数。
::

使用 `query` 选项，您可以在查询中添加搜索参数。这个选项由 [unjs/ofetch](https://github.com/unjs/ofetch) 扩展，并使用 [unjs/ufo](https://github.com/unjs/ufo) 创建 URL，对象会自动字符串化。

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

上面的例子结果是 `https://api.nuxt.com/modules?param1=value1&param2=value2`。

您也可以使用 [interceptors](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // 设置请求头
    // 请注意，这依赖于 ofetch >= 1.4.0 - 你可能需要刷新你的锁定文件。
    options.headers.set('Authorization', '...')
  },
  onRequestError({ request, options, error }) {
    // 处理请求错误
  },
  onResponse({ request, response, options }) {
    // 处理响应数据
    localStorage.setItem('token', response._data.token)
  },
  onResponseError({ request, response, options }) {
    // 处理响应错误
  }
})
```

::warning
`useFetch` 是一个由编译器转换的保留函数名，所以您不应该将您的函数命名为 `useFetch`。
::

::warning
如果你遇到从 `useFetch` 解构出来的 `data` 变量返回的是一个字符串而不是一个解析过的 JSON 对象，那么确保你的组件不包含像 `import { useFetch } from '@vueuse/core` 这样的导入语句。
::

::tip{icon="i-ph-video" to="https://www.youtube.com/watch?v=njsGVmcWviY" target="_blank"}
观看 Alexander Lichter 的视频，以避免错误地使用 `useFetch`！
::

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:read-more{to="/docs/getting-started/data-fetching"}

:link-example{to="/docs/examples/features/data-fetching"}

## 参数

- `URL`: 要获取的 URL。
- `Options` (扩展自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项及 [AsyncDataOptions](/docs/api/composables/use-async-data#params)):
  - `method`: 请求方法。
  - `query`: 使用 [ufo](https://github.com/unjs/ufo) 将查询搜索参数添加到URL。
  - `params`: `query` 的别名。
  - `body`: 请求体 - 如果传递的是一个对象，则会自动字符串化。
  - `headers`: 请求头。
  - `baseURL`: 请求的基础 URL。
  - `timeout`: 自动取消请求前的毫秒数。
  - `cache`: 根据 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache) 处理缓存控制。
    - 您可以通过传递布尔值来禁用缓存，或者可以传递以下值之一：`default`、`no-store`、`reload`、`no-cache`、`force-cache` 和 `only-if-cached`。

::note
所有获取选项都可以被赋予一个 `computed` 或 `ref` 值。这些值会被监听，如果有新的值，将自动生成新的请求。
::

- `Options` (来自 [`useAsyncData`](/docs/api/composables/use-async-data)):
  - `key`: 一个唯一的键，以确保数据获取可以跨请求正确地去重，如果不提供，它将根据 URL 和获取选项自动生成。
  - `server`: 是否在服务器上获取数据（默认为 `true`）。
  - `lazy`: 是否在加载路由后解析异步函数，而不是阻塞客户端的导航（默认为 `false`）。
  - `immediate`: 当设置为 `false` 时，将阻止请求立即发起。（默认为 `true`）。
  - `default`: 一个工厂函数，用于设置异步函数解决之前 `data` 的默认值。当 `lazy: true` 或 `immediate: false` 时，这个选项非常有用。（您可以在[这里](/docs/getting-started/data-fetching#watch)看到使用 `watch` 的一个例子）
  - `transform`: 一个函数，用于在异步函数解决后更改 `handler` 函数的结果。
  - `getCachedData`: 提供一个函数，返回缓存的数。返回 `null` 或 `undefined` 值将触发获取。默认情况下，这是一个：`key => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key]`，它仅在启用 `payloadExtraction` 时缓存数据。
  - `pick`: 从 `handler` 函数结果中仅选择此数组中的键。
  - `watch`: 监听一系列响应源，并在它们改变时自动刷新获取结果。默认情况下，请求选项和 URL 被监听。您可以使用 `watch: false` 完全忽略响应源。与 `immediate: false` 一起，这允许您完全手动使用 `useFetch`。
  - `deep`: 返回深度引用对象的数据。默认为 `false`，以便为性能返回浅引用对象中的数据。
  - `dedupe`: 避免在一次时间内对同一键进行更多的请求（默认为 `cancel`）。可能的选项：
    - `cancel` - 当有新请求时，取消现有请求。
    - `defer` - 如果当前有一个待处理的请求，不会做出新的请求。

::note
如果您为 `url` 参数提供了一个函数或 `ref`，或者为 `options` 参数的参数提供了函数，那么 `useFetch` 调用将不会与其他地方代码库中相同的 `useFetch` 调用匹配，即使选项看起来是相同的。如果您希望强制匹配，您可以在 `options` 中提供一个自己的键。
::

::note
如果您在开发中使用 `useFetch` 来调用一个带有自签名证书的外部 HTTPS URL，您需要将 `NODE_TLS_REJECT_UNAUTHORIZED` 设置为 0。
::

::tip{icon="i-simple-icons-youtube" color="gray" to="https://www.youtube.com/watch?v=aQPR0xn-MMk" target="_blank"}
学习如何使用 `transform` 和 `getCachedData` 来避免对 API 的额外调用，并为客户端上的访客缓存数据。
::

## 返回值

- `data`: 异步函数传递的结果。
- `refresh`/`execute`: 一个用于刷新由 `handler` 函数返回的数据的函数。
- `error`: 一个错误对象，如果数据获取失败。
- `status`: 一个字符串，指示数据请求的状态（`"idle"`、`"pending"`、`"success"`、`"error"`）。
- `clear`: 一个函数，将 `data` 设置为 `undefined`，将 `error` 设置为 `null`，将 `status` 设置为 `'idle'`，并将任何当前待处理的请求标记为取消。

默认情况下，Nuxt 会在 `refresh` 执行完毕之前才能再次执行。

::note
如果您没有在服务器上获取数据（例如，使用 `server: false`），那么数据_将不会_在 hydrate 完成后被获取。这意味着即使在客户端上等待 `useFetch`，`data` 在 `<script setup>` 中仍然为 null。
::

## 类型

```ts [Signature]
function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string) | Request,
  options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: string
  method?: string
  query?: SearchParams
  params?: SearchParams
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp) => DataT
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[] | false
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```
