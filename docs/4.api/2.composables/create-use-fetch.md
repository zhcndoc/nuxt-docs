---
title: 'createUseFetch'
description: 一个工厂函数，用于创建带有预定义默认选项的自定义 useFetch 组合函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`createUseFetch` 用于创建带有预定义选项的自定义 [`useFetch`](/docs/4.x/api/composables/use-fetch) 组合函数。生成的组合函数是完全类型化的，并且其行为与 `useFetch` 完全相同，但内置了你的默认配置。

::note
`createUseFetch` 是一个编译器宏。它必须作为 **导出** 声明，放在 `composables/` 目录（或 Nuxt 编译器扫描的任何目录）中。Nuxt 会在构建时自动注入去重键。
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

生成的 `useAPI` 组合函数具有与 [`useFetch`](/docs/4.x/api/composables/use-fetch) 相同的签名和返回类型，调用方可使用或覆盖所有选项。

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

详见 [`useFetch` 文档](/docs/4.x/api/composables/use-fetch#parameters) 中的完整选项列表。

## 默认模式 vs 覆盖模式

### 默认模式（普通对象）

当你传入一个普通对象时，工厂选项作为**默认值**。调用方可以覆盖任何选项：

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

当你传入一个函数时，工厂选项会**覆盖**调用方的选项。该函数接收调用方的选项作为参数，可以读取它们来计算你的覆盖配置：

```ts [app/composables/useAPI.ts]
// 无论调用方传什么，baseURL 都会被强制设置
export const useAPI = createUseFetch(callerOptions => ({
  baseURL: 'https://api.nuxt.com',
}))
```

这在强制设置诸如身份验证头或特定基础 URL（不允许调用方更改）时非常有用。

## 搭配自定义 `$fetch`

你可以向 `createUseFetch` 传入自定义的 `$fetch` 实例：

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  $fetch: useNuxtApp().$api as typeof $fetch,
})
```

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-fetch"}
