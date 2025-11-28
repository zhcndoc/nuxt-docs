---
title: "useRouter"
description: "useRouter 组合函数返回路由实例。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [app/pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

如果你只需要在模板内使用路由实例，可以使用 `$router`：

```vue [app/pages/index.vue]
<template>
  <button @click="$router.back()">
    返回
  </button>
</template>
```

如果你有一个 `app/pages/` 目录，`useRouter` 的行为与 `vue-router` 提供的完全相同。

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Properties-currentRoute-" target="_blank"}
阅读 `vue-router` 关于 `Router` 接口的文档。
::

## 基础操作

- [`addRoute()`](https://router.vuejs.org/api/interfaces/router#addRoute-): 向路由实例添加一个新路由。可以提供 `parentName` 将新路由添加为已有路由的子路由。
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/router#removeRoute-): 通过路由名称移除一个已存在的路由。
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/router#getRoutes-): 获取所有路由记录的完整列表。
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/router#hasRoute-): 检查是否存在指定名称的路由。
- [`resolve()`](https://router.vuejs.org/api/interfaces/router#resolve-): 返回一个规范化后的路由定位对象，同时包含了 `href` 属性，`href` 会包含任何已有的基础路径。

```ts [示例]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` 是将路由详情添加到路由数组中，这在构建 [Nuxt 插件](/docs/4.x/directory-structure/app/plugins) 时非常有用；而 `router.push()` 则是立即触发新的导航，适用于页面、Vue 组件和组合函数中。
::

## 基于 History API 的操作

- [`back()`](https://router.vuejs.org/api/interfaces/router#back-): 如果可能，浏览历史记录返回，等同于 `router.go(-1)`。
- [`forward()`](https://router.vuejs.org/api/interfaces/router#forward-): 如果可能，浏览历史记录前进，等同于 `router.go(1)`。
- [`go()`](https://router.vuejs.org/api/interfaces/router#go-): 在历史记录中前进或后退，不受 `router.back()` 和 `router.forward()` 中的层级限制。
- [`push()`](https://router.vuejs.org/api/interfaces/router#push-): 通过向历史栈推入一条新记录来编程式导航到新 URL。**推荐使用 [`navigateTo`](/docs/4.x/api/utils/navigate-to) 代替。**
- [`replace()`](https://router.vuejs.org/api/interfaces/router#replace-): 通过替换当前历史栈中的记录来编程式导航到新 URL。**推荐使用 [`navigateTo`](/docs/4.x/api/utils/navigate-to) 代替。**

```ts [示例]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: '/home' })
router.replace({ hash: '#bio' })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
了解更多浏览器 History API。
::

## 导航守卫

`useRouter` 组合函数提供了 `afterEach`、`beforeEach` 和 `beforeResolve` 辅助方法，作为导航守卫。

但是，Nuxt 还有一个 **路由中间件（route middleware）** 的概念，它简化了导航守卫的实现并提供更好的开发体验。

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

## Promise 和错误处理

- [`isReady()`](https://router.vuejs.org/api/interfaces/router#isReady-): 返回一个 Promise，当路由完成初始导航后该 Promise 会被 resolve。
- [`onError`](https://router.vuejs.org/api/interfaces/router#onError-): 注册一个错误处理器，每当导航过程中发生非捕获错误时调用。

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Methods-" title="Vue Router 文档" target="_blank"}

## 通用路由实例

如果你没有 `app/pages/` 文件夹，那么 [`useRouter`](/docs/4.x/api/composables/use-router) 将返回一个具有类似辅助方法的通用路由实例，但请注意，并非所有功能都被支持，或者行为可能不完全与 `vue-router` 一致。
