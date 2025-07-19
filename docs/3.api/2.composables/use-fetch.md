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

:read-more{to="/docs/getting-started/data-fetching"}

## 类型

```ts [Signature]
function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: MaybeRefOrGetter<string>
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
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
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
## 参数

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): 要请求的 URL 或请求对象。可以是字符串、Request 对象、Vue ref，或返回字符串/Request 的函数。支持响应式用于动态接口。

- `options` (对象): 请求配置，扩展自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项和 [`AsyncDataOptions`](/docs/api/composables/use-async-data#params)。所有选项均可为静态值、ref 或计算属性。

| 选项 | 类型 | 默认值 | 说明 |
| ---| --- | --- | --- |
| `key` | `MaybeRefOrGetter<string>` | 自动生成 | 用于去重的唯一键，如不提供则从 URL 和配置自动生成。 |
| `method` | `string` | `'GET'` | HTTP 请求方法。 |
| `query` | `object` | - | 追加至 URL 的查询参数。别名：`params`。支持 ref/计算属性。 |
| `params` | `object` | - | `query` 的别名。 |
| `body` | `RequestInit['body'] \| Record<string, any>` | - | 请求体，支持对象自动序列化字符串。支持 ref/计算属性。 |
| `headers` | `Record<string, string> \| [key, value][] \| Headers` | - | 请求头配置。 |
| `baseURL` | `string` | - | 请求的基础 URL。 |
| `timeout` | `number` | - | 请求超时时间，毫秒。 |
| `cache` | `boolean \| string` | - | 缓存控制。布尔值禁用缓存，或使用 Fetch API 规定的缓存策略，如 `default`、`no-store` 等。 |
| `server` | `boolean` | `true` | 是否在服务器端请求。 |
| `lazy` | `boolean` | `false` | 若为 true，则请求会延迟至路由加载后（不会阻塞导航）。 |
| `immediate` | `boolean` | `true` | 若为 false，禁止请求立即发送。 |
| `default` | `() => DataT` | - | 异步完成前 `data` 的默认值工厂函数。 |
| `transform` | `(input: DataT) => DataT \| Promise<DataT>` | - | 异步请求完成后对结果的转换函数。 |
| `getCachedData`| `(key, nuxtApp, ctx) => DataT \| undefined` | - | 返回缓存数据的函数，详见下文默认实现。 |
| `pick` | `string[]` | - | 从结果中仅选取指定字段。 |
| `watch` | `MultiWatchSources \| false` | - | 监听的响应式源数组，变化时自动刷新。`false` 禁用监听。 |
| `deep` | `boolean` | `false` | 返回的 `data` 是否为深度响应式。 |
| `dedupe` | `'cancel' \| 'defer'` | `'cancel'` | 避免同 key 的重复请求行为。 |
| `$fetch` | `typeof globalThis.$fetch` | - | 自定义的 $fetch 实现。 |

::note
所有的 fetch 选项均支持传入 `computed` 或 `ref`，会自动监听变化并触发新的请求。
::

**getCachedData 默认实现：**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
 ? nuxtApp.payload.data[key] 
 : nuxtApp.static.data[key]
```
仅当 `nuxt.config` 中启用 `experimental.payloadExtraction` 时生效缓存。

## 返回值

| 名称 | 类型 | 说明 |
| --- | --- |--- |
| `data` | `Ref<DataT \| undefined>` | 异步请求结果数据。 |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 手动刷新数据的方法。默认情况下，刷新请求完成之前会阻止再次执行。 |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。 |
| `error` | `Ref<ErrorT \| undefined>` | 请求失败时的错误对象。 |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | 请求状态。详见下文可能值。 |
| `clear` | `() => void` | 重置 `data` 为 `undefined`（或者 `options.default()` 的值）、`error` 为 `null`，状态设为 `idle` 并取消所有挂起请求。 |

### 状态值

- `idle`：请求尚未开始（例如 `{ immediate: false }` 或服务器渲染时 `{ server: false }`）
- `pending`：请求正在进行中
- `success`：请求成功完成
- `error`：请求失败

::note
如果服务器端没有预先请求数据（例如 `server: false`），那么直到页面完成水合，数据才会被请求。这意味着即使客户端 await 了 `useFetch`，在 `<script setup>` 中 `data` 依旧会是 null。
::

### 示例

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/examples/features/data-fetching"}