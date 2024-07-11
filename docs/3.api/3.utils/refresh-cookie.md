---
title: "refreshCookie"
description: "当 Cookie 发生变化时，手动刷新 useCookie 的值"
navigation:
  badge: 新的
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
该实用程序自 [Nuxt v3.10](/blog/v3-10) 起可用。
::

## 目的

`refreshCookie` 函数旨在手动刷新由 `useCookie` 返回的 Cookie 值。

这在我们知道新的 Cookie 值已经在浏览器中被设置时更新 `useCookie` 引用是非常有用的。

## 使用

```vue [app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { ... }) // Sets `token` cookie on response
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/guide/going-further/experimental-features#cookiestore"}
您可以通过启用实验性的 `cookieStore` 选项来自动在浏览器中 Cookie 更改时刷新 `useCookie` 的值。
::

## 类型

```ts
refreshCookie(name: string): void
```
