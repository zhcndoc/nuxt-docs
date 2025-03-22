---
title: 'useFetch'
description: '使用一个适合服务器端渲染的组合函数从 API 端点获取数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

这个组合函数提供了一个方便的封装，基于 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`$fetch`](/docs/api/utils/dollarfetch)。
它根据 URL 和获取选项自动生成一个键，为基于服务器路由的请求 URL 提供类型提示，并推断 API 响应的类型。

::note
`useFetch` 是一个组合函数，旨在直接在设置函数、插件或路由中间件中调用。它返回响应式组合函数，并处理将响应添加到 Nuxt 有效负载中，以便在页面加载时可以将其从服务器传递到客户端，而无需在客户端重新获取数据。
::

## 使用方法

```vue [pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title']
})
</script>
```

::warning
如果你正在使用自定义的 useFetch 封装，切勿在组合函数中等待它，因为这可能导致意外行为。请遵循 [这个食谱](/docs/guide/recipes/custom-usefetch#custom-usefetch) 获取关于如何创建自定义异步数据获取器的更多信息。
::

::note
`data`、`status` 和 `error` 是 Vue refs，在 `<script setup>` 中使用时应通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 是普通函数。
::

使用 `query` 选项，您可以向查询添加搜索参数。此选项是从 [unjs/ofetch](https://github.com/unjs/ofetch) 扩展而来的，并使用 [unjs/ufo](https://github.com/unjs/ufo) 创建 URL。对象会被自动字符串化。

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

上述示例的结果是 `https://api.nuxt.com/modules?param1=value1&param2=value2`。

您还可以使用 [拦截器](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // 设置请求头
    // 注意这依赖于 ofetch >= 1.4.0 - 你可能需要刷新你的锁定文件
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
`useFetch` 是一个被编译器保留的函数名称，因此你不应将自己的函数命名为 `useFetch`。
::

::warning
如果你发现 `useFetch`  destructed 的 `data` 变量返回一个字符串而不是解析后的 JSON 对象，那么请确保你的组件没有包含像 `import { useFetch } from '@vueuse/core'` 的导入语句。
::

::tip{icon="i-lucide-video" to="https://www.youtube.com/watch?v=njsGVmcWviY" target="_blank"}
观看 Alexander Lichter 的视频，避免错误使用 `useFetch`！
::

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:read-more{to="/docs/getting-started/data-fetching"}

:link-example{to="/docs/examples/features/data-fetching"}

## 参数

- `URL`: 要获取的 URL。
- `Options`（扩展自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项 & [AsyncDataOptions](/docs/api/composables/use-async-data#params)）：
  - `method`: 请求方法。
  - `query`: 使用 [ufo](https://github.com/unjs/ufo) 向 URL 添加查询搜索参数。
  - `params`: `query` 的别名。
  - `body`: 请求体 - 会自动字符串化（如果传递了对象）。
  - `headers`: 请求头。
  - `baseURL`: 请求的基本 URL。
  - `timeout`: 自动中止请求的毫秒数。
  - `cache`: 根据 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache) 处理缓存控制。
    - 你可以传递布尔值以禁用缓存，或者可以传递以下值之一：`default`、`no-store`、`reload`、`no-cache`、`force-cache` 和 `only-if-cached`。

::note
所有获取选项都可以给定一个 `computed` 或 `ref` 值。如果它们被更新，这些将被观察到，并且会自动发出新的请求。
::

- `Options`（来自 [`useAsyncData`](/docs/api/composables/use-async-data)）：
  - `key`: 一个唯一键，确保数据获取可以在请求间正确去重，如果没有提供，它将基于 URL 和获取选项自动生成。
  - `server`: 是否在服务器上获取数据（默认值为 `true`）。
  - `lazy`: 是否在加载路由后解析异步函数，而不是阻塞客户端导航（默认值为 `false`）。
  - `immediate`: 设置为 `false` 时，将阻止请求立即发出。（默认值为 `true`）。
  - `default`: 一个工厂函数，用于在异步函数解析之前设置 `data` 的默认值 - 适用于 `lazy: true` 或 `immediate: false` 选项。
  - `transform`: 一个函数，可以在解析后用于更改 `handler` 函数结果。
  - `getCachedData`: 提供一个返回缓存数据的函数。返回值为 `null` 或 `undefined` 将触发获取。默认值为：
    ```ts
    const getDefaultCachedData = (key, nuxtApp) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    这只有在启用了 `nuxt.config` 的 `experimental.payloadExtraction` 时才会缓存数据。
  - `pick`: 从 `handler` 函数结果中仅挑选此数组中指定的键。
  - `watch`: 观察一组响应式源，当它们改变时自动刷新获取结果。默认情况下，会观察获取选项和 URL。你可以通过使用 `watch: false` 完全忽略响应式源。结合 `immediate: false`，这允许进行完全手动的 `useFetch`。（你可以 [在这里查看示例](/docs/getting-started/data-fetching#watch) 用于使用 `watch`。）
  - `deep`: 以深度 ref 对象返回数据。默认值为 `false`，以便为性能返回浅层 ref 对象。
  - `dedupe`: 避免在同一时间获取同一键不超过一次（默认值为 `cancel`）。可能的选项：
    - `cancel` - 当发出新请求时取消现有请求。
    - `defer` - 如果有待处理的请求，则不发出新的请求。

::note
如果你提供一个函数或 ref 作为 `url` 参数，或者如果你向 `options` 参数提供函数作为参数，则 `useFetch` 调用将不会与代码库中其他地方的 `useFetch` 调用匹配，即使选项似乎相同。如果你希望强制匹配，可以在 `options` 中提供自己的键。
::

::note
如果你使用 `useFetch` 来调用开发中具有自签名证书的（外部）HTTPS URL，您需要在您的环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

::tip{icon="i-simple-icons-youtube" to="https://www.youtube.com/watch?v=aQPR0xn-MMk" target="_blank"}
了解如何使用 `transform` 和 `getCachedData` 避免对 API 进行多余的调用，并为客户缓存数据。
::

## 返回值

- `data`: 传入的异步函数的结果。
- `refresh`/`execute`: 可以用来刷新 `handler` 函数返回的数据的函数。
- `error`: 如果数据获取失败，则返回一个错误对象。
- `status`: 表示数据请求状态的字符串：
  - `idle`: 当请求尚未开始时，例如：
    - 当 `execute` 尚未被调用，并且设置了 `{ immediate: false }`。
    - 当在服务器上渲染 HTML 并且设置了 `{ server: false }`。
  - `pending`: 请求正在进行中。
  - `success`: 请求已成功完成。
  - `error`: 请求失败。
- `clear`: 一个将 `data` 设置为 `undefined`，将 `error` 设置为 `null`，将 `status` 设置为 `'idle'` 的函数，并标记任何当前待处理的请求为已取消。

默认情况下，Nuxt 等待 `refresh` 完成后才能再次执行。

::note
如果您在服务器上没有获取数据（例如，使用 `server: false`），那么数据 _不会_ 在水合完成之前获取。这意味着即使你在客户端等待 `useFetch`，在 `<script setup>` 中，`data` 将保持为 null。
::

## 类型

```ts [Signature]
function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
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
  getCachedData?: (key: string, nuxtApp: NuxtApp) => DataT | undefined
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