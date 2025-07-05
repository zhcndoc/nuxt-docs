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

### 响应式键和共享状态

您可以使用计算属性引用或普通引用作为 URL，允许动态数据获取，并在 URL 更改时自动更新：

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// 当路由变化和 ID 更新时，数据将会自动重新获取。
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

在多个组件中使用相同的 URL 和选项时，`useFetch` 将共享相同的 `data`、`error` 和 `status` 引用。这确保了组件之间的一致性。

::warning
`useFetch` 是一个被编译器保留的函数名称，因此你不应将自己的函数命名为 `useFetch`。
::

::warning
如果你发现 `useFetch`  destructed 的 `data` 变量返回一个字符串而不是解析后的 JSON 对象，那么请确保你的组件没有包含像 `import { useFetch } from '@vueuse/core'` 的导入语句。
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
  /** 请求数据的原因 */
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
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

## 参数说明

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): 需要获取的 URL 或请求。可以是字符串、Request 对象、Vue 的 ref，或返回字符串/Request 的函数。支持响应式，以便动态端点。

- `options` (对象): 获取请求的配置。继承自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项和 [`AsyncDataOptions`](/docs/api/composables/use-async-data#params)。所有选项都可以是静态值、`ref` 或计算属性。

| 选项 | 类型 | 默认 | 描述 |
| ---| --- | --- | --- |
| `key` | `MaybeRefOrGetter<string>` | 自动生成 | 唯一键用于去重。如果未提供，将基于 URL 和选项自动生成。 |
| `method` | `string` | `'GET'` | HTTP 请求方法。 |
| `query` | `object` | - | 查询参数，附加到 URL 上。别名：`params`。支持 refs/计算属性。 |
| `params` | `object` | - | `query` 的别名。 |
| `body` | `RequestInit['body'] \| Record<string, any>` | - | 请求体。对象会自动序列化。支持 refs/计算属性。 |
| `headers` | `Record<string, string> \| [key, value][] \| Headers` | - | 请求头。 |
| `baseURL` | `string` | - | 请求的基础 URL。 |
| `timeout` | `number` | - | 毫秒数，超过则中止请求。 |
| `cache` | `boolean \| string` | - | 缓存控制。布尔值关闭缓存，或使用 Fetch API 支持的值：`default`、`no-store` 等。 |
| `server` | `boolean` | `true` | 是否在服务器端执行请求。 |
| `lazy` | `boolean` | `false` | 若为 true，则在路由加载后解析（不会阻塞导航）。 |
| `immediate` | `boolean` | `true` | 若为 false，阻止立即发起请求。 |
| `default` | `() => DataT` | - | 在异步完成前提供 `data` 的默认值工厂函数。 |
| `transform` | `(input: DataT) => DataT \| Promise<DataT>` | - | 解析结果后进行转换的函数。 |
| `getCachedData`| `(key, nuxtApp, ctx) => DataT \| undefined` | - | 用于返回缓存数据的函数。见下文默认实现。 |
| `pick` | `string[]` | - | 只选择结果中的指定键。 |
| `watch` | `MultiWatchSources \| false` | - | 响应式源数组，用于监听并自动刷新。设置为 `false` 可禁用监听。 |
| `deep` | `boolean` | `false` | 数据以深度响应式对象返回。 |
| `dedupe` | `'cancel' \| 'defer'` | `'cancel'` | 避免对相同 key 同时发起重复请求。 |
| `$fetch` | `typeof globalThis.$fetch` | - | 自定义的 $fetch 实现。 |

::note
所有获取选项均可使用计算属性或 ref 值。这些值会被监听，更新时会自动发起新请求。
::

**getCachedData 默认实现：**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
 ? nuxtApp.payload.data[key] 
 : nuxtApp.static.data[key]
```
此缓存仅在 `nuxt.config` 中启用 `experimental.payloadExtraction` 时生效。

## 返回值

| 名称 | 类型 | 描述 |
| --- | --- |--- |
| `data` | `Ref<DataT \| undefined>` | 异步获取结果。 |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 手动刷新数据的函数。默认情况下，Nuxt 会等待刷新完成后才能再次执行刷新。 |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。 |
| `error` | `Ref<ErrorT \| undefined>` | 如果数据获取失败，包含错误对象。 |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | 数据请求的状态。请见下方状态说明。 |
| `clear` | `() => void` | 重置 `data` 为 `undefined`（或 `options.default()` 的返回值）、`error` 为 `undefined`，将状态设为 `idle`，并取消任何挂起的请求。 |

### 状态说明

- `idle`: 请求未开始（例如 `{ immediate: false }` 或服务器渲染时 `{ server: false }`）
- `pending`: 请求进行中
- `success`: 请求成功完成
- `error`: 请求失败

::note
如果你在服务器端没有获取数据（例如设置了 `server: false`），那么数据不会被立即获取，直到 hydration 完成。这意味着即使你在客户端使用 `await useFetch`，`data` 在 `<script setup>` 中仍然可能是 null。
::

### 示例

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/examples/features/data-fetching"}