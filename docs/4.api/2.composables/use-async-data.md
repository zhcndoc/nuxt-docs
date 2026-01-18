---
title: 'useAsyncData'
description: useAsyncData 提供对以异步方式解析的数据的访问，这是一个对 SSR 友好的组合式函数。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

在你的页面、组件和插件中，可以使用 useAsyncData 来获取以异步方式解析的数据。

::note
[`useAsyncData`](/docs/4.x/api/composables/use-async-data) 是一个应当直接在 [Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 中调用的可组合函数。它返回响应式的组合式引用，并负责将响应添加到 Nuxt payload 中，以便在从服务端传到客户端时可以在页面水合时**不在客户端重新请求数据**。
::

## 用法

```vue
<script setup lang="ts">
const { data, status, pending, error, refresh, clear } = await useAsyncData(
  'mountains',
  (_nuxtApp, { signal }) => $fetch('https://api.nuxtjs.dev/mountains', { signal }),
)
</script>
```

::warning{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetchuseasyncdata"}
如果你正在使用自定义的 `useAsyncData` 包装器，请不要在可组合函数中对其进行 await，这可能会导致意外行为。请参阅自定义异步数据获取器的示例。
::

::note
`data`、`status`、`pending` 和 `error` 是 Vue 的 ref，在 `<script setup>` 中使用时应通过 `.value` 访问，而 `refresh`/`execute` 和 `clear` 是普通函数。
::

### 监听参数

内置的 `watch` 选项允许在检测到任何更改时自动重新运行获取函数。

```vue
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  (_nuxtApp, { signal }) => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value,
    },
    signal,
  }), {
    watch: [page],
  },
)
</script>
```

### 响应式键

你可以使用计算 ref、普通 ref 或者一个 getter 函数作为键，从而实现动态的数据获取，当键改变时会自动更新：

```vue
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// 当路由变化且 userId 更新时，数据会自动重新获取
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id),
)
</script>
```

### Make your `handler` abortable

You can make your `handler` function abortable by using the `signal` provided in the second argument. This is useful for cancelling requests when they are no longer needed, such as when a user navigates away from a page. `$fetch` natively supports abort signals.

```ts
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)

refresh() // will actually cancel the $fetch request (if dedupe: cancel)
refresh() // will actually cancel the $fetch request (if dedupe: cancel)
refresh()

clear() // will cancel the latest pending handler
```

You can also pass an `AbortSignal` to the `refresh`/`execute` function to cancel individual requests manually.

```ts
const { refresh } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)
let abortController: AbortController | undefined

function handleUserAction () {
  abortController = new AbortController()
  refresh({ signal: abortController.signal })
}

function handleCancel () {
  abortController?.abort() // aborts the ongoing refresh request
}
```

If your `handler` function does not support abort signals, you can implement your own abort logic using the `signal` provided.

```ts
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => {
    return new Promise((resolve, reject) => {
      signal?.addEventListener('abort', () => {
        reject(new Error('Request aborted'))
      })
      return Promise.resolve(callback.call(this, yourHandler)).then(resolve, reject)
    })
  },
)
```

The handler signal will be aborted when:

- A new request is made with `dedupe: 'cancel'`
- The `clear` function is called
- The `options.timeout` duration is exceeded

::warning
[`useAsyncData`](/docs/4.x/api/composables/use-async-data) 是一个由编译器转换的保留函数名，因此你不应将自己的函数命名为 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)。
::

:read-more{to="/docs/4.x/getting-started/data-fetching#useasyncdata"}

## 参数

- `key`：一个唯一键，用于确保跨请求的数据获取可以正确去重。如果你不提供键，系统会为你生成一个基于文件名和该 useAsyncData 实例的行号的唯一键。
- `handler`：一个异步函数，必须返回一个为真值的结果（例如，不应返回 `undefined` 或 `null`），否则在客户端可能会重复请求。
::warning
`handler` 函数应当是**无副作用的**，以确保在 SSR 和 CSR 水合期间行为可预测。如果你需要触发副作用，请使用 [`callOnce`](/docs/4.x/api/utils/call-once) 工具来处理。
::
- `options`：
  - `server`：是否在服务器端获取数据（默认为 `true`）
  - `lazy`：是否在路由加载后再解析异步函数，而不是阻塞客户端导航（默认为 `false`）
  - `immediate`：若设置为 `false`，将阻止请求立即触发。（默认为 `true`）
  - `default`：一个工厂函数，用于在异步函数解析之前设置 `data` 的默认值——在使用 `lazy: true` 或 `immediate: false` 时很有用
  - `transform`：一个用于在解析后修改 `handler` 函数结果的函数
  - `getCachedData`：提供一个返回缓存数据的函数。返回 `null` 或 `undefined` 将触发一次获取。默认实现为：
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
      ? nuxtApp.payload.data[key]
      : nuxtApp.static.data[key]
    ```
    该实现仅在 `nuxt.config` 中启用了 `experimental.payloadExtraction` 时缓存数据。
  - `pick`：仅从 `handler` 函数结果中选取此数组中指定的键
  - `watch`：监听响应式源以自动刷新
  - `deep`：以深层 ref 对象返回数据。默认是 `false`，以浅层 ref 返回数据，当你的数据不需要深度响应时可提升性能。
  - `dedupe`：避免在同一时间多次获取相同键（默认为 `cancel`）。可能的选项：
    - `cancel` - 当发起新请求时取消已有的请求
    - `defer` - 如果已有挂起请求，则不发起新请求
  - `timeout` - 等待请求超时的毫秒数（默认为 `undefined`，这意味着没有超时）

::note
在内部，`lazy: false` 使用 `<Suspense>` 来在数据获取完成之前阻塞路由加载。考虑使用 `lazy: true` 并实现加载状态以获得更流畅的用户体验。
::

::read-more{to="/docs/4.x/api/composables/use-lazy-async-data"}
你可以使用 `useLazyAsyncData` 来实现与 `useAsyncData` 中 `lazy: true` 相同的行为。
::

:video-accordion{title="观看 Alexander Lichter 关于使用 getCachedData 的客户端缓存的视频" videoId="aQPR0xn-MMk"}

### 共享状态与选项一致性

当对多个 `useAsyncData` 调用使用相同的 key 时，它们会共享相同的 `data`、`error`、`status` 和 `pending` 引用。这可以确保各组件之间的一致性，但需要选项保持一致。

以下选项在使用相同键的所有调用中**必须保持一致**：
- `handler` 函数
- `deep` 选项
- `transform` 函数
- `pick` 数组
- `getCachedData` 函数
- `default` 值

以下选项**可以不同**，不会触发警告：
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ 这会触发开发时警告
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: false })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: true })

// ✅ 这是允许的
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: true })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: false })
```

::tip
使用 `useAsyncData` 创建的键控状态可以通过 [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data) 在你的 Nuxt 应用中检索到。
::

## 返回值

- `data`：传入的异步函数的结果。
- `refresh`/`execute`：可用于刷新 `handler` 函数返回的数据的函数。
- `error`：如果数据获取失败，则为错误对象。
- `status`：表示数据请求状态的字符串：
  - `idle`：请求尚未开始，例如：
    - 当 `execute` 尚未被调用且设置了 `{ immediate: false }`
    - 在服务器渲染 HTML 时设置了 `{ server: false }`
  - `pending`：请求正在进行中
  - `success`：请求已成功完成
  - `error`：请求失败
- `pending`：一个 `Ref<boolean>`，当请求正在进行时（即 `status.value === 'pending'` 时）为 `true`。
- `clear`：一个函数，可用于将 `data` 设为 `undefined`（或如果提供了 `options.default()` 则设为其返回值）、将 `error` 设为 `undefined`、将 `status` 设为 `idle`，并将任何当前挂起的请求标记为已取消。

默认情况下，Nuxt 会等待一次 `refresh` 完成后才能再次执行。

::note
如果你未在服务器上获取数据（例如使用了 `server: false`），那么数据在水合完成之前**不会**被获取。这意味着即使你在客户端对 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 进行 await，在 `<script setup>` 中 `data` 仍将保持为 `undefined`。
::

## 类型

```ts
export type AsyncDataHandler<ResT> = (nuxtApp: NuxtApp, options: { signal: AbortSignal }) => Promise<ResT>

export function useAsyncData<DataT, DataE> (
  handler: AsyncDataHandler<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, DataE>
export function useAsyncData<DataT, DataE> (
  key: MaybeRefOrGetter<string>,
  handler: AsyncDataHandler<DataT>,
  options?: AsyncDataOptions<DataT>,
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
  watch?: MultiWatchSources | false
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  timeout?: number
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
  pending: Ref<boolean>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  signal?: AbortSignal
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
