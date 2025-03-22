---
title: 'useCookie'
description: useCookie 是一个支持 SSR 的组合式 API，用于读取和写入 cookies。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

在您的页面、组件和插件中，您可以使用 `useCookie`，这是一个支持 SSR 的组合式 API，用于读取和写入 cookies。

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` 仅在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中有效。
::

::tip
`useCookie` 引用将自动将 cookie 值序列化和反序列化为 JSON。
::

## 示例

下面的示例创建了一个名为 `counter` 的 cookie。如果 cookie 不存在，它会最初设置为一个随机值。每当我们更新 `counter` 变量时，cookie 也会相应地更新。

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
当 cookie 更改时，通过 [`refreshCookie`](/docs/api/utils/refresh-cookie) 手动刷新 `useCookie` 值。
::

## 选项

cookie 组合式 API 接受多个选项，您可以通过这些选项修改 cookie 的行为。

大多数选项将被直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

### `maxAge` / `expires`

使用这些选项设置 cookie 的过期时间。

`maxAge`: 指定一个 `number`（以秒为单位），作为 [`Max-Age` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.2) 的值。
给定的数字将通过向下取整转换为整数。 默认情况下，不设置最大年龄。

`expires`: 指定一个 `Date` 对象作为 [`Expires` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.1) 的值。
默认情况下，不设置过期。大多数客户端将把此视为“非持久 cookie”，并在关闭 web 浏览器应用程序时删除它。

::note
[cookie 存储模型规范](https://tools.ietf.org/html/rfc6265#section-5.3)规定，如果同时设置了 `expires` 和 `maxAge`，那么 `maxAge` 优先，但不是所有客户端都可能遵循这一点，因此如果同时设置了它们，应该指向同一日期和时间！
::

::note
如果既未设置 `expires` 也未设置 `maxAge`，则 cookie 将仅限于会话，并在用户关闭浏览器时删除。
::

### `httpOnly`

为 [`HttpOnly` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.6) 指定一个 `boolean` 值。当为真时，设置 `HttpOnly` 属性；否则不设置。默认为不设置 `HttpOnly` 属性。

::warning
小心将此设置为 `true`，因为合规的客户端将不允许客户端 JavaScript 在 `document.cookie` 中看到 cookie。
::

### `secure`

为 [`Secure` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.5) 指定一个 `boolean` 值。当为真时，设置 `Secure` 属性；否则不设置。默认为不设置 `Secure` 属性。

::warning
小心将此设置为 `true`，因为合规的客户端如果浏览器没有 HTTPS 连接将不会将 cookie 发送回服务器。这可能导致水合错误。
::

### `partitioned`

为 [`Partitioned` `Set-Cookie`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1) 属性指定一个 `boolean` 值。当为真时，设置 `Partitioned` 属性；否则不设置。默认为不设置 `Partitioned` 属性。

::note
这是一个尚未完全标准化的属性，未来可能会改变。
这也意味着许多客户端可能会在理解之前忽略此属性。

更多信息可以在 [提案](https://github.com/privacycg/CHIPS) 中找到。
::

### `domain`

为 [`Domain` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.3) 指定值。默认情况下不设置域，大多数客户端将只对当前域应用 cookie。

### `path`

为 [`Path` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.4) 指定值。默认情况下，路径被视为“默认路径”（https://tools.ietf.org/html/rfc6265#section-5.1.4）。

### `sameSite`

为 [`SameSite` `Set-Cookie` 属性](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7) 指定一个 `boolean` 或 `string` 值。

- `true` 将 `SameSite` 属性设置为 `Strict` 以严格执行同站策略。
- `false` 不设置 `SameSite` 属性。
- `'lax'` 将 `SameSite` 属性设置为 `Lax` 以宽松执行同站策略。
- `'none'` 将 `SameSite` 属性设置为 `None` 以显式定义跨站 cookie。
- `'strict'` 将 `SameSite` 属性设置为 `Strict` 以严格执行同站策略。

有关不同执行级别的更多信息，请参见 [规范](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。

### `encode`

指定一个将用于编码 cookie 值的函数。由于 cookie 的值具有有限的字符集（并且必须是简单字符串），此函数可以用于将值编码为适合 cookie 值的字符串。

默认编码器是 `JSON.stringify` + `encodeURIComponent`。

### `decode`

指定一个将用于解码 cookie 值的函数。由于 cookie 的值具有有限的字符集（并且必须是简单字符串），此函数可以用于将先前编码的 cookie 值解码为 JavaScript 字符串或其他对象。

默认解码器是 `decodeURIComponent` + [destr](https://github.com/unjs/destr)。

::note
如果此函数抛出错误，则将返回原始的、未解码的 cookie 值作为 cookie 的值。
::

### `default`

指定一个返回 cookie 默认值的函数。该函数也可以返回一个 `Ref`。

### `readonly`

允许访问 cookie 值，而没有设置它的能力。

### `watch`

指定一个 `boolean` 或 `string` 值，用于 [watch](https://vuejs.org/api/reactivity-core.html#watch) cookie 引用数据。

- `true` - 将监视 cookie 引用数据的变化及其嵌套属性（默认）。
- `shallow` - 仅监视 cookie 引用数据的顶层属性变化。
- `false` - 不监视 cookie 引用数据的变化。

::note
当 cookie 更改时，通过 [`refreshCookie`](/docs/api/utils/refresh-cookie) 手动刷新 `useCookie` 值。
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
  user.value.score++; // userInfo cookie 不会随着这个变化而更新
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
  // list cookie 不会随着这个变化而更新
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie 会随着这个变化而更新
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

您可以使用来自 [`h3`](https://github.com/unjs/h3) 包的 `getCookie` 和 `setCookie` 来设置服务器 API 路由中的 cookies。

```ts [server/api/counter.ts]
export default defineEventHandler(event => {
  // 读取 counter cookie
  let counter = getCookie(event, 'counter') || 0

  // 将 counter cookie 增加 1
  setCookie(event, 'counter', ++counter)

  // 发送 JSON 响应
  return { counter }
})
```

:link-example{to="/docs/examples/advanced/use-cookie"}