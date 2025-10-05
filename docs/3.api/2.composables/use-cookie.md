---
title: 'useCookie'
description: useCookie 是一个 SSR 友好的可组合函数，用于读取和写入 cookies。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

## 用法

在页面、组件和插件中，你可以使用 `useCookie` 以一种支持 SSR 的方式读取和写入 cookies。

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` 仅在 [Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 中可用。
::

::tip
返回的 ref 会自动将 cookie 值序列化和反序列化为 JSON。
::

## 类型

```ts [Signature]
import type { Ref } from 'vue'
import type { CookieParseOptions, CookieSerializeOptions } from 'cookie-es'

export interface CookieOptions<T = any> extends Omit<CookieSerializeOptions & CookieParseOptions, 'decode' | 'encode'> {
  decode?(value: string): T
  encode?(value: T): string
  default?: () => T | Ref<T>
  watch?: boolean | 'shallow'
  readonly?: boolean
}

export interface CookieRef<T> extends Ref<T> {}

export function useCookie<T = string | null | undefined> (
  name: string,
  options?: CookieOptions<T>
): CookieRef<T>
```

## 参数

`name`：cookie 的名称。

`options`：用于控制 cookie 行为的选项。该对象可以包含以下属性：

大多数选项将直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `decode` | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr). | 自定义函数用于解码 cookie 值。由于 cookie 的值字符集有限（且必须为简单字符串），此函数可用于将之前编码的 cookie 值解码为 JavaScript 字符串或其他对象。<br/>**注意：** 如果该函数抛出错误，将返回原始的、未解码的 cookie 值作为 cookie 的值。 |
| `encode` | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent` | 自定义函数用于编码 cookie 值。由于 cookie 的值字符集有限（且必须为简单字符串），此函数可用于将值编码为适合 cookie 的字符串。 |
| `default` | `() => T \| Ref<T>` | `undefined` | 当 cookie 不存在时返回默认值的函数。该函数也可以返回一个 `Ref`。 |
| `watch` | `boolean \| 'shallow'` | `true`  | 是否监听更改并更新 cookie。`true` 表示深度监听，`'shallow'` 表示浅层监听（即仅监听顶层属性的数据变化），`false` 表示禁用。<br/>**注意：** 当 cookie 发生变化时，请手动刷新 `useCookie` 值，使用 [`refreshCookie`](/docs/4.x/api/utils/refresh-cookie)。 |
| `readonly` | `boolean` | `false` | 若为 `true`，则禁用对 cookie 的写入。 |
| `maxAge` | `number` | `undefined` | cookie 的最大存活时间（以秒为单位），即 [`Max-Age` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.2) 的值。给定的数字将通过向下取整转换为整数。默认情况下，不设置最大存活时间。 |
| `expires` | `Date` | `undefined` | cookie 的过期日期。默认情况下，不设置过期日期。大多数客户端会将其视为“非持久 cookie”，并在例如退出浏览器应用时删除。<br/>**注意：** [cookie 存储模型规范](https://tools.ietf.org/html/rfc6265#section-5.3) 指出如果同时设置了 `expires` 和 `maxAge`，则 `maxAge` 优先，但并非所有客户端都会遵守这一点，因此如果同时设置，应使二者指向相同的日期和时间！<br/>若 `expires` 和 `maxAge` 均未设置，则 cookie 将仅限会话，并在用户关闭浏览器时被移除。 |
| `httpOnly` | `boolean` | `false` | 设置 HttpOnly 属性。<br/>**注意：** 将此设置为 `true` 时要小心，因为符合规范的客户端将不允许客户端 JavaScript 在 `document.cookie` 中查看该 cookie。 |
| `secure` | `boolean` | `false` | 设置 [`Secure` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.5)。<br/>**注意：** 将此设置为 `true` 时要小心，因为若浏览器没有 HTTPS 连接，符合规范的客户端将不会在未来将该 cookie 发回服务器。这可能导致水合（hydration）错误。 |
| `partitioned` | `boolean` | `false` | 设置 [`Partitioned` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1)。<br/>**注意：** 这是一个尚未完全标准化的属性，未来可能会更改。<br/>这也意味着许多客户端可能会忽略该属性，直到它们支持为止。<br/>有关更多信息，请参阅该 [提案](https://github.com/privacycg/CHIPS)。 |
| `domain` | `string` | `undefined` | 设置 [`Domain` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.3)。默认情况下，不设置域，大多数客户端会将 cookie 应用于当前域。 |
| `path` | `string` | `'/'` | 设置 [`Path` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.4)。默认情况下，路径被视为“[默认路径](https://tools.ietf.org/html/rfc6265#section-5.1.4)”。 |
| `sameSite` | `boolean \| string` | `undefined` | 设置 [`SameSite` `Set-Cookie` 属性](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。<br/>- `true` 会将 `SameSite` 属性设置为 `Strict`（严格的同站策略）。<br/>- `false` 不会设置 `SameSite` 属性。<br/>- `'lax'` 会将 `SameSite` 属性设置为 `Lax`（宽松的同站策略）。<br/>- `'none'` 会将 `SameSite` 属性设置为 `None`（显式的跨站 cookie）。<br/>- `'strict'` 会将 `SameSite` 属性设置为 `Strict`（严格的同站策略）。 |

## 返回值

返回一个表示 cookie 值的 Vue `Ref<T>`。更新该 ref 将更新 cookie（除非设置了 `readonly`）。该 ref 支持 SSR，可在客户端和服务端使用。

## 示例

### 基本用法

下面的示例创建了一个名为 `counter` 的 cookie。如果该 cookie 不存在，则最初将其设置为一个随机值。每当我们更新 `counter` 变量时，cookie 将相应更新。

```vue [app/app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value ||= Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">
      reset
    </button>
    <button @click="counter--">
      -
    </button>
    <button @click="counter++">
      +
    </button>
  </div>
</template>
```

### 只读 Cookies

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false,
  },
)

if (user.value) {
  // the actual `userInfo` cookie will not be updated
  user.value.score++
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
</template>
```

### 可写 Cookies

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow',
  },
)

function add () {
  list.value?.push(Math.round(Math.random() * 1000))
  // list cookie won't be updated with this change
}

function save () {
  // the actual `list` cookie will be updated
  list.value &&= [...list.value]
}
</script>

<template>
  <div>
    <h1>List</h1>
    <pre>{{ list }}</pre>
    <button @click="add">
      Add
    </button>
    <button @click="save">
      Save
    </button>
  </div>
</template>
```

### 在 API 路由中使用 Cookies

你可以在服务端 API 路由中使用来自 [`h3`](https://github.com/h3js/h3) 包的 `getCookie` 和 `setCookie` 来设置 cookies。

```ts [server/api/counter.ts]
export default defineEventHandler((event) => {
  // Read counter cookie
  let counter = getCookie(event, 'counter') || 0

  // Increase counter cookie by 1
  setCookie(event, 'counter', ++counter)

  // Send JSON response
  return { counter }
})
```

:link-example{to="/docs/4.x/examples/advanced/use-cookie"}