---
title: 'useFetch'
description: '使用对 SSR 友好的可组合函数从 API 端点获取数据。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

这个可组合函数提供了对 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 和 [`$fetch`](/docs/4.x/api/utils/dollarfetch) 的便捷封装。
它会基于 URL 和请求选项自动生成一个键，为基于服务器路由的请求 URL 提供类型提示，并推断 API 响应类型。

::note
`useFetch` 是一个应直接在 setup 函数、插件或路由中间件中调用的可组合函数。它返回响应式的可组合对象，并负责将响应添加到 Nuxt payload 中，以便在页面从服务器到客户端传递时，页面在水合（hydrate）时无需在客户端重新获取数据。
::

## 用法

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title'],
})
</script>
```

::warning{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetchuseasyncdata"}
如果你正在使用自定义的 `useFetch` 封装，不要在可组合函数中对其进行 await，因为这可能会导致意外行为。请参阅自定义异步数据获取器的用法示例。
::

::note
`data`、`status` 和 `error` 是 Vue 的 ref，在 `<script setup>` 中使用时应通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 则是普通函数。
::

使用 `query` 选项，可以向请求添加查询参数。此选项基于 [unjs/ofetch](https://github.com/unjs/ofetch) 并使用 [unjs/ufo](https://github.com/unjs/ufo) 来构建 URL。对象会被自动序列化为字符串。

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' },
})
```

上述示例将生成 `https://api.nuxt.com/modules?param1=value1&param2=value2`。

你也可以使用 [拦截器](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest ({ request, options }) {
    // 设置请求头
    // 注意：这依赖于 ofetch >= 1.4.0 - 你可能需要刷新锁文件
    options.headers.set('Authorization', '...')
  },
  onRequestError ({ request, options, error }) {
    // 处理请求错误
  },
  onResponse ({ request, response, options }) {
    // 处理响应数据
    localStorage.setItem('token', response._data.token)
  },
  onResponseError ({ request, response, options }) {
    // 处理响应错误
  },
})
```

### 响应式键与共享状态

你可以将 URL 作为 computed ref 或普通 ref 使用，从而实现动态数据获取，当 URL 发生变化时会自动更新：

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// 当路由变化并且 id 更新时，数据将被自动重新获取
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

当在多个组件中使用相同的 URL 和选项调用 `useFetch` 时，它们将共享相同的 `data`、`error` 和 `status` refs。这可确保组件间的一致性。

::tip
使用 `useFetch` 创建的带键状态可以通过 [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data) 在整个 Nuxt 应用中检索。
::

::warning
`useFetch` 是由编译器转换的保留函数名，因此你不应将自己的函数命名为 `useFetch`。
::

::warning
如果你发现从 `useFetch` 解构出的 `data` 变量是字符串而不是已解析的 JSON 对象，请确保你的组件没有包含像 `import { useFetch } from '@vueuse/core'` 这样的导入语句。
::

:video-accordion{title="观看 Alexander Lichter 的视频，避免错误使用 useFetch" videoId="njsGVmcWviY"}

:read-more{to="/docs/4.x/getting-started/data-fetching"}

### 响应式获取选项

获取选项可以是响应式的，支持 `computed`、`ref` 和 [computed getters](https://vue.zhcndoc.com/guide/essentials/computed)。当响应式获取选项更新时，会使用解析后的新值触发重新请求。

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
})
// 触发重新请求: /api/search?q=new%20search
searchQuery.value = 'new search'
```

若需要，你可以通过 `watch: false` 选择关闭此行为：

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
  watch: false,
})
// 不会触发重新请求
searchQuery.value = 'new search'
```

## 类型

```ts [Signature]
export function useFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: MaybeRefOrGetter<string>
  method?: MaybeRefOrGetter<string>
  query?: MaybeRefOrGetter<SearchParams>
  params?: MaybeRefOrGetter<SearchParams>
  body?: MaybeRefOrGetter<RequestInit['body'] | Record<string, any>>
  headers?: MaybeRefOrGetter<Record<string, string> | [key: string, value: string][] | Headers>
  baseURL?: MaybeRefOrGetter<string>
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
  timeout?: MaybeRefOrGetter<number>
}

type AsyncDataRequestContext = {
  /** The reason for this data request */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | undefined>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | undefined>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  signal?: AbortSignal
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

## 参数

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): 要获取的 URL 或请求。可以是字符串、Request 对象、Vue ref，或返回字符串/Request 的函数。支持响应式以实现动态端点。

- `options` (对象): 请求的配置。扩展自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项和 [`AsyncDataOptions`](/docs/4.x/api/composables/use-async-data#params)。所有选项都可以是静态值、`ref` 或计算属性。

| Option          | Type                                                                    | Default    | Description                                                                                                      |
|-----------------|-------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------|
| `key`           | `MaybeRefOrGetter<string>`                                              | auto-gen   | 去重的唯一键。如果未提供，将从 URL 和选项生成。                                  |
| `method`        | `MaybeRefOrGetter<string>`                                              | `'GET'`    | HTTP 请求方法。                                                                                             |
| `query`         | `MaybeRefOrGetter<SearchParams>`                                        | -          | 要附加到 URL 的查询/搜索参数。别名：`params`。                                                       |
| `params`        | `MaybeRefOrGetter<SearchParams>`                                        | -          | `query` 的别名。                                                                                               |
| `body`          | `MaybeRefOrGetter<RequestInit['body'] \| Record<string, any>>`          | -          | 请求体。对象会被自动序列化为字符串。                                                             |
| `headers`       | `MaybeRefOrGetter<Record<string, string> \| [key, value][] \| Headers>` | -          | 请求头。                                                                                                 |
| `baseURL`       | `MaybeRefOrGetter<string>`                                              | -          | 请求的基础 URL。                                                                                        |
| `timeout`       | `MaybeRefOrGetter<number>`                                              | -          | 以毫秒为单位的超时，用于中止请求。                                                                    |
| `cache`         | `boolean \| string`                                                     | -          | 缓存控制。布尔值表示禁用缓存，或使用 Fetch API 的值：`default`、`no-store` 等。                      |
| `server`        | `boolean`                                                               | `true`     | 是否在服务器上获取。                                                                                  |
| `lazy`          | `boolean`                                                               | `false`    | 如果为 true，则在路由加载后解析（不会阻塞导航）。                                                 |
| `immediate`     | `boolean`                                                               | `true`     | 如果为 false，则阻止请求立即触发。                                                              |
| `default`       | `() => DataT`                                                           | -          | 在异步解析前为 `data` 提供默认值的工厂函数。                                                       |
| `timeout`       | `number`                                                                | -          | 超时的毫秒数，等待请求超时（默认为 `undefined`，这意味着没有超时） |
| `transform`     | `(input: DataT) => DataT \| Promise<DataT>`                             | -          | 在结果解析后用于转换结果的函数。                                                                |
| `getCachedData` | `(key, nuxtApp, ctx) => DataT \| undefined`                             | -          | 返回缓存数据的函数。见下方默认实现。                                                           |
| `pick`          | `string[]`                                                              | -          | 仅从结果中选择指定键。                                                                        |
| `watch`         | `MultiWatchSources \| false`                                            | -          | 要监听并自动刷新的一组响应式源。`false` 禁用监听。                                  |
| `deep`          | `boolean`                                                               | `false`    | 将数据以深层 ref 对象返回。                                                                                |
| `dedupe`        | `'cancel' \| 'defer'`                                                   | `'cancel'` | 避免在同一时间多次为相同键发起请求。                                                                |
| `$fetch`        | `typeof globalThis.$fetch`                                              | -          | 自定义的 $fetch 实现。见 [Nuxt 中的自定义 useFetch](/docs/4.x/guide/recipes/custom-usefetch)             |

::note
所有 fetch 选项都可以是 `computed` 或 `ref` 值。当它们被更新时，会被监听并自动使用新值发起请求。
::

**getCachedData 默认实现：**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
仅当在 `nuxt.config` 中启用 `experimental.payloadExtraction` 时，此缓存行为才生效。

## 返回值

| Name      | Type                                                | Description                                                                                                                                                       |
|-----------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 异步 fetch 的结果。                                                                                                                             |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 手动刷新数据的函数。默认情况下，Nuxt 在一次 `refresh` 完成前不会再次执行它。                                      |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。                                                                                                                                              |
| `error`   | `Ref<ErrorT \| undefined>`                          | 数据获取失败时的错误对象。                                                                                                                         |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 数据请求的状态。可能值见下文。                                                                                                        |
| `clear`   | `() => void`                                        | 将 `data` 重置为 `undefined`（如果提供了 `options.default()` 则重置为其值）、将 `error` 重置为 `undefined`、将 `status` 设为 `idle`，并取消任何挂起的请求。 |

### 状态值

- `idle`: 请求尚未开始（例如 `{ immediate: false }` 或在服务端渲染时 `{ server: false }`）
- `pending`: 请求进行中
- `success`: 请求成功完成
- `error`: 请求失败

::note
如果你没有在服务器上获取数据（例如使用了 `server: false`），那么数据将在水合完成之前不会被获取。这意味着即使你在客户端对 `useFetch` 使用了 await，在 `<script setup>` 中 `data` 仍将保持为空。
::

### 示例

:link-example{to="/docs/4.x/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/4.x/examples/features/data-fetching"}
