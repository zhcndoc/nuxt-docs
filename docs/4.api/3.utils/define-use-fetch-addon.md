---
title: 'defineUseFetchAddon'
description: 定义一个可复用的扩展，用于扩展通过 createUseFetch 创建的组合式函数。
minimalVersion: "4.6"
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/addons.ts
    size: xs
---

`defineUseFetchAddon` 为通过 [`createUseFetch`](/docs/api/composables/create-use-fetch) 创建的 `useFetch` 组合式函数定义可复用的扩展。

扩展可以声明自定义调用选项、通过中间件包装处理程序、附加自定义响应式逻辑，或扩展返回对象。

## 用法

通过 `addons` 数组将扩展传递给 `createUseFetch`。

此扩展会附加自定义逻辑：一个监听器，在窗口重新获得焦点时刷新数据，并通过自定义的 `refreshOnFocus` 选项控制是否启用：

```ts [app/composables/useCustomFetch.ts]
const refreshOnFocus = defineUseFetchAddon({
  // augment the call-site options for the custom useFetch instance 👇
  setup: (options: UseFetchAddonOptions<{ refreshOnFocus?: boolean }>) => {
    // 👈 run code *before* calling `useAsyncData` in `useFetch`
    if (import.meta.server || !options.refreshOnFocus) { return }

    return (asyncData) => {
      // 👈 run code *after* calling `useAsyncData` in `useFetch`
      const focused = useWindowFocus()
      watch(focused, (focused) => {
        if (focused) { asyncData.refresh() }
      })

      return { focused } // 👈 extend the returned object with a new property
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

每次调用组合式函数时都会运行扩展的 `setup` 函数，并接收合并后的选项（工厂默认值加上调用方选项）。

::note
扩展按 `addons` 数组中的顺序运行，第一个扩展的中间件是最外层的包装器。同一个扩展对象即使列出多次，也只会运行一次。
::

## 自定义选项

通过使用 `UseFetchAddonOptions<{ ... }>` 注解 `setup` 的 `options` 参数来声明自定义选项。这些选项会成为创建的组合式函数签名的一部分，并为调用方提供完整的类型支持：

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
// `auth` is typed
const { data } = await useCustomFetch('/public-endpoint', { auth: false })
</script>
```

自定义选项会保留在合并后的选项对象中，因此也会与请求选项一起传递给 `$fetch`；`$fetch` 会忽略它不识别的键。

## 扩展返回值

如果 `setup` 返回一个函数，该函数会接收 async data 实例作为参数。它返回的任何对象都会合并到组合式函数的返回值中：

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
// `refreshedAt` is typed
const { data, refreshedAt } = await useCustomFetch('/modules')
</script>
```

## 中间件

中间件会包装请求处理程序的执行过程。调用 `next()` 以继续调用链（并获取已解析的数据），或抛出异常以中止。第一个扩展的中间件是最外层的包装器：

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

## 纳入自动生成的键

默认情况下，自定义选项**不会**纳入自动生成的键。如果某个自定义选项会影响响应，请提供一个 `key` 解析器，以避免具有不同值的调用共享同一个缓存条目。返回可序列化的值，或返回 `undefined` 表示不纳入任何内容：

```ts
const scoped = defineUseFetchAddon({
  setup: (options: UseFetchAddonOptions<{ scope?: string }>) => {
    options.scope ??= 'default'
    // ...
  },
  key: options => toValue(options.scope),
})
```

::warning
请在 `key` 之前声明 `setup`。TypeScript 会根据 `setup` 参数注解推断自定义选项，而如果 `key` 解析器写在一个返回扩展函数的 `setup` 之前，就会先对 `key` 进行检查，并将其类型设为空选项。
::

## 包装 `then`、`catch` 和 `finally`

作为一种高级逃生机制，扩展对象可以包含 `then`、`catch` 或 `finally` 函数。这些函数不会合并到实例中，而是包装可等待 Promise 对应的方法，并将原始方法作为第一个参数传入。

::note
当多个扩展包装同一个方法时，包装器会按 `addons` 数组中的顺序组合：第一个扩展的包装器会包装其后的所有扩展，与其中间件的处理方式相同。
::

## 类型

```ts [Signature]
function defineUseFetchAddon<Opts extends Record<string, any> = {}, Ext = {}> (addon: {
  setup: (options: UseFetchAddonOptions<Opts>) => ((asyncData: AsyncDataAddonInstance) => Ext | void) | void
  key?: (options: UseFetchAddonOptions<Opts>) => SerializableValue
}): UseFetchAddon<Opts, Ext>
```

::note
`middleware`、`onRequest`、`onRequestError`、`onResponse` 和 `onResponseError` 始终会被规范化为数组，因此调用方和其他扩展中的拦截器都会保留。
::
