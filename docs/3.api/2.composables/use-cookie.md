---
title: 'useCookie'
description: useCookie 是一个支持 SSR 的组合式函数，用于读取和写入 cookies。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

在你的页面、组件和插件中，可以使用 `useCookie` 这个支持 SSR 的组合式函数来读取和写入 cookies。

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` 仅在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中有效。
::

::tip
`useCookie` 返回的 ref 会自动将 cookie 值序列化和反序列化为 JSON。
::

## 示例

下面的示例创建了一个名为 `counter` 的 cookie。如果 cookie 不存在，则初始设置为一个随机值。每当更新 `counter` 变量时，cookie 也会相应地更新。

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>计数器: {{ counter || '-' }}</h1>
    <button @click="counter = null">重置</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>
```

:link-example{to="/docs/examples/advanced/use-cookie"}

::note
当 cookie 已更改时，可手动刷新 `useCookie` 的值，使用 [`refreshCookie`](/docs/api/utils/refresh-cookie)。
::

## 选项

cookie 组合式函数接受多个选项，用来修改 cookies 的行为。

大多数选项会直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

### `maxAge` / `expires`

使用这些选项设置 cookie 的过期时间。

`maxAge`：指定一个 `number`（秒）作为 [`Max-Age` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.2) 的值。
给定的数字会通过向下取整转换为整数。默认情况下，没有设置最大有效期。

`expires`：指定一个 `Date` 对象作为 [`Expires` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.1) 的值。
默认情况下不设置过期时间。大多数客户端会将其视为“非持久化 cookie”，在退出浏览器等条件下删除。

::note
[Cookie 存储模型规范](https://tools.ietf.org/html/rfc6265#section-5.3) 指出如果同时设置了 `expires` 和 `maxAge`，则 `maxAge` 优先，但并非所有客户端都会遵守，因此如果两者都设置，应指向相同的日期和时间！
::

::note
如果未设置 `expires` 和 `maxAge`，cookie 仅为会话级，用户关闭浏览器时会被删除。
::

### `httpOnly`

指定 [`HttpOnly` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.6) 的布尔值。为真时，设置 `HttpOnly` 属性，否则不设置。默认不启用 `HttpOnly`。

::warning
谨慎设置为 `true`，符合规范的客户端将不允许客户端 JavaScript 在 `document.cookie` 中访问该 cookie。
::

### `secure`

指定 [`Secure` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.5) 的布尔值。为真时，设置 `Secure` 属性，否则不设置。默认不启用 `Secure`。

::warning
谨慎设置为 `true`，因为符合规范的客户端在浏览器没有 HTTPS 连接时不会将该 cookie 发送回服务器，这可能导致 hydration 错误。
::

### `partitioned`

指定 [`Partitioned` `Set-Cookie`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1) 属性的布尔值。为真时设置该属性，否则不设置。默认不启用。

::note
这是一个尚未完全标准化的属性，未来可能会更改。
这也意味着许多客户端可能会忽略这个属性，直到理解它的含义。

更多信息见 [提案](https://github.com/privacycg/CHIPS)。
::

### `domain`

指定 [`Domain` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.3) 的值。默认不设置域名，且大多数客户端只将 cookie 应用于当前域。

### `path`

指定 [`Path` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.4) 的值。默认路径为 ["默认路径"](https://tools.ietf.org/html/rfc6265#section-5.1.4)。

### `sameSite`

指定 [`SameSite` `Set-Cookie` 属性](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7) 的布尔值或字符串。

- `true` 设置 `SameSite=Strict`，严格的站点同源策略。
- `false` 不设置 `SameSite` 属性。
- `'lax'` 设置 `SameSite=Lax`，宽松的站点同源策略。
- `'none'` 设置 `SameSite=None`，表示跨站点 cookie。
- `'strict'` 设置 `SameSite=Strict`，严格的站点同源策略。

更多不同策略的说明请参考 [规范](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。

### `encode`

指定一个用于编码 cookie 值的函数。由于 cookie 值字符集有限（必须是简单字符串），可以使用该函数编码值，使其适合用作 cookie 的值。

默认编码器是 `JSON.stringify` + `encodeURIComponent`。

### `decode`

指定一个用于解码 cookie 值的函数。由于 cookie 值字符集有限（必须是简单字符串），可以使用该函数解码之前编码的 cookie 值为 JavaScript 字符串或其他对象。

默认解码器是 `decodeURIComponent` + [destr](https://github.com/unjs/destr)。

::note
如果该函数抛出错误，将返回原始未解码的 cookie 值作为 cookie 的值。
::

### `default`

指定一个返回 cookie 默认值的函数。该函数也可以返回一个 `Ref`。

### `readonly`

允许访问 cookie 值，但不允许设置它。

### `watch`

指定是否监视 cookie ref 数据的变化，及其值为 `boolean` 或字符串，见 [watch](https://vue.zhcndoc.com/api/reactivity-core.html#watch) 的用法。

- `true` - 监听 cookie ref 及其嵌套属性的变化（默认）。
- `shallow` - 只监听 cookie ref 顶层属性的变化。
- `false` - 不监听 cookie ref 变化。

::note
当 cookie 已更改时，可手动刷新 `useCookie` 的值，使用 [`refreshCookie`](/docs/api/utils/refresh-cookie)。
::

**示例 1:**

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value && user.value !== null) {
  user.value.score++; // userInfo cookie 不会随此改动更新
}
</script>

<template>
  <div>用户分数: {{ user?.score }}</div>
</template>
```

**示例 2:**

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // list cookie 不会随此改动更新
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie 会随此改动更新
  }
}
</script>

<template>
  <div>
    <h1>列表</h1>
    <pre>{{ list }}</pre>
    <button @click="add">添加</button>
    <button @click="save">保存</button>
  </div>
</template>
```

## API 路由中的 Cookies

你可以在服务器 API 路由中使用 [`h3`](https://github.com/unjs/h3) 包的 `getCookie` 和 `setCookie` 来设置 cookies。

```ts [server/api/counter.ts]
export default defineEventHandler(event => {
  // 读取 counter cookie
  let counter = getCookie(event, 'counter') || 0

  // 增加 counter cookie 的值 1
  setCookie(event, 'counter', ++counter)

  // 发送 JSON 响应
  return { counter }
})
```

:link-example{to="/docs/examples/advanced/use-cookie"}
