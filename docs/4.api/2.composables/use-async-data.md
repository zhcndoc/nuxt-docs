---
title: 'useAsyncData'
description: useAsyncData 提供对以异步方式解析的数据的访问，这是一个对 SSR 友好的组合式函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

在你的页面、组件和插件中，可以使用 useAsyncData 来获取以异步方式解析的数据。

::note
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个组合式函数，旨在直接在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)中调用。它会返回响应式组合式函数，并处理将响应添加到 Nuxt payload 中，以便在页面水合时从服务端传递到客户端，**而不会在客户端重新获取数据**。
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

::tip{to="/docs/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch"}
需要一个具有预定义默认值的 `useAsyncData`？使用 `createUseAsyncData` 创建一个完全类型化的自定义组合式函数。详情请参阅[自定义 useFetch 配方](/docs/guide/recipes/custom-usefetch)。
::

::note
你不需要对 `useAsyncData` 使用 `await`。在服务端，无论是否使用它，Nuxt 都会在渲染之前等待该 Promise 解析，因此返回的 HTML 始终包含数据。`await` 影响的是调用之后发生的事情：使用它时，执行会暂停直到 `data` 被填充，并且客户端导航会被阻塞直到数据准备就绪；不使用它时，执行会立即继续，`data` 在请求解析之前会保持为其默认值，而在客户端导航中你需要使用返回的 `status` 和 `error` refs 自行处理加载和错误状态。这与 [`lazy`](#parameters) 选项有类似效果，不过 `lazy` 是明确选择非阻塞导航的方式。
::

::note
`data`、`status`、`pending` 和 `error` 都是 Vue refs。在 `<script setup>` 中使用 `.value` 访问它们的值。`refresh`/`execute` 和 `clear` 是普通函数。
::

### Watch 参数

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

### 让你的 `handler` 支持中止

你可以通过使用传入的第二个参数中的 `signal` 来使 `handler` 函数支持中止。这对于在请求不再需要时取消请求非常有用，例如当用户离开页面时。`$fetch` 原生支持中止信号。

```ts [app/pages/index.vue]
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)

refresh() // 如果 dedupe: cancel，实际上会取消 $fetch 请求
refresh() // 如果 dedupe: cancel，实际上会取消 $fetch 请求
refresh()

clear() // 会取消最新的挂起处理函数
```

你也可以手动传递一个 `AbortSignal` 给 `refresh`/`execute` 函数，以取消单独的请求。

```ts [app/pages/index.vue]
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
  abortController?.abort() // 终止正在进行的 refresh 请求
}
```

如果你的 `handler` 函数不支持中止信号，你可以使用提供的 `signal` 实现你自己的中止逻辑。

```ts [app/pages/index.vue]
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => {
    return new Promise((resolve, reject) => {
      signal?.addEventListener('abort', () => {
        reject(new Error('请求已中止'))
      })
      return Promise.resolve(callback.call(this, yourHandler)).then(resolve, reject)
    })
  },
)
```

处理函数的中止信号将在以下情况下被中止：

- 使用 `dedupe: 'cancel'` 发起了新的请求
- 调用了 `clear` 函数
- 超过了 `options.timeout` 指定的时间

::warning
[`useAsyncData`](/docs/api/composables/use-async-data) 是一个由编译器转换的保留函数名，因此你不应将自己的函数命名为 [`useAsyncData`](/docs/api/composables/use-async-data)。
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## 类型

```ts
export type AsyncDataHandler<ResT> = (nuxtApp: NuxtApp, options: { signal: AbortSignal }) => Promise<ResT>

export function useAsyncData<ResT, DataE = unknown, DataT = ResT> (
  handler: AsyncDataHandler<ResT>,
  options?: AsyncDataOptions<ResT, DataT>,
): AsyncData<DataT, DataE> & Promise<AsyncData<DataT, DataE>>
export function useAsyncData<ResT, DataE = unknown, DataT = ResT> (
  key: MaybeRefOrGetter<string>,
  handler: AsyncDataHandler<ResT>,
  options?: AsyncDataOptions<ResT, DataT>,
): AsyncData<DataT, DataE> & Promise<AsyncData<DataT, DataE>>

type AsyncDataOptions<ResT, DataT = ResT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT>
  transform?: (input: ResT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: MultiWatchSources
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  timeout?: number
  enabled?: MaybeRefOrGetter<boolean>
  serialize?: boolean
  middleware?: AsyncDataMiddleware<ResT>[]
}

type AsyncDataMiddleware<ResT> = (next: () => Promise<ResT>, ctx: { signal: AbortSignal }) => Promise<ResT>

type AsyncDataRequestContext = {
  /** 本次数据请求的原因 */
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

:read-more{to="/docs/getting-started/data-fetching"}

## 参数

- `key`：一个唯一键，用于确保数据获取能够在不同请求之间正确去重。如果你不提供 `key`，则会为你生成一个对文件名和 `useAsyncData` 实例所在行号唯一的键。
- `handler`：一个异步函数，必须返回一个真值（例如，不应返回 `undefined` 或 `null`），否则请求可能会在客户端被重复发起。
::warning
`handler` 函数应当**没有副作用**，以确保 SSR 和 CSR 水合期间的行为可预测。如果需要触发副作用，请使用 [`callOnce`](/docs/api/utils/call-once) 工具函数。
::
- `options`（对象）：异步函数调用的配置。所有选项都可以是静态值、`ref` 或计算值。

| 选项                                                                    | 类型                                        | 默认值     | 描述                                                                                                                                                                                                                                                                          |
|---------------------------------------------------------------------------|---------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `server`                                                                  | `boolean`                                   | `true`     | 是否在服务端调用该函数。                                                                                                                                                                                                                                          |
| `lazy`                                                                    | `boolean`                                   | `false`    | 如果为 true，则在路由加载后解析（不会阻塞导航）。                                                                                                                                                                                                                     |
| `immediate`                                                               | `boolean`                                   | `true`     | 如果为 false，则阻止立即调用该函数。                                                                                                                                                                                                                           |
| `default`                                                                 | `() => DataT`                               | -          | 异步解析完成前 `data` 默认值的工厂函数。                                                                                                                                                                                                                           |
| `timeout` :badge[v4.2]{color="info" size="xs" class="align-middle"}       | `number`                                    | -          | 等待调用超时的毫秒数（默认为 `undefined`，表示不设置超时）                                                                                                                                                                        |
| `transform`                                                               | `(input: DataT) => DataT \| Promise<DataT>` | -          | 解析结果后对其进行转换的函数。                                                                                                                                                                                                                                    |
| `getCachedData` :badge[v3.8]{color="info" size="xs" class="align-middle"} | `(key, nuxtApp, ctx) => DataT \| undefined` | -          | 返回缓存数据的函数。默认值见下文。                                                                                                                                                                                                                               |
| `pick`                                                                    | `string[]`                                  | -          | 仅从结果中选取指定的键。                                                                                                                                                                                                                                            |
| `watch`                                                                   | `MultiWatchSources`                         | -          | 用于监听并自动刷新的响应式数据源数组。                                                                                                                                                                                                                                 |
| `deep` :badge[v3.8]{color="info" size="xs" class="align-middle"}          | `boolean`                                   | `false`    | 以深层 ref 对象的形式返回数据。为提升性能，默认值为 `false`（浅层 ref 对象）。                                                                                                                                                                                 |
| `dedupe` :badge[v3.9]{color="info" size="xs" class="align-middle"}        | `'cancel' \| 'defer'`                       | `'cancel'` | 同时多次触发执行时采用的策略。                                                                                                                                                                                                                        |
| `enabled` :badge[v4.5]{color="info" size="xs" class="align-middle"}       | `boolean`                                   | `true`     | 控制 `handler` 是否可以运行的开关。为 `false` 时，所有执行都会被阻止（初始获取、`execute`/`refresh` 和 watch 触发），并且从 `true` 切换到 `false` 时会取消所有正在进行的请求，但不会清除 `data`。重新启用后不会自动重新获取数据。 |
| `serialize` :badge[v4.6]{color="info" size="xs" class="align-middle"}     | `boolean`                                   | `true`     | 是否将解析后的数据存储到 Nuxt payload（`__NUXT_DATA__`）中。为 `false` 时，服务端获取的数据不会放入 payload；如果组件渲染了该数据，客户端会在水合后重新获取。配合[惰性水合](/docs/guide/best-practices/performance#lazy-hydration)使用，可避免水合不匹配和不必要的客户端数据获取。 |
| `middleware` :badge[v4.6]{color="info" size="xs" class="align-middle"}    | `AsyncDataMiddleware[]`                     | -          | 包装 `handler` 执行过程的函数。每个函数都会接收 `next`，它会运行链中剩余的部分并解析为数据；同时还会接收处理函数上下文（`{ signal }`）。第一个条目是最外层的包装器。调用 `next()` 以继续执行，或抛出错误以中止。 |

::note
所有选项都可以提供 `computed` 或 `ref` 值。它们会被监听，并在更新时自动使用新值发起新的请求。
::

**getCachedData 默认值：**

```ts [Default getCachedData Implementation]
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
只有当 `nuxt.config` 中启用了 `experimental.payloadExtraction` 时，这才会缓存数据。

::note
在底层，`lazy: false` 会使用 `<Suspense>` 在数据获取完成前阻塞路由加载。为了获得更流畅的用户体验，可以考虑使用 `lazy: true` 并实现一个加载状态。
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
你可以使用 `useLazyAsyncData`，让 `useAsyncData` 具有与 `lazy: true` 相同的行为。
::

:video-accordion{title="观看 Alexander Lichter 关于使用 getCachedData 进行客户端缓存的视频" videoId="aQPR0xn-MMk"}

### 共享状态和选项一致性

当多个 `useAsyncData` 调用使用同一个 key 时，它们会共享相同的 `data`、`error`、`status` 和 `pending` refs。请保持下面列出的选项在这些调用之间一致。

对于所有使用相同 key 的调用，以下选项**必须保持一致**：
- `handler` 函数
- `deep` 选项
- `transform` 函数
- `pick` 数组
- `getCachedData` 函数
- `default` 值
- `middleware` 数组

以下选项可以不同，而不会触发警告：
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`
- `enabled`
- `serialize`

```ts [app/pages/index.vue]
// ❌ 这会触发开发环境警告
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: false })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: true })

// ✅ 这是允许的
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: true })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: false })
```

::tip
使用 `useAsyncData` 创建的带键状态，可以通过 [`useNuxtData`](/docs/api/composables/use-nuxt-data) 在 Nuxt 应用中获取。
::

## 返回值

这个可组合函数会返回一个可以被 `await` 的 `Promise`，这使得可以在 `<script setup>` 中直接使用 `data`（即会有值，而不是 `undefined`）。你也可以不等待返回值，直接解构出这些值，在这种情况下，在获取完成之前，`<script setup>` 中的 `data` 可能会是 `undefined`。

::tip
即使你没有等待返回值，在 SSR 期间，Nuxt 也会等待请求完成，并将解析后的数据发送到客户端。
::

::note
如果你没有在服务端获取数据（例如，使用 `server: false`），那么在水合完成之前_不会_获取数据。这意味着即使你在客户端对 [`useAsyncData`](/docs/api/composables/use-async-data) 使用了 `await`，`<script setup>` 中的 `data` 仍会保持为 `undefined`。
::

| 名称      | 类型                                                | 描述                                                                                                                                                       |
|-----------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 传入的异步函数的结果。                                                                                                        |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 用于手动刷新数据的函数。默认情况下，Nuxt 会等待一次 `refresh` 完成后才允许再次执行。                                      |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh` 的别名。                                                                                                                                              |
| `error`   | `Ref<ErrorT \| undefined>`                          | 异步函数抛出错误时的错误对象。                                                                                                         |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 异步函数调用的状态。可用于区分 `idle`、`pending`、`success` 和 `error`。                                                        |
| `pending` | `Ref<boolean>`                                      | 请求进行期间为 `true`。启用 [`experimental.pendingWhenIdle`](/docs/guide/going-further/experimental-features#pendingwhenidle) 后，当 `status` 为 `idle` 且没有缓存数据时，该值也为 `true`。 |
| `clear`   | `() => void`                                        | 将 `data` 重置为 `undefined`（或提供了 `options.default()` 时的值），将 `error` 重置为 `undefined`，将 `status` 设为 `idle`，并取消所有待处理的调用。    |

::tip
如果你没有等待返回值，那么可以安全地解构来自 `Promise` 的函数（`then`、`catch` 和 `finally`）。
::

### 状态值

- `idle`：函数尚未被调用（例如在服务器渲染时使用 `{ immediate: false }` 或 `{ server: false }`）
- `pending`：函数已被调用，且 Promise 处于待定状态
- `success`：函数返回了一个值
- `error`：函数抛出了一个错误
