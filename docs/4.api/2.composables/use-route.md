---
title: "useRoute"
description: useRoute 组合函数返回当前路由。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
在 Vue 组件的模板中，你可以使用 `$route` 访问路由。
::

`useRoute` 可组合函数是对 `vue-router` 中同名可组合函数的封装，为 Nuxt 应用提供对当前路由的访问。

关键区别在于，在 Nuxt 中，该可组合函数确保在导航后仅在页面内容发生变化之后才更新路由。
相比之下，`vue-router` 版本会**立即**更新路由，这可能导致依赖路由元数据的模板不同部分之间出现同步问题。

## 示例

在下面的示例中，我们通过 [`useFetch`](/docs/4.x/api/composables/use-fetch) 调用一个 API，使用动态页面参数 - `slug` - 作为 URL 的一部分。

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

如果你需要访问路由查询参数（例如路径 `/test?example=true` 中的 `example`），可以使用 `useRoute().query` 而不是 `useRoute().params`。

## API

除了动态参数和查询参数外，`useRoute()` 还提供与当前路由相关的以下计算引用：

- `fullPath`: 与当前路由关联的已编码 URL，包含路径、查询和哈希
- `hash`: 以 # 开头的已解码 URL 哈希段
- `query`: 访问路由查询参数
- `matched`: 与当前路由位置匹配的标准化路由数组
- `meta`: 附加到路由记录的自定义数据
- `name`: 路由记录的唯一名称
- `path`: 已编码的 URL 路径部分
- `redirectedFrom`: 在最终到达当前路由位置之前尝试访问的路由位置

## 常见陷阱

### 路由同步问题

在页面导航期间，为避免同步问题，重要的是使用 Nuxt 提供的 `useRoute()` 可组合函数，而不是直接使用 `vue-router` 的版本。
直接从 `vue-router` 导入 `useRoute` 会绕过 Nuxt 的实现。

```ts twoslash
// ❌ 不要从 `vue-router` 使用 `useRoute`
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ 使用 Nuxt 的 `useRoute` 可组合函数
import { useRoute } from '#app'
```

### 在中间件中调用 `useRoute`

不推荐在中间件中使用 `useRoute`，因为这可能导致意外行为。
中间件中不存在“当前路由”的概念。
`useRoute()` 可组合函数应仅在 Vue 组件的 setup 函数或 Nuxt 插件中使用。

::warning
这也适用于任何内部使用了 `useRoute()` 的可组合函数。
::

::read-more{to="/docs/4.x/directory-structure/app/middleware"}
在中间件部分阅读有关访问路由的更多内容。
::

### 使用 `route.fullPath` 时的水合（hydration）问题

浏览器在发出请求时不会发送 URL 片段（例如 `#foo`）。因此在模板中使用 `route.fullPath` 可能会触发水合问题，因为它在客户端会包含片段，但在服务器端不会包含。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/routelocationnormalizedloaded"}
