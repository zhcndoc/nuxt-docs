---
title: 'useAsyncData'
description: useAsyncData 提供对异步解析数据的访问，适用于 SSR 友好的组合式 API。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 useAsyncData 访问异步解析的数据。

::note
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个组合式 API，应该直接在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。它返回响应式组合式 API，并处理将响应添加到 Nuxt 负载中，以便在页面水合时能够从服务器传递到客户端 **而无需在客户端重新获取数据**。
::

## 使用方法

```vue [pages/index.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

::warning
如果你使用自定义的 useAsyncData 封装，请不要在组合式 API 中使用 await，这可能导致意外行为。有关如何创建自定义异步数据获取器的更多信息，请遵循 [这个食谱](/docs/guide/recipes/custom-usefetch#custom-usefetch) 。
::

::note
`data`、`status` 和 `error` 是 Vue refs，在 `<script setup>` 中使用时应该通过 `.value` 来访问，而 `refresh`/`execute` 和 `clear` 是普通函数。
::

### 监视参数

内置的 `watch` 选项允许在检测到任何更改时自动重新运行获取函数。

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
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个被编译器转换的保留函数名，因此你不应该将自己的函数命名为 [`useAsyncData`](/docs/api/composables/use-async-data) 。
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## 参数

- `key`: 确保数据获取可以在请求之间正确去重的唯一键。如果没有提供键，将为您生成一个唯一于 `useAsyncData` 实例的文件名和行号的键。
- `handler`: 一个必须返回真值（例如，它不应该是 `undefined` 或 `null`）的异步函数，否则请求可能在客户端重复。
::warning
`handler` 函数应是 **无副作用** 的，以确保 SSR 和 CSR 水合期间的可预测行为。如果需要触发副作用，请使用 [`callOnce`](/docs/api/utils/call-once) 工具来执行。
::
- `options`:
  - `server`: 是否在服务器上获取数据（默认为 `true`）
  - `lazy`: 是否在加载路由后解析异步函数，而不是阻止客户端导航（默认为 `false`）
  - `immediate`: 设置为 `false` 时，将阻止请求立即触发。（默认为 `true`）
  - `default`: 在异步函数解析之前设置 `data` 的默认值的工厂函数 - 在 `lazy: true` 或 `immediate: false` 选项中很有用
  - `transform`: 一个可以在解析后用来更改 `handler` 函数结果的函数
  - `getCachedData`: 提供一个函数返回缓存数据。返回 `null` 或 `undefined` 将触发获取。默认情况下，这个函数是：
    ```ts
    const getDefaultCachedData = (key, nuxtApp) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    仅在启用 `nuxt.config` 的 `experimental.payloadExtraction` 时缓存数据。
  - `pick`: 仅从 `handler` 函数结果中挑选此数组中的指定键
  - `watch`: 监听响应式源以自动刷新
  - `deep`: 以深层 ref 对象返回数据。默认情况下为 `false`，以为性能返回浅层 ref 对象。
  - `dedupe`: 避免同时多次获取相同的键（默认为 `cancel`）。可能的选项：
    - `cancel` - 当发起新的请求时，取消现有请求
    - `defer` - 如果有待处理的请求，则不发起新的请求

::note
在底层，`lazy: false` 使用 `<Suspense>` 在数据获取之前阻止路由加载。考虑使用 `lazy: true` 并实现加载状态以提供更灵敏的用户体验。
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
你可以使用 `useLazyAsyncData` 来实现与 `useAsyncData` 的 `lazy: true` 相同的行为。
::

:video-accordion{title="Watch a video from Alexander Lichter about client-side caching with getCachedData" videoId="aQPR0xn-MMk"}

## 返回值

- `data`: 传入的异步函数的结果。
- `refresh`/`execute`: 可以用来刷新 `handler` 函数返回的数据的函数。
- `error`: 如果数据获取失败，则为错误对象。
- `status`: 指示数据请求状态的字符串：
  - `idle`: 当请求尚未开始时，例如：
    - 当 `execute` 尚未被调用且设置了 `{ immediate: false }`
    - 当在服务器上渲染 HTML 时并且设置了 `{ server: false }`
  - `pending`: 请求正在进行中
  - `success`: 请求已成功完成
  - `error`: 请求失败
- `clear`: 将 `data` 设置为 `undefined`，将 `error` 设置为 `null`，将 `status` 设置为 `'idle'`，并标记任何当前待处理的请求为已取消。

默认情况下，Nuxt 等待 `refresh` 完成后才能再次执行。

::note
如果您尚未在服务器上获取数据（例如，使用 `server: false`），那么数据_不会_在水合完成之前被获取。这意味着即使您在客户端使用 await [`useAsyncData`](/docs/api/composables/use-async-data)，`data` 在 `<script setup>` 中仍将保持 `null`。
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
  getCachedData?: (key: string, nuxtApp: NuxtApp) => DataT | undefined
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
