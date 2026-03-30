---
title: 'createUseFetch'
description: 一个工厂函数，用于创建带有预定义默认选项的自定义 useFetch 组合式函数。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`createUseFetch` 会创建一个带有预定义选项的自定义 [`useFetch`](/docs/4.x/api/composables/use-fetch) 组合式函数。生成的组合式函数会被完整地类型推断，并且与 `useFetch` 的工作方式完全相同，只是把你的默认值“烘焙”进去了。

::note
`createUseFetch` 是一个编译宏。它必须在 `composables/` 目录中以**导出的声明**形式使用（或任何被 Nuxt 编译器扫描的目录）。Nuxt 会在构建时自动注入去重 key。
::

## 用法

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
})
```

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data: modules } = await useAPI('/modules')
</script>
```

生成的 `useAPI` 组合式函数具有与 [`useFetch`](/docs/4.x/api/composables/use-fetch) 相同的签名和返回类型；并且调用方可以使用或覆盖所有选项。

## 类型

```ts [Signature]
function createUseFetch (
  options?: Partial<UseFetchOptions>,
): typeof useFetch

function createUseFetch (
  options: (callerOptions: UseFetchOptions) => Partial<UseFetchOptions>,
): typeof useFetch
```

## 选项

`createUseFetch` 接受与 [`useFetch`](/docs/4.x/api/composables/use-fetch#parameters) 相同的所有选项，包括 `baseURL`、`headers`、`query`、`onRequest`、`onResponse`、`server`、`lazy`、`transform`、`getCachedData` 等。

请在 [`useFetch 文档`](/docs/4.x/api/composables/use-fetch#parameters) 中查看完整的选项列表。

## 默认模式 vs 覆盖模式

### 默认模式（普通对象）

当你传入一个普通对象时，工厂选项会作为**默认值**。调用方可以覆盖任何选项：

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
  lazy: true,
})
```

```ts
// 使用默认的 baseURL
const { data } = await useAPI('/modules')

// 调用方覆盖 baseURL
const { data } = await useAPI('/modules', { baseURL: 'https://other-api.com' })
```

### 覆盖模式（函数）

当你传入一个函数时，工厂选项会**覆盖**调用方的选项。该函数会把调用方的选项作为参数传入，因此你可以读取它们来计算你的覆盖项：

```ts [app/composables/useAPI.ts]
// 无论调用方传入什么，baseURL 都会被强制使用
export const useAPI = createUseFetch(callerOptions => ({
  baseURL: 'https://api.nuxt.com',
}))
```

这对于强制执行诸如认证头或某个特定 base URL 等设置非常有用，并且不应由调用方修改。

## 与自定义 `$fetch` 结合

你可以向 `createUseFetch` 传入一个自定义的 `$fetch` 实例：

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch(callerOptions => ({
  $fetch: useNuxtApp().$api as typeof $fetch,
  ...callerOptions,
}))
```

::important
这里需要使用**函数签名**（覆盖模式），以便在组合式函数调用处的 setup 上下文中调用 [`useNuxtApp()`](/docs/4.x/api/composables/use-nuxt-app)，而不是在模块作用域中调用（模块作用域下没有可用的 Nuxt 实例）。
::

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-fetch"}
