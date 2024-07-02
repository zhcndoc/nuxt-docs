---
title: 'useCookie'
description: useCookie 是一个适用于 SSR 的可组合函数，用于读取和写入 Cookie。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

在你的页面、组件和插件中，你可以使用 `useCookie`，这是一个适用于 SSR 的可组合函数，用于读取和写入 Cookie。

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` 仅在 [Nuxt 上下文中](/docs/guide/going-further/nuxt-app#the-nuxt-context) 工作。
::

::tip
`useCookie` 引用会自动将 Cookie 值序列化和反序列化成 JSON。
::

## 示例

下面的示例创建了一个名为 `counter` 的 Cookie。如果该 Cookie 不存在，它将被初始化为一个随机值。当我们更新 `counter` 变量时，Cookie 也会相应地被更新。

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">reset</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>
```

:link-example{to="/docs/examples/advanced/use-cookie"}

::note
当 Cookie 发生变化时，手动刷新 `useCookie` 值，使用 [`refreshCookie`](/api/utils/refresh-cookie)。
::

## 选项

Cookie 组合函数接受多个选项，这些选项允许你修改 Cookie 的行为。

大多数选项将被直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

### `maxAge` / `expires`

使用这些选项来设置 Cookie 的过期时间。

`maxAge`: 指定 `number`（以秒为单位）作为 [`Max-Age` `Set-Cookie` 属性的值](https://tools.ietf.org/html/rfc6265#section-5.2.2)。给定的数字将被转换为整数，向下取整。默认情况下，不设置最大年龄。

`expires`: 指定 `Date` 对象作为 [`Expires` `Set-Cookie` 属性的值](https://tools.ietf.org/html/rfc6265#section-5.2.1)。默认情况下，不设置过期时间。大多数客户端会认为这是一个“非持久性 Cookie”，并在关闭 web 浏览器应用程序时删除它。

::note
[Cookie 存储模型规范](https://tools.ietf.org/html/rfc6265#section-5.3)指出，如果同时设置了 `expires` 和 `maxAge`，那么 `maxAge` 优先，但并非所有客户端都会遵守这一点，因此如果同时设置，它们应该指向相同的日期和时间！
::

::note
如果既不设置 `expires` 也不设置 `maxAge`，Cookie 将仅限于会话，并在用户关闭浏览器时被删除。
::

### `httpOnly`

指定 `boolean` 值作为 [`HttpOnly` `Set-Cookie` 属性的值](https://tools.ietf.org/html/rfc6265#section-5.2.6)。为真时，设置 `HttpOnly` 属性；否则，不设置。默认情况下，不设置 `HttpOnly` 属性。

::warning
当设置为 `true` 时要小心，因为合规的客户端不会允许客户端 JavaScript 看到 `document.cookie` 中的 Cookie。
::

### `secure`

指定 `boolean` 值作为 [`Secure` `Set-Cookie` 属性的值](https://tools.ietf.org/html/rfc6265#section-5.2.5)。为真时，设置 `Secure` 属性；否则，不设置。默认情况下，不设置 `Secure` 属性。

::warning
当设置为 `true` 时要小心，因为合规的客户端在将来不会将 Cookie 发送回服务器，如果浏览器没有 HTTPS 连接。这可能导致重构错误。
::

### `partitioned`

指定 `boolean` 值作为 [`Partitioned` `Set-Cookie`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1) 属性的值。为真时，设置 `Partitioned` 属性，否则不设置。默认情况下，不设置 `Partitioned` 属性。

::note
这是一个尚未完全标准化的属性，将来可能会发生变化。
这也意味着许多客户端可能会忽略这个属性，直到他们理解它。

更多信息可以在 [提案](https://github.com/privacycg/CHIPS) 中找到。
::

### `domain`

指定 [`Domain` `Set-Cookie` 属性的值](https://tools.ietf.org/html/rfc6265#section-5.2.3)。默认情况下，不设置域，大多数客户端会考虑将该 Cookie 仅应用于当前域。

### `path`

指定 [`Path` `Set-Cookie` 属性的值](https://tools.ietf.org/html/rfc6265#section-5.2.4)。默认情况下，路径被认为是 ["默认路径"](https://tools.ietf.org/html/rfc6265#section-5.1.4)。

### `sameSite`

指定 `boolean` 或 `string` 值作为 [`SameSite` `Set-Cookie` 属性的值](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。

- `true` 将 `SameSite` 属性设置为 `Strict` 进行严格的相同站点强制执行。
- `false` 不设置 `SameSite` 属性。
- `'lax'` 将 `SameSite` 属性设置为 `Lax` 进行宽松相同站点强制执行。
- `'none'` 将 `SameSite` 属性设置为 `None` 进行明确的跨站点 Cookie。
- `'strict'` 将 `SameSite` 属性设置为 `Strict` 进行严格的相同站点强制执行。

关于不同强制执行级别的更多信息可以在 [规范](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7) 中找到。

### `encode`

指定一个函数，该函数将用于编码 Cookie 的值。由于 Cookie 的值具有有限的字符集（必须是一个简单的字符串），这个函数可用于将值编码为一个适合 Cookie 值的字符串。

默认编码器是 `JSON.stringify` + `encodeURIComponent`。

### `decode`

指定一个函数，该函数将用于解码 Cookie 的值。由于 Cookie 的值具有有限的字符集（必须是一个简单的字符串），这个函数可用于解码之前编码的 Cookie 值，将其转换为一个 JavaScript 字符串或其他对象。

默认解码器是 `decodeURIComponent` + [destr](https://github.com/unjs/destr)。

::note
如果该函数抛出错误，将返回原始的、未解码的 Cookie 值作为 Cookie 的值。
::

### `default`

指定一个函数，该函数返回 Cookie 的默认值。该函数也可以返回一个 `Ref`。

### `readonly`

允许 _访问_ Cookie 值而不具备设置它的能力。

### `watch`

指定 `boolean` 或 `string` 值用于 [watch](https://vuejs.org/api/reactivity-core.html#watch) Cookie 引用数据。

- `true` - 将监视 Cookie 引用数据的变化及其嵌套属性（默认）。
- `shallow` - 将监视 Cookie 引用数据的变化，仅限于顶级属性。
- `false` - 不会监视 Cookie 引用数据的变化。

::note
当 Cookie 发生变化时，手动刷新 `useCookie` 值，使用 [`refreshCookie`](/api/utils/refresh-cookie)。
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
  user.value.score++; // userInfo cookie not update with this change
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
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
  // list cookie not update with this change
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie update with this change
  }
}
</script>

<template>
  <div>
    <h1>List</h1>
    <pre>{{ list }}</pre>
    <button @click="add">Add</button>
    <button @click="save">Save</button>
  </div>
</template>
```

## API 路由中的 Cookies

你可以在服务器 API 路由中使用 `getCookie` 和 `setCookie` 来自 `h3` 包来设置 Cookie。

```ts [server/api/counter.ts]
export default defineEventHandler(event => {
  // 读取 counter Cookie
  let counter = getCookie(event, 'counter') || 0

  // 增加 counter Cookie 值 1
  setCookie(event, 'counter', ++counter)

  // 发送 JSON 响应
  return { counter }
})
```

:link-example{to="/docs/examples/advanced/use-cookie"}
