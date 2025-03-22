---
title: "useRouter"
description: "useRouter 组合式 API 返回路由实例。"
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

如果你只需要在模板中使用路由实例，可以使用 `$router`：

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">返回</button>
</template>
```

如果你有一个 `pages/` 目录，`useRouter` 的行为与 `vue-router` 提供的相同。

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
阅读 `vue-router` 文档关于 `Router` 接口的内容。
::

## 基本操作

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): 向路由实例添加新路由。可以提供 `parentName` 将新路由添加为现有路由的子路由。
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): 通过名称移除现有路由。
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): 获取所有路由记录的完整列表。
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): 检查是否存在具有给定名称的路由。
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): 返回路由位置的标准化版本。还包括一个 `href` 属性，其中包含任何现有的基础。

```ts [示例]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` 将路由细节添加到路由数组中，这在构建 [Nuxt 插件](/docs/guide/directory-structure/plugins) 时非常有用，而 `router.push()` 则立即触发新的导航，这在页面、Vue 组件和组合中非常有用。
::

## 基于历史 API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): 如果可能，返回上一页，等同于 `router.go(-1)`。
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): 如果可能，前进一页，等同于 `router.go(1)`。
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): 在历史记录中前进或后退，不受 `router.back()` 和 `router.forward()` 强制执行的层次结构限制。
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): 通过向历史栈中推入一个条目程序性地导航到一个新 URL。**建议使用 [`navigateTo`](/docs/api/utils/navigate-to) 代替。**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): 通过替换路由历史栈中的当前条目程序性地导航到一个新 URL。**建议使用 [`navigateTo`](/docs/api/utils/navigate-to) 代替。**

```ts [示例]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
阅读更多关于浏览器的历史 API 的内容。
::

## 导航守卫

`useRouter` 组合式 API 提供 `afterEach`、`beforeEach` 和 `beforeResolve` 助手方法，作为导航守卫。

然而，Nuxt 有一个 **路由中间件** 的概念，它简化了导航守卫的实现并提供了更好的开发体验。

:read-more{to="/docs/guide/directory-structure/middleware"}

## Promise 和错误处理

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): 返回一个 Promise，当路由完成初始导航时解决。
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): 添加一个错误处理程序，该程序在导航期间每当发生未捕获的错误时被调用。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router 文档" target="_blank"}

## 通用路由实例

如果你没有 `pages/` 文件夹，则 [`useRouter`](/docs/api/composables/use-router) 将返回一个通用路由实例，具有类似的助手方法，但请注意，并非所有功能可能都会被支持或以完全相同的方式运作。