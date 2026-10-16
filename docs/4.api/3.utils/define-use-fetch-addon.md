---
title: 'defineUseFetchAddon'
description: 定义可复用的 addon，以扩展通过 createUseFetch 创建的组合式函数。
minimalVersion: "4.6"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/addons.ts
    size: xs
---

`defineUseFetchAddon` 用于为 [`createUseFetch`](/docs/api/composables/create-use-fetch) 创建的 `useFetch` 组合式函数定义可复用扩展。

Addon 可以声明调用时的自定义选项、使用中间件包装 handler、附加自定义响应式逻辑，或扩展返回对象。

## 用法

通过 `addons` 数组将 addon 传给 `createUseFetch`。

下面的 addon 添加了自定义逻辑：窗口重新获得焦点时刷新数据，并通过自定义的 `refreshOnFocus` 选项控制是否启用：

```ts [app/composables/useCustomFetch.ts]
const refreshOnFocus = defineUseFetchAddon({
  // 为自定义 useFetch 实例扩展调用选项
  setup: (options: UseFetchAddonOptions<{ refreshOnFocus?: boolean }>) => {
    // 在 useFetch 内部调用 useAsyncData 之前运行
    if (import.meta.server || !options.refreshOnFocus) { return }

    return (asyncData) => {
      // 在 useFetch 内部调用 useAsyncData 之后运行
      const focused = useWindowFocus()
      watch(focused, (focused) => {
        if (focused) { asyncData.refresh() }
      })

      return { focused } // 为返回对象增加新属性
    }
  },
})

export const useCustomFetch = createUseFetch({ addons: [refreshOnFocus] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
const { data } = await useCustomFetch('/some-endpoint', { refreshOnFocus: true })
</script>
```

每次调用组合式函数时都会运行 addon 的 `setup` 函数，并接收合并后的选项（工厂默认值与调用方选项）。

::note
Addon 按 `addons` 数组中的顺序运行，第一个 addon 的中间件位于最外层。同一个 addon 对象即使列出多次也只会运行一次。
::

## 自定义选项

将 `setup` 的 `options` 参数标注为 `UseFetchAddonOptions<{ ... }>` 以声明自定义选项。这些选项会成为创建出的组合式函数签名的一部分，并为调用方提供完整类型：

```ts [app/composables/useCustomFetch.ts]
const auth = defineUseFetchAddon({
  setup: (options: UseFetchAddonOptions<{ auth?: MaybeRefOrGetter<boolean> }>) => {
    const { token } = useTokenStore()
    options.auth ??= true
    options.onRequest.push(({ options: fetchOptions }) => {
      if (!toValue(options.auth)) { return }
      fetchOptions.headers.set('Authorization', `Bearer ${token.value}`)
    })
  },
})

export const useCustomFetch = createUseFetch({ addons: [auth] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
// `auth` 有类型定义
const { data } = await useCustomFetch('/public-endpoint', { auth: false })
</script>
```

自定义选项会保留在合并后的选项对象中，因此也会与请求选项一起传给 `$fetch`；`$fetch` 会忽略无法识别的键。

## 扩展返回值

如果 `setup` 返回一个函数，该函数会收到异步数据实例。它返回的任何对象都会合并到组合式函数的返回值中：

```ts
const timestamps = defineUseFetchAddon({
  setup: () => {
    const refreshedAt = ref<Date>()

    return (asyncData) => {
      watch(asyncData.status, (status) => {
        if (status === 'success') { refreshedAt.value = new Date() }
      }, { immediate: true })

      return { refreshedAt: readonly(refreshedAt) }
    }
  },
})

export const useCustomFetch = createUseFetch({ addons: [timestamps] })
```

```vue [app/pages/index.vue]
<script setup lang="ts">
// `refreshedAt` 有类型定义
const { data, refreshedAt } = await useCustomFetch('/modules')
</script>
```

## 中间件

中间件会包装请求 handler 的执行。调用 `next()` 以继续链式调用（并取得解析后的数据），或抛出错误以中止。第一个 addon 的中间件位于最外层：

```ts
const minDuration = defineUseFetchAddon({
  setup: (options: UseFetchAddonOptions<{ minDuration?: number }>) => {
    options.middleware.push(async (next) => {
      const [result] = await Promise.all([
        next(),
        new Promise(resolve => setTimeout(resolve, toValue(options.minDuration) ?? 300)),
      ])
      return result
    })
  },
})
```

## 参与生成自动键

默认情况下，自定义选项**不会**成为自动生成键的一部分。如果自定义选项会影响响应，请提供 `key` 解析函数，避免不同选项值的调用共享同一个缓存项。返回可序列化的值；若不需要参与生成键，则返回 `undefined`：

```ts
const scoped = defineUseFetchAddon({
  setup: (options: UseFetchAddonOptions<{ scope?: string }>) => {
    options.scope ??= 'default'
    // 其他设置
  },
  key: options => toValue(options.scope),
})
```

::warning
请将 `setup` 声明在 `key` 之前。TypeScript 会从 `setup` 参数的注解推断自定义选项；如果 `key` 解析函数写在一个会返回扩展函数的 `setup` 之前，它会先被检查，并被赋予空选项类型。
::

## 包装 `then`、`catch` 和 `finally`

作为高级扩展方式，扩展对象可以包含 `then`、`catch` 或 `finally` 函数。这些函数不会合并到实例中，而是包装可等待 Promise 上对应的方法，并将原方法作为第一个参数传入。

::note
多个 addon 包装同一个方法时，包装器会按 `addons` 数组顺序组合：第一个 addon 的包装器会包住后续所有包装器，与中间件的顺序相同。
::

## 类型

```ts [Signature]
function defineUseFetchAddon<Opts extends Record<string, any> = {}, Ext = {}> (addon: {
  setup: (options: UseFetchAddonOptions<Opts>) => ((asyncData: AsyncDataAddonInstance) => Ext | void) | void
  key?: (options: UseFetchAddonOptions<Opts>) => SerializableValue
}): UseFetchAddon<Opts, Ext>
```

::note
`middleware`、`onRequest`、`onRequestError`、`onResponse` 和 `onResponseError` 始终会规范化为数组，因此调用方和其他 addon 提供的拦截器都会保留。
::
