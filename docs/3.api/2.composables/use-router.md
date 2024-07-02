---
title: "useRouter"
description: "使用 useRouter 组合函数返回路由实例。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

如果你只需要在模板中使用路由器实例，请使用 `$router`:

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">Back</button>
</template>
```

如果你有一个 `pages/` 目录，`useRouter` 的行为与 `vue-router` 提供的行为相同。

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
阅读关于 `Router` 接口的 `vue-router` 文档。
::

## 基本操作

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): 向路由器实例添加一个新的路由。可以使用 `parentName` 来将新路由添加为现有路由的子路由。
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): 通过名称移除一个现有路由。
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): 获取所有路由记录的完整列表。
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): 检查是否存在具有给定名称的路由。
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): 返回路由位置的规范化版本。还包括一个 `href` 属性，其中包含任何现有的基。

```ts [示例]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` 在构建 [Nuxt 插件](/docs/guide/directory-structure/plugins) 时将路由详情添加到路由数组中，而 `router.push()` 另一方面会立即触发新的导航，这在页面、Vue组件和组合函数中非常有用。
::

## 基于 History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): 如果可能，返回历史记录，与 `router.go(-1)` 相同。
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): 如果可能，向前移动历史记录，与 `router.go(1)` 相同。
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): 向前或向后移动历史记录，不包括 `router.back()` 和 `router.forward()` 强制执行的层次限制。
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): 通过将新条目推入历史记录栈，程序化地导航到一个新 URL。**建议使用 [`navigateTo`](/docs/api/utils/navigate-to) 代替。**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): 通过替换当前历史记录栈中的条目，程序化地导航到一个新 URL。**建议使用 [`navigateTo`](/docs/api/utils/navigate-to) 代替。**

```ts [示例]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })
```

::read-more{icon="i-simple-icons-mdnwebdocs" color="gray" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
阅读更多关于浏览器 History API 的信息。
::

## 导航守卫

`useRouter` 组合函数提供了 `afterEach`、`beforeEach` 和 `beforeResolve` 帮助方法，这些方法作为导航守卫。

然而，Nuxt 有一个“路由中间件”的概念，它简化了导航守卫的实现，并提供了更好的开发者体验。

:read-more{to="/docs/guide/directory-structure/middleware"}

## 承诺和错误处理

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): 返回一个Promise，当路由器完成了初始导航后解析。
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): 添加一个错误处理器，每当导航期间发生未捕获的错误时调用。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router Docs" target="_blank"}

## 通用路由器实例

如果你没有一个 `pages/` 文件夹，那么 [`useRouter`](/docs/api/composables/use-router) 将会返回一个具有类似帮助方法的通用路由器实例，但是请注意，不是所有功能都可能被支持，或者以与 `vue-router` 完全相同的方式表现。
