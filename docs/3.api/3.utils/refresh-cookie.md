---
title: "refreshCookie"
description: "手动刷新 useCookie 值，当 cookie 更改时"
navigation:
  badge: 新
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
该工具自 [Nuxt v3.10](/blog/v3-10) 起可用。
::

## 目的

`refreshCookie` 函数旨在刷新 `useCookie` 返回的 cookie 值。

当我们知道新的 cookie 值已在浏览器中设置时，这对于更新 `useCookie` 引用非常有用。

## 用法

```vue [app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { ... }) // 在响应中设置 `token` cookie
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/guide/going-further/experimental-features#cookiestore"}
您可以启用实验性的 `cookieStore` 选项，以便在浏览器中的 cookie 更改时自动刷新 `useCookie` 值。
::

## 类型

```ts
refreshCookie(name: string): void
```