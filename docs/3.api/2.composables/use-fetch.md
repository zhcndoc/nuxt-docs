---
title: 'useFetch'
description: '使用支持 SSR 的组合函数从 API 端点获取数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

此组合函数是对 [`useAsyncData`](/docs/api/composables/use-async-data) 和 [`$fetch`](/docs/api/utils/dollarfetch) 的简洁封装。  
它自动基于 URL 和 fetch 选项生成 key，提供基于服务器路由的请求 URL 类型提示，并推断 API 响应类型。

::note
`useFetch` 是一个组合函数，适用于直接在 setup 函数、插件或路由中间件中调用。它返回响应式组合对象，并处理将响应添加到 Nuxt payload，以便在页面水合时无需在客户端重新获取数据。
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
如果您使用自定义的 useFetch 包裹函数，请不要在组合函数中对其使用 await，这可能会导致意外行为。有关如何制作自定义异步数据获取器的详细信息，请参阅 [此教程](/docs/guide/recipes/custom-usefetch#custom-usefetch)。
::

::note
`data`、`status` 和 `error` 是 Vue 的 ref，需在 `<script setup>` 中通过 `.value` 访问；`refresh`/`execute` 和 `clear` 是普通函数。
::

使用 `query` 选项可以向查询添加搜索参数。该选项基于 [unjs/ofetch](https://github.com/unjs/ofetch)，并使用 [unjs/ufo](https://github.com/unjs/ufo) 创建 URL。对象会自动被序列化为字符串。

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

上例产生的请求地址是 `https://api.nuxt.com/modules?param1=value1&param2=value2`。

你也可以使用 [拦截器](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // 设置请求头
    // 注意，这依赖于 ofetch >= 1.4.0 - 可能需要更新锁文件
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

### 响应式 Key 和共享状态

你可以使用计算属性 ref 或普通 ref 作为 URL，实现基于动态数据的自动更新：

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// 路由变化时，id 更新，数据会自动重新获取
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

多个组件中使用相同 URL 和选项的 `useFetch` 会共享相同的 `data`、`error` 和 `status` ref，确保组件间状态同步。

::warning
`useFetch` 是编译器保留的函数名，不应自定义函数命名为 `useFetch`。
::

::warning
如果从 `useFetch` 解构的 `data` 变量是字符串而非 JSON 解析对象，确保组件中没有导入类似 `import { useFetch } from '@vueuse/core'` 的语句。
::

:video-accordion{title="观看 Alexander Lichter 的视频，避免错误使用 useFetch" videoId="njsGVmcWviY"}

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:read-more{to="/docs/getting-started/data-fetching"}

:link-example{to="/docs/examples/features/data-fetching"}

## 参数

- `URL`: 需要请求的 URL。
- `Options`（继承自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项和 [AsyncDataOptions](/docs/api/composables/use-async-data#params)）:
  - `method`: 请求方法。
  - `query`: 使用 [ufo](https://github.com/unjs/ufo) 向 URL 添加查询参数。
  - `params`: `query` 的别名。
  - `body`: 请求体 - 如果传入对象，会自动序列化。
  - `headers`: 请求头。
  - `baseURL`: 请求的基础 URL。
  - `timeout`: 毫秒数，超过后自动中止请求。
  - `cache`: 按照 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache) 处理缓存控制。
    - 可传布尔值禁用缓存，也可以传以下值之一：`default`, `no-store`, `reload`, `no-cache`, `force-cache`, `only-if-cached`。

::note
所有 fetch 选项都可以使用 `computed` 或 `ref` 值。这些值会被监听，若更新则自动发起新的请求。
::

- `Options`（来自 [`useAsyncData`](/docs/api/composables/use-async-data)）:
  - `key`: 唯一键，保证跨请求去重；若未提供，将基于 URL 和 fetch 选项自动生成。
  - `server`: 是否在服务器端获取数据（默认为 `true`）。
  - `lazy`: 是否延迟在路由加载后解析异步函数，避免阻塞客户端导航（默认为 `false`）。
  - `immediate`: 设置为 `false` 时，阻止立即发送请求（默认为 `true`）。
  - `default`: 工厂函数，用于在异步函数返回前设置 `data` 的默认值，适用于 `lazy: true` 或 `immediate: false`。
  - `transform`: 用于在解析后修改 `handler` 函数结果的函数。
  - `getCachedData`: 提供一个函数返回缓存数据。若返回 `null` 或 `undefined` 则触发请求。默认实现为：
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    只有启用 `nuxt.config` 中 `experimental.payloadExtraction` 时才缓存数据。
  - `pick`: 从 `handler` 函数结果中只选择指定的 key。
  - `watch`: 观察响应式源数组，在变化时自动刷新 fetch 结果。默认观察 fetch 选项和 URL。可以使用 `watch: false` 完全忽略响应式源。和 `immediate: false` 配合可以实现完全手动触发 `useFetch`。（[示例见此](/docs/getting-started/data-fetching#watch)）
  - `deep`: 返回深度响应式的 ref（默认 `true`）。可设为 `false` 以返回浅层响应式的 ref，在数据无需深度响应时提升性能。
  - `dedupe`: 避免同一个 key 发起多次请求（默认为 `cancel`）。可选：
    - `cancel` - 新请求发出时取消已有请求
    - `defer` - 如果已有请求待完成，不发起新请求

::note
如果 `url` 参数是函数或 ref，或 `options` 参数中带有函数，则该 `useFetch` 调用不会与代码中其他调用匹配，即使选项相同。可通过 `options.key` 强制匹配。
::

::note
在开发环境使用 `useFetch` 调用（外部）自签名证书的 HTTPS URL 时，需设置环境变量 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

:video-accordion{title="观看 Alexander Lichter 关于使用 getCachedData 进行客户端缓存的视频" videoId="aQPR0xn-MMk"}

## 返回值

- `data`: 传入的异步函数的结果。
- `refresh`/`execute`: 重新请求 `handler` 函数数据的函数。
- `error`: 请求失败时的错误对象。
- `status`: 字符串，表示请求状态：
  - `idle`：请求尚未开始，比如：
    - `execute` 未调用且设 `immediate: false`
    - 服务器端渲染且设 `server: false`
  - `pending`：请求进行中
  - `success`：请求成功完成
  - `error`：请求失败
- `clear`: 函数，将 `data` 置为 `undefined`，`error` 置为 `null`，`status` 置为 `'idle'`，并取消任何进行中的请求。

默认情况下，Nuxt 会等待一次 `refresh` 完成后才能再次执行。

::note
如果你没有在服务器端获取数据（比如 `server: false`），那么直到水合作用完成之前，数据不会被获取。即使在客户端你等待了 `useFetch`，在 `<script setup>` 内部 `data` 仍然为 null。
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
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[] | false
}

type AsyncDataRequestContext = {
  /** 本次数据请求的原因 */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
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