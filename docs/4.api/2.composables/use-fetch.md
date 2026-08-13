---
title: 'useFetch'
description: '使用对 SSR 友好的可组合函数从 API 端点获取数据。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

这个可组合函数为 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 和 [`$fetch`](/docs/4.x/api/utils/dollarfetch) 提供了一个便捷的封装。
它会自动为请求生成一个 key，根据服务端路由为请求 URL 提供类型提示，并推断 API 响应类型。

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

::tip{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch"}
需要一个带有预定义默认值（如 `baseURL` 或认证请求头）的自定义 `useFetch` 吗？使用 `createUseFetch` 来创建一个完全类型化的自定义可组合函数。
::

::note
你不需要对 `useFetch` 使用 `await`。在服务端，无论哪种写法，Nuxt 都会在渲染前等待 Promise 解析完成，因此返回的 HTML 始终包含数据。`await` 的影响发生在调用之后：使用它时，执行会暂停直到 `data` 被填充，并且客户端路由切换会被阻塞，直到数据准备就绪；不使用它时，执行会立即继续，`data` 会先保持其默认值，直到请求解析完成，并且在客户端路由切换时，你需要使用返回的 `status` 和 `error` refs 自行处理加载和错误状态。这与 [`lazy`](#parameters) 选项的效果类似，不过 `lazy` 是显式选择非阻塞式导航的方式。
::

::note
`data`、`status` 和 `error` 是 Vue refs，在 `<script setup>` 中使用时应通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 则是普通函数。
::

使用 `query` 选项，可以向请求添加查询参数。此选项基于 [unjs/ofetch](https://github.com/unjs/ofetch) 并使用 [unjs/ufo](https://github.com/unjs/ufo) 来构建 URL。对象会被自动序列化为字符串。

```ts [app/pages/index.vue]
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' },
})
```

上述示例将生成 `https://api.nuxt.com/modules?param1=value1&param2=value2`。

你也可以使用 [拦截器](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)：

```ts [app/pages/index.vue]
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest ({ request, options }) {
    // 设置请求头
    // 注意：这取决于 ofetch >= 1.4.0 - 你可能需要刷新锁文件
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

自动生成的 key 对每个调用位置都是唯一的，因此在不同组件中使用相同的 URL 和选项调用 `useFetch` 不会共享状态，每次调用都会执行各自的请求。相同组件的多个实例会共享状态，因为它们使用的是同一个调用位置。要在不同组件之间共享相同的 `data`、`error` 和 `status` refs，请为每次调用提供相同的显式 `key`：

::code-group

```vue [app/components/ComponentA.vue]
<script setup lang="ts">
// 与 ComponentB 共享数据 - 只会发起一次请求
const { data } = await useFetch('/api/random', { key: 'random' })
</script>
```

```vue [app/components/ComponentB.vue]
<script setup lang="ts">
// 与 ComponentA 共享数据 - 只会发起一次请求
const { data } = await useFetch('/api/random', { key: 'random' })
</script>
```

::

::tip  
使用 `useFetch` 创建的带键状态可以通过 [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data) 在整个 Nuxt 应用中检索。  
::

::warning
`useFetch` 是一个被编译器转换的保留函数名，因此你不应将自己的函数命名为 `useFetch`。要创建带预定义选项的自定义变体，请改用 [`createUseFetch`](/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch)。
::

::warning  
如果你发现从 `useFetch` 解构出的 `data` 变量是字符串而不是已解析的 JSON 对象，请确保你的组件没有包含像 `import { useFetch } from '@vueuse/core'` 这样的导入语句。  
::

:video-accordion{title="观看 Alexander Lichter 的视频，避免错误使用 useFetch" videoId="njsGVmcWviY"}

:read-more{to="/docs/4.x/getting-started/data-fetching"}

### 响应式获取选项

获取选项可以是响应式的，支持 `computed`、`ref` 和 [computed getters](https://vue.zhcndoc.com/guide/essentials/computed)。当响应式获取选项更新时，会使用解析后的新值触发重新请求。

```ts [app/pages/index.vue]
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
})
// 触发重新请求: /api/search?q=new%20search
searchQuery.value = 'new search'
```

若需要，你可以通过 `watch: false` 选择关闭此行为：

```ts [app/pages/index.vue]
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
export function useFetch<ResT, ErrorT = NuxtError<unknown>, DataT = ResT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<ResT, DataT>,
): AsyncData<DataT, ErrorT> & Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<ResT, DataT = ResT> = {
  key?: MaybeRefOrGetter<string>
  method?: MaybeRefOrGetter<string>
  query?: MaybeRefOrGetter<SearchParams>
  params?: MaybeRefOrGetter<SearchParams>
  body?: MaybeRefOrGetter<RequestInit['body'] | Record<string, any>>
  headers?: MaybeRefOrGetter<Record<string, string> | [key: string, value: string][] | Headers>
  baseURL?: MaybeRefOrGetter<string>
  cache?: false | 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload'
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  enabled?: MaybeRefOrGetter<boolean>
  serialize?: boolean
  default?: () => DataT | Ref<DataT>
  transform?: (input: ResT) => DataT | Promise<DataT>
  pick?: string[]
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
}

type AsyncDataRequestContext = {
  /** 此次数据请求的原因 */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | undefined>
  pending: Ref<boolean>
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

- `options` (object): 获取请求的配置。扩展自 [unjs/ofetch](https://github.com/unjs/ofetch) 选项和 [`AsyncDataOptions`](/docs/4.x/api/composables/use-async-data#parameters)。所有选项都可以是静态值、`ref` 或计算值。

| 选项                                                                    | 类型                                                                    | 默认值    | 描述                                                                                                                                                                                                                                                                        |
|-------------------------------------------------------------------------|-------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `key`                                                                     | `MaybeRefOrGetter<string>`                                              | auto-gen   | 用于去重的唯一键。如果未提供，则根据 URL、选项和源代码中的调用位置生成。                                                                                                                                                         |
| `method`                                                                  | `MaybeRefOrGetter<string>`                                              | `'GET'`    | HTTP 请求方法。                                                                                                                                                                                                                                                               |
| `query`                                                                   | `MaybeRefOrGetter<SearchParams>`                                        | -          | 要附加到 URL 的查询/搜索参数。别名：`params`。                                                                                                                                                                                                                         |
| `params`                                                                  | `MaybeRefOrGetter<SearchParams>`                                        | -          | `query` 的别名。                                                                                                                                                                                                                                                                 |
| `body`                                                                    | `MaybeRefOrGetter<RequestInit['body'] \| Record<string, any>>`          | -          | 请求体。对象会自动进行字符串化。                                                                                                                                                                                                                               |
| `headers`                                                                 | `MaybeRefOrGetter<Record<string, string> \| [key, value][] \| Headers>` | -          | 请求标头。                                                                                                                                                                                                                                                                   |
| `baseURL`                                                                 | `MaybeRefOrGetter<string>`                                              | -          | 请求的基础 URL。                                                                                                                                                                                                                                                          |
| `cache`                                                                   | `false \| string`                                                       | -          | 缓存控制。布尔值会禁用缓存，或使用 Fetch API 的值：`default`、`no-store` 等。                                                                                                                                                                                        |
| `server`                                                                  | `boolean`                                                               | `true`     | 是否在服务器上获取。                                                                                                                                                                                                                                                    |
| `lazy`                                                                    | `boolean`                                                               | `false`    | 如果为 true，则在路由加载后解析（不会阻塞导航）。                                                                                                                                                                                                                   |
| `immediate`                                                               | `boolean`                                                               | `true`     | 如果为 false，则阻止请求立即发起。                                                                                                                                                                                                                                |
| `default`                                                                 | `() => DataT`                                                           | -          | 在异步解析完成前为 `data` 提供默认值的工厂函数。                                                                                                                                                                                                                         |
| `timeout` :badge[v4.2]{color="info" size="xs" class="align-middle"}       | `number`                                                                | -          | 等待请求超时的毫秒数（默认为 `undefined`，表示无超时）                                                                                                                                                                   |
| `transform`                                                               | `(input: DataT) => DataT \| Promise<DataT>`                             | -          | 在解析完成后转换结果的函数。                                                                                                                                                                                                                                  |
| `getCachedData` :badge[v3.8]{color="info" size="xs" class="align-middle"} | `(key, nuxtApp, ctx) => DataT \| undefined`                             | -          | 返回缓存数据的函数。默认实现见下文。                                                                                                                                                                                                                             |
| `pick`                                                                    | `string[]`                                                              | -          | 仅从结果中选取指定的键。                                                                                                                                                                                                                                          |
| `watch`                                                                   | `MultiWatchSources \| false`                                            | -          | 要监听并自动刷新的响应式源数组。`false` 会禁用监听。                                                                                                                                                                                                    |
| `deep` :badge[v3.8]{color="info" size="xs" class="align-middle"}          | `boolean`                                                               | `false`    | 在深层 ref 对象中返回数据。默认为 `false`，以提升性能（浅层 ref 对象）。                                                                                                                                                                               |
| `dedupe` :badge[v3.9]{color="info" size="xs" class="align-middle"}        | `'cancel' \| 'defer'`                                                   | `'cancel'` | 避免同时多次获取相同的键。                                                                                                                                                                                                                                  |
| `enabled` :badge[v4.5]{color="info" size="xs" class="align-middle"}       | `boolean`                                                               | `true`     | 控制请求是否可以运行的屏障。当为 `false` 时，每次执行都会被阻止（初始获取、`execute`/`refresh` 以及监听触发），并且从 `true` → `false` 时会取消正在进行的请求，但不会清除 `data`。重新启用不会自行重新获取。 |
| `serialize` :badge[v4.6]{color="info" size="xs" class="align-middle"}     | `boolean`                                                               | `true`     | 是否将已解析的数据存储在 Nuxt payload（`__NUXT_DATA__`）中。当为 `false` 时，服务器获取的数据不会放入 payload，并且如果组件渲染该数据，客户端会在 hydration 后重新获取。搭配 [lazy hydration](/docs/4.x/guide/best-practices/performance#lazy-hydration) 使用，以避免 hydration 不匹配和不必要的客户端获取。 |
| `$fetch` :badge[v3.2]{color="info" size="xs" class="align-middle"}        | `typeof globalThis.$fetch`                                              | -          | 自定义 `$fetch` 实现。请参阅 [Custom useFetch in Nuxt](/docs/4.x/guide/recipes/custom-usefetch)                                                                                                                                                                               |

::note
所有 fetch 选项都可以传入 `computed` 或 `ref` 值。它们会被监听，并且在更新时自动使用新值发起新的请求（除非将 `watch` 设为 `false`）。
::

**getCachedData 默认实现：**

```ts [Default getCachedData Implementation]
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
仅当在 `nuxt.config` 中启用 `experimental.payloadExtraction` 时，此缓存行为才生效。

## 返回值

这个可组合函数会返回一个可 `await` 的 `Promise`，这使得可以在 `<script setup>` 中直接使用 `data`（也就是说，会有一个值，而不是 `undefined`）。你也可以不等待返回值而直接解构这些值，在这种情况下，在获取完成之前，`<script setup>` 中的 `data` 可能会是 `undefined`。

::tip
即使你没有 `await` 返回值，在 SSR 期间，Nuxt 也会等待请求完成，并将解析后的数据发送到客户端。
::

::note
如果你没有在服务端获取数据（例如使用 `server: false`），那么数据 _不会_ 在 hydration 完成之前被获取。这意味着即使你在客户端 `await` `useFetch`，`<script setup>` 中的 `data` 仍然会是 `undefined`。
::

| 名称      | 类型                                                | 描述                                                                                                                                                       |
|-----------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 异步获取的结果。                                                                                                                             |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 手动刷新数据的函数。默认情况下，Nuxt 会等待一次 `refresh` 完成后，才能再次执行。                                      |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。                                                                                                                                              |
| `error`   | `Ref<ErrorT \| undefined>`                          | 如果数据获取失败，则为错误对象。                                                                                                                         |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 数据请求的状态。用于区分 `idle`、`pending`、`success` 和 `error`。                                                                      |
| `pending` | `Ref<boolean>`                                      | 请求进行期间为 `true`。配合 [`experimental.pendingWhenIdle`](/docs/4.x/guide/going-further/experimental-features#pendingwhenidle) 使用时，当 `status` 为 `idle` 且没有可用的缓存数据时，它也会为 `true`。 |
| `clear`   | `() => void`                                        | 将 `data` 重置为 `undefined`（或 `options.default()` 的值，如果有提供的话），将 `error` 重置为 `undefined`，将 `status` 设为 `idle`，并取消任何待处理的请求。 |

::tip
如果你没有 `await` 返回值，那么可以安全地解构 `Promise` 上的函数（`then`、`catch` 和 `finally`）。
::

### 状态值

- `idle`: 请求尚未开始（例如 `{ immediate: false }` 或在服务端渲染时 `{ server: false }`）
- `pending`: 请求进行中
- `success`: 请求成功完成
- `error`: 请求失败

### 示例

:link-example{to="/docs/4.x/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/4.x/examples/features/data-fetching"}
