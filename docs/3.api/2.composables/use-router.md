---
title: "useRouter"
description: "useRouter 可组合函数返回路由实例。"
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [app/pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

如果你只在模板中需要路由实例，请使用 `$router`：

```vue [app/pages/index.vue]
<template>
  <button @click="$router.back()">
    Back
  </button>
</template>
```

如果你有一个 `app/pages/` 目录，`useRouter` 的行为与 `vue-router` 提供的完全相同。

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
阅读 `vue-router` 关于 `Router` 接口的文档。
::

## 基本操作

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute)：向路由实例添加一个新路由。可以提供 `parentName` 将新路由作为现有路由的子路由添加。
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute)：通过名称移除现有路由。
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes)：获取所有路由记录的完整列表。
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute)：检查是否存在具有给定名称的路由。
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve)：返回路由位置的规范化版本。还包含一个 `href` 属性，该属性包含任何现有的 base。

```ts [Example]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` 将路由详情添加到路由数组中，在构建 [Nuxt 插件](/docs/4.x/guide/directory-structure/plugins) 时很有用；而 `router.push()` 则会立即触发新的导航，适用于页面、Vue 组件和可组合函数。
::

## 基于 History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back)：在可能的情况下后退历史，等同于 `router.go(-1)`。
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward)：在可能的情况下前进历史，等同于 `router.go(1)`。
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go)：在历史记录中前进或后退，不受 `router.back()` 和 `router.forward()` 所强制的层级限制。
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push)：通过在历史记录栈中压入一项来编程式地导航到新 URL。**建议改用 [`navigateTo`](/docs/4.x/api/utils/navigate-to)。**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace)：通过替换路由历史栈中的当前项来编程式地导航到新 URL。**建议改用 [`navigateTo`](/docs/4.x/api/utils/navigate-to)。**

```ts [Example]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: '/home' })
router.replace({ hash: '#bio' })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
阅读有关浏览器 History API 的更多内容。
::

## 导航守卫

`useRouter` 可组合函数提供 `afterEach`、`beforeEach` 和 `beforeResolve` 助手方法，可作为导航守卫。

但是，Nuxt 有 **路由中间件（route middleware）** 的概念，可以简化导航守卫的实现并提供更好的开发体验。

:read-more{to="/docs/4.x/guide/directory-structure/app/middleware"}

## Promise 和错误处理

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady)：当路由完成初始导航后，返回一个解析的 Promise。
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError)：添加一个错误处理器，在导航期间每次发生未捕获的错误时都会调用它。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router Docs" target="_blank"}

## 通用路由实例

如果你没有 `app/pages/` 文件夹，那么 [`useRouter`](/docs/4.x/api/composables/use-router) 将返回一个通用的路由实例，具有类似的辅助方法，但请注意，并非所有功能都受支持，或与 `vue-router` 的行为完全相同。