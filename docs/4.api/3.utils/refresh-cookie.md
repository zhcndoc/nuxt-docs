---
title: "refreshCookie"
description: "当 cookie 发生变化时，手动刷新 useCookie 的值"
navigation:
  badge: 新
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
该工具自 [Nuxt v3.10](/blog/v3-10) 起提供。
::

## 目的

`refreshCookie` 函数用于刷新 `useCookie` 返回的 cookie 值。

当我们知道浏览器中已设置了新的 cookie 值时，这对于更新 `useCookie` 引用非常有用。

## 使用方法

```vue [app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { /** ... */ }) // 响应中设置 `token` cookie
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/3.x/guide/going-further/experimental-features#cookiestore"}
自 [Nuxt v3.12.0](https://github.com/nuxt/nuxt/releases/tag/v3.12.0) 起，实验性的 `cookieStore` 选项默认为启用状态。当浏览器中的 cookie 发生变化时，它会自动刷新 `useCookie` 的值。
::

## 类型

```ts [Signature]
export function refreshCookie (name: string): void
```