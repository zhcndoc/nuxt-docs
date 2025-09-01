---
title: "useRoute"
description: useRoute 组合式 API 返回当前路由。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
在 Vue 组件的模板中，您可以使用 `$route` 访问路由。
::

`useRoute` 组合式 API 是对 `vue-router` 中同名组合式 API 的封装，提供对 Nuxt 应用中当前路由的访问。

主要区别在于，在 Nuxt 中，组合式 API 确保路由 **仅在** 页面内容在导航后发生变化后更新。

相比之下，`vue-router` 版本会 **立即** 更新路由，这可能导致依赖于路由元数据的模板不同部分之间出现同步问题。

## 示例

在以下示例中，我们通过 [`useFetch`](/docs/api/composables/use-fetch) 调用 API，使用动态页面参数 - `slug` - 作为 URL 的一部分。

```html [~/pages/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data: mountain } = await useFetch(`/api/mountains/${route.params.slug}`)
</script>

<template>
  <div>
    <h1>{{ mountain.title }}</h1>
    <p>{{ mountain.description }}</p>
  </div>
</template>
```

如果需要访问路由查询参数（例如 `/test?example=true` 路径中的 `example`），则可以使用 `useRoute().query` 而不是 `useRoute().params`。

## API

除了动态参数和查询参数，`useRoute()` 还提供以下与当前路由相关的计算引用：

- `fullPath`：与当前路由关联的编码 URL，包括路径、查询和哈希
- `hash`：URL 的解码哈希部分，以 # 开头
- `query`：访问路由查询参数
- `matched`：与当前路由位置匹配的规范化路由数组
- `meta`：附加到记录的自定义数据
- `name`：路由记录的唯一名称
- `path`：URL 的编码路径部分
- `redirectedFrom`：尝试访问的路由位置，最终转到当前路由位置

## 常见陷阱

### 路由同步问题

在页面导航期间，使用 Nuxt 的 `useRoute()` 组合式 API 而不是 `vue-router` 的版本非常重要，以避免同步问题。

直接从 `vue-router` 导入 `useRoute` 会绕过 Nuxt 的实现。

```ts twoslash
// ❌ do not use `useRoute` from `vue-router`
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ use Nuxt's `useRoute` composable
import { useRoute } from '#app'
```

### 在中间件中调用 `useRoute`

在中间件中使用 `useRoute` 并不推荐，因为这可能导致意外行为。

在中间件中没有“当前路由”的概念。

`useRoute()` 组合式函数应仅在 Vue 组件的 setup 函数或 Nuxt 插件中使用。

::warning
这也适用于任何内部使用 `useRoute()` 的可组合项。
::

::read-more{to="/docs/4.x/guide/directory-structure/app/middleware"}
在中间件部分了解更多关于访问路由的信息。
::

### 与 `route.fullPath` 相关的水合问题

浏览器在发起请求时不会发送 [URL 片段](https://url.spec.whatwg.org/#concept-url-fragment)（例如 `#foo`）。因此，使用 `route.fullPath` 来影响模板可能会引发水合问题，因为这将在客户端包含片段，但在服务器上不包含。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/RouteLocationNormalizedLoaded.html"}
