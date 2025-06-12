---
title: 'useAsyncData'
description: useAsyncData 提供了一个 SSR 友好的组合式函数，用于访问异步解析的数据。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 useAsyncData 访问异步解析的数据。

::note
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个组合式函数，旨在直接在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中调用。它返回响应式的组合式函数并处理将响应添加到 Nuxt 负载中，使其能够从服务器传递到客户端，**在页面水合时不会重新在客户端获取数据**。
::

## 用法

```vue [pages/index.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

::warning
如果你正在使用自定义的 useAsyncData 包装器，请勿在组合式函数中对其加 await，因为这可能导致意外行为。请参考[此示例](/docs/guide/recipes/custom-usefetch#custom-usefetch)了解如何制作自定义的异步数据获取器。
::

::note
`data`、`status` 和 `error` 是 Vue 的 ref，使用时需要通过 `.value` 访问（比如在 `<script setup>` 中），而 `refresh`/`execute` 和 `clear` 是普通函数。
::

### 监听参数

内置的 `watch` 选项允许在检测到任何变化时自动重新执行获取函数。

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

### 响应式键

你可以使用计算属性 ref、普通 ref 或 getter 函数作为键，允许动态数据获取，并在键变化时自动更新：

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// 当路由变化且 userId 更新时，数据会自动重新获取
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id)
)
</script>
```

::warning
[`useAsyncData`](/docs/api/composables/use-async-data) 是编译器保留的函数名，所以你不应该将自定义函数命名为 [`useAsyncData`](/docs/api/composables/use-async-data)。
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## 参数

- `key`：唯一键，确保在请求间正确去重数据获取。如果不提供，系统会为 `useAsyncData` 实例生成基于文件名和行号的唯一键。
- `handler`：异步函数，必须返回真值（例如，不应返回 `undefined` 或 `null`），否则客户端可能会重复请求数据。
::warning
`handler` 函数应**无副作用**以确保 SSR 和客户端水合期间行为可预测。如果你需要触发副作用，请使用 [`callOnce`](/docs/api/utils/call-once) 工具实现。
::
- `options`:
  - `server`：是否在服务器上获取数据（默认为 `true`）
  - `lazy`：是否在路由加载后才解析异步函数，从而不阻塞客户端导航（默认为 `false`）
  - `immediate`：设置为 `false` 时，将阻止请求立即触发（默认为 `true`）
  - `default`：工厂函数，在异步函数解析前设置 `data` 的默认值——在使用 `lazy: true` 或 `immediate: false` 时很有用
  - `transform`：用于在解析后改变 `handler` 函数结果的函数
  - `getCachedData`：提供一个函数返回缓存数据。返回 `null` 或 `undefined` 时会触发请求。默认实现为：
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    该默认实现只有在 `nuxt.config` 启用 `experimental.payloadExtraction` 时才缓存数据。
  - `pick`：仅从 `handler` 函数结果中提取该数组指定的键
  - `watch`：监听响应式源以自动刷新
  - `deep`：使用深层 ref 包装数据（默认值为 `true`）。如果数据无需深度响应，可设为 `false`，提高性能。
  - `dedupe`：避免在同一时间内针对相同键发起多次请求（默认为 `cancel`），可选值：
    - `cancel` - 在发起新请求时取消现有请求
    - `defer` - 如果有挂起请求，则不发起新请求

::note
底层，`lazy: false` 利用 `<Suspense>` 阻塞路由加载直到数据获取完成。建议使用 `lazy: true` 并实现加载状态，以获得更流畅的用户体验。
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
你可以使用 `useLazyAsyncData` 来获得与 `useAsyncData` 中 `lazy: true` 相同的行为。
::

:video-accordion{title="观看 Alexander Lichter 关于使用 getCachedData 进行客户端缓存的视频" videoId="aQPR0xn-MMk"}

### 共享状态与选项一致性

当多次调用 `useAsyncData` 使用相同键时，它们会共享同一个 `data`、`error` 和 `status` ref。这确保了跨组件的数据一致性，但要求使用的选项也保持一致。

以下选项必须在同一键的所有调用中保持一致：
- `handler` 函数
- `deep` 选项
- `transform` 函数
- `pick` 数组
- `getCachedData` 函数
- `default` 值

以下选项可不同且不会触发警告：
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ 这样会触发开发环境警告
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { deep: false })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { deep: true })

// ✅ 这样是允许的
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: true })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: false })
```

## 返回值

- `data`：传入异步函数的结果。
- `refresh`/`execute`：用于刷新 `handler` 函数返回数据的函数。
- `error`：如果数据获取失败，返回错误对象。
- `status`：表示数据请求状态的字符串：
  - `idle`：请求未开始，例如：
    - 在未调用 `execute` 且设置了 `{ immediate: false }` 时
    - 在服务器端渲染 HTML 时且设置了 `{ server: false }`
  - `pending`：请求正在进行中
  - `success`：请求成功完成
  - `error`：请求失败
- `clear`：将 `data` 设为 `undefined`，`error` 设为 `null`，`status` 设为 `'idle'`，并标记任何当前挂起请求为已取消的函数。

默认情况下，Nuxt 会等待一次 `refresh` 完成后才允许再次执行。

::note
如果你没有在服务器端获取数据（例如设置了 `server: false`），则数据 **不会** 在水合前被获取。这意味着即使你在客户端 await 了 [`useAsyncData`](/docs/api/composables/use-async-data)，`data` 依然会在 `<script setup>` 中保持为 `null`。
::

## 类型

```ts [Signature]
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: string | Ref<string> | ComputedRef<string>,
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
  watch?: WatchSource[] | false
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
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
};

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/getting-started/data-fetching"}
