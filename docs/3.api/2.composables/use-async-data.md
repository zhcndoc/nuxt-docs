---
title: 'useAsyncData'
description: 使用异步数据提供了对异步数据访问的，在 SSR 友好组合式的访问。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 `useAsyncData` 来获取异步数据。

::note
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个组合式，它旨在在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)中直接调用。它返回响应式组合式，并处理将响应添加到Nuxt payload中，以便在服务器端和客户端之间传递数据**而不会在客户端页面重构时重新获取数据**。
::

## 使用

```vue [pages/index.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

::warning
如果你正在使用自定义的 `useAsyncData` 包装器，请不要在组合式中等待它，因为这可能会导致意外的行为。请遵循 [这个食谱](/docs/guide/recipes/custom-usefetch#custom-usefetch) 获取更多关于如何制作自定义异步数据抓取者的信息。
::

::note
`data`, `status` 和 `error` 是Vue refs，当在 `<script setup>` 中使用时，它们应该通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 是普通函数。
::

### 监视参数

内置的 `watch` 选项允许在检测到任何更改时自动重新运行抓取器函数。

```vue [pages/index.vue]
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  () => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value
    }
  }), {
    watch: [page]
  }
)
</script>
```

::warning
[`useAsyncData`](/docs/api/composables/use-async-data)是一个由编译器转换的保留函数名称，所以你不应该将你的函数命名为 [`useAsyncData`](/docs/api/composables/use-async-data) 。
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## 参数

- `key`: 一个唯一的键，以确保数据抓取可以被正确地消除重复。如果你不提供一个键，那么将为你生成一个唯一的键，它与 `useAsyncData` 的实例的文件名和行号唯一对应。
- `handler`: 一个必须返回一个真实值（例如，它不应该是`undefined`或`null`）的异步函数，否则请求可能在客户端被重复。
::warning
`handler` 函数应该是 **无副作用** 的，以确保在 SSR 和 CSR 水合期间的可预测行为。如果您需要触发副作用，请使用 [`callOnce`](/docs/api/utils/call-once) 工具来实现。
::
- `options`:
  - `server`: 是否在服务器上抓取数据（默认为 `true`）。
  - `lazy`: 是否在加载路由后解析组合式，而不是在客户端导航时阻塞（默认为 `false`）。
  - `immediate`: 当设置为 `false` 时，将防止请求立即发出（默认为 `true`）。
  - `default`: 一个工厂函数，用于设置 `data` 的默认值，在异步函数解决之前 - 当 `lazy: true` 或 `immediate: false` 选项时非常有用。
  - `transform`: 一个函数，可以在异步函数结果解决后用来改变结果。
  - `getCachedData`: 提供一个返回缓存数据的函数。返回值为 `null` 或 `undefined` 将触发获取操作。默认情况下，这是：
    ```ts
    const getDefaultCachedData = (key) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    只有在启用 `nuxt.config` 的 `experimental.payloadExtraction` 时，才会缓存数据。
  - `pick`: 只从这个数组中选择指定的键。
  - `watch`: 观察可变源以自动刷新。
  - `deep`: 返回深引用对象中的数据。 默认情况下为 `false`，以性能为目的以浅引用对象返回数据。
  - `dedupe`: 避免在同一时间重复抓取同一个键（默认为 `cancel`）。可能的选项：
    - `cancel` - 当有新的请求时，取消当前正在进行的请求。
    - `defer` - 如果有一个正在进行的请求，则根本不会发出新的请求。

::note
在后台，`lazy: false` 使用 `<Suspense>` 阻止数据被抓取之前路线的加载。请考虑使用 `lazy: true` 并实现一个加载状态，以提供一个更快的用户体验。
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
你可以使用 `useLazyAsyncData` 来具有与 `lazy: true` 相同的 `useAsyncData` 行为。
::

::tip{icon="i-simple-icons-youtube" color="gray" to="https://www.youtube.com/watch?v=aQPR0xn-MMk" target="_blank"}
学习如何使用 `transform` 和 `getCachedData` 来避免对API的额外调用，并为客户端上的访客缓存数据。
::

## 返回值

- `data`: 传入的异步函数的结果。
- `refresh`/`execute`: 可用于刷新 `handler` 函数返回的数据的函数。
- `error`: 如果数据获取失败，则为错误对象。
- `status`: 表示数据请求状态的字符串：
  - `idle`: 当请求尚未开始时，例如：
    - 当 `execute` 尚未被调用且 `{ immediate: false }` 被设置时
    - 当在服务器上呈现 HTML 并且 `{ server: false }` 被设置时
  - `pending`: 请求正在进行中
  - `success`: 请求已成功完成
  - `error`: 请求失败
- `clear`: 一个函数，将 `data` 设置为 `undefined`，将 `error` 设置为 `null`，将 `status` 设置为 `'idle'`，并将任何当前待处理的请求标记为已取消。

默认情况下，Nuxt 会等待 `refresh` 完成后才能再次执行。

::note
如果你在服务器上没有抓取数据（例如，使用 `server: false`），那么数据将不会在页面重构完成之前被抓取。这意味着，即使你在客户端上等待 [`useAsyncData`](/docs/api/composables/use-async-data)，在 `<script setup>` 中 `data` 仍然保持 `null`。
::

## 类型

```ts [Signature]
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: string,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): Promise<AsyncData<DataT, DataE>>

type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[]
  getCachedData?: (key: string, nuxtApp: NuxtApp) => DataT
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
};

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/getting-started/data-fetching"}
