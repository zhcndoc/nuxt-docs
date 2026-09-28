---
title: 'createUseFetch'
description: 用于创建一个带有预定义默认选项的自定义 useFetch 组合式函数的工厂函数。
minimalVersion: "4.2"
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`createUseFetch` 会创建一个带有预定义选项的自定义 [`useFetch`](/docs/api/composables/use-fetch) 组合式函数。生成的组合式函数具有完整的类型定义，使用方式与 `useFetch` 完全相同，但会预先应用你设置的默认值。

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

生成的 `useAPI` 组合式函数具有与 [`useFetch`](/docs/api/composables/use-fetch) 相同的签名和返回类型，调用方可以使用或覆盖所有选项。

## 类型

```ts [签名]
function createUseFetch (
  options?: Partial<UseFetchOptions>,
): typeof useFetch

function createUseFetch (
  options: (callerOptions: UseFetchOptions) => Partial<UseFetchOptions>,
): typeof useFetch
```

## 选项

`createUseFetch` 接受与 [`useFetch`](/docs/api/composables/use-fetch#parameters) 相同的所有选项，包括 `baseURL`、`headers`、`query`、`onRequest`、`onResponse`、`server`、`lazy`、`transform`、`getCachedData` 等。

请参阅 [`useFetch` 文档](/docs/api/composables/use-fetch#parameters)中的完整选项列表。

## 默认模式 vs 覆盖模式

### 默认模式（普通对象）

传入普通对象时，工厂选项会作为**默认值**。调用方可以覆盖任何选项：

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

传入函数时，工厂选项会**覆盖**调用方的选项。调用方的选项会作为参数传入该函数，因此你可以读取这些选项来计算要覆盖的值：

```ts [app/composables/useAPI.ts]
// 无论调用方传入什么，baseURL 都会被强制使用
export const useAPI = createUseFetch(callerOptions => ({
  baseURL: 'https://api.nuxt.com',
}))
```

这对于强制使用认证头或特定 base URL 等设置非常有用，因为这些设置不应由调用方修改。

## 与自定义 `$fetch` 结合

你可以向 `createUseFetch` 传入自定义 `$fetch` 实例：

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch(callerOptions => ({
  $fetch: useNuxtApp().$api as typeof $fetch,
  ...callerOptions,
}))
```

::important
此处必须使用**函数签名**（覆盖模式），这样 [`useNuxtApp()`](/docs/api/composables/use-nuxt-app) 才会在设置上下文（即调用组合式函数的位置）中调用，而不是在没有 Nuxt 实例可用的模块作用域中调用。
::

:read-more{to="/docs/guide/recipes/custom-usefetch"}

:read-more{to="/docs/api/composables/use-fetch"}
