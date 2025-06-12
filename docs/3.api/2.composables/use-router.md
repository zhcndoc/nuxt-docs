---
title: "useRouter"
description: "useRouter 组合函数返回路由实例。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

如果你仅仅需要在模板中使用路由实例，可以使用 `$router`：

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">返回</button>
</template>
```

如果你有 `pages/` 目录，`useRouter` 的行为与 `vue-router` 提供的完全相同。

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
阅读 `vue-router` 关于 `Router` 接口的文档。
::

## 基本操作

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute)：向路由实例添加新路由。可以提供 `parentName` 将新的路由作为已有路由的子路由添加。
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute)：通过名称移除已有路由。
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes)：获取所有路由记录的完整列表。
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute)：检查是否存在指定名称的路由。
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve)：返回路由位置的规范化版本。同时包含一个包含任何现有基础路径的 `href` 属性。

```ts [示例]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` 会将路由信息加入路由数组中，适合在构建 [Nuxt 插件](/docs/guide/directory-structure/plugins) 时使用，而 `router.push()` 会立即触发导航，适合在页面、Vue 组件和组合函数中使用。
::

## 基于 History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back)：如果可能，后退一步，等同于 `router.go(-1)`。
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward)：如果可能，前进一步，等同于 `router.go(1)`。
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go)：向前或向后移动历史记录，不受 `router.back()` 和 `router.forward()` 的层级限制。
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push)：通过将新条目推入历史记录栈，编程式导航到新 URL。**推荐使用 [`navigateTo`](/docs/api/utils/navigate-to) 替代。**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace)：通过替换当前历史记录栈中的条目，编程式导航到新 URL。**推荐使用 [`navigateTo`](/docs/api/utils/navigate-to) 替代。**

```ts [示例]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
了解更多关于浏览器的 History API。
::

## 导航守卫

`useRouter` 组合函数提供了 `afterEach`、`beforeEach` 和 `beforeResolve` 辅助方法，作为导航守卫。

然而，Nuxt 提供了**路由中间件**的概念，它简化了导航守卫的实现并带来了更好的开发者体验。

:read-more{to="/docs/guide/directory-structure/middleware"}

## Promise 和错误处理

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady)：返回一个 Promise，当路由完成初始导航时解析。
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError)：添加错误处理器，在导航过程中发生未捕获错误时调用。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router 文档" target="_blank"}

## 通用路由实例

如果你没有 `pages/` 文件夹，则 [`useRouter`](/docs/api/composables/use-router) 会返回一个具备类似辅助方法的通用路由实例，但请注意并非所有特性都被支持或行为完全等同于 `vue-router`。