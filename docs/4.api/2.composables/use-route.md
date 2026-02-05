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
在 Vue 组件的模板中，你可以通过 `$route` 访问路由。
::

`useRoute` 组合函数是对 `vue-router` 中同名组合函数的封装，提供在 Nuxt 应用中访问当前路由的能力。

关键区别在于，在 Nuxt 中，该组合函数确保路由只有在导航后页面内容发生变化**之后**才会更新。
而 `vue-router` 中的版本则会**立即**更新路由，这可能导致依赖路由元数据的模板不同部分之间出现同步问题。

## 示例

下面的示例中，我们通过 [`useFetch`](/docs/3.x/api/composables/use-fetch) 调用 API，使用动态页面参数 `slug` 作为 URL 的一部分。

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

如果你需要访问路由的查询参数（比如路径 `/test?example=true` 中的 `example`），可以使用 `useRoute().query`，而非 `useRoute().params`。

## API

除了动态参数和查询参数，`useRoute()` 还提供了与当前路由相关的以下计算属性引用：

- `fullPath`：包含路径、查询和哈希的编码 URL，与当前路由关联
- `hash`：以 `#` 开头的 URL 哈希部分（已解码）
- `query`：访问路由查询参数
- `matched`：数组，包含与当前路由位置匹配的标准化路由记录
- `meta`：附加到路由记录的自定义数据
- `name`：路由记录的唯一名称
- `path`：URL 的编码路径部分
- `redirectedFrom`：在到达当前路由位置之前尝试访问的路由位置

## 常见陷阱

### 路由同步问题

重要的是要使用 Nuxt 的 `useRoute()` 组合函数，而不是 `vue-router` 中的，否则会在页面导航时出现同步问题。
从 `vue-router` 直接导入 `useRoute` 会绕过 Nuxt 的实现。

```ts twoslash
// ❌ 不要使用来自 `vue-router` 的 `useRoute`
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ 使用 Nuxt 提供的 `useRoute` 组合函数
import { useRoute } from '#app'
```

### 在中间件中调用 `useRoute`

不推荐在中间件中使用 `useRoute`，因为这可能导致意外行为。
中间件中没有“当前路由”的概念。
`useRoute()` 应该只在 Vue 组件的 setup 函数或 Nuxt 插件中使用。

::warning
这同样适用于内部使用 `useRoute()` 的任何组合函数。
::

::read-more{to="/docs/3.x/directory-structure/middleware"}
阅读更多关于在中间件中访问路由的内容。
::

### `route.fullPath` 的服务端渲染问题

浏览器在发起请求时不会发送[URL 片段](https://url.spec.whatwg.org/#concept-url-fragment)（例如 `#foo`）。
因此，使用 `route.fullPath` 影响模板可能导致客户端和服务端的内容不一致（包含片段与否），引发 hydration 问题。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/routelocationnormalizedloaded"}
