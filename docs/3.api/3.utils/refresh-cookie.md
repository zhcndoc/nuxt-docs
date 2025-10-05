---
title: "refreshCookie"
description: "在 cookie 更改时手动刷新 useCookie 值"
navigation:
  badge: 新
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
此工具自 [Nuxt v3.10](/blog/v3-10) 起可用。
::

## 目的

`refreshCookie` 函数用于刷新由 `useCookie` 返回的 cookie 值。

当我们知道浏览器中已设置新的 cookie 值时，这对于更新 `useCookie` 的 ref 很有用。

## 用法

```vue [app/app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { /** ... */ }) // 在响应中设置 `token` cookie
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/4.x/guide/going-further/experimental-features#cookiestore"}
你可以启用实验性的 `cookieStore` 选项，以在浏览器中的 cookie 更改时自动刷新 `useCookie` 值。
::

## 类型

```ts [Signature]
export function refreshCookie (name: string): void
```