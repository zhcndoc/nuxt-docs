---
title: 'useCookie'
description: useCookie 是一个 SSR 友好的可组合函数，用于读取和写入 cookies。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

## 用法

在页面、组件和插件中，你可以使用 `useCookie` 以一种支持 SSR 的方式读取和写入 cookies。

```ts [用法]
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
  refresh?: boolean
}

export interface CookieRef<T> extends Ref<T> {}

export function useCookie<T = string | null | undefined> (
  name: string,
  options?: CookieOptions<T>,
): CookieRef<T>
```

## 参数

`name`：cookie 的名称。

`options`：用于控制 cookie 行为的选项。该对象可以包含以下属性：

大多数选项将直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

| 属性          | 类型                   | 默认值                                                         | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------------|------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `decode`      | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr). | 用于解码 cookie 值的自定义函数。由于 cookie 的值具有有限的字符集（并且必须是简单字符串），此函数可用于将之前编码的 cookie 值解码为 JavaScript 字符串或其他对象。<br/> **注意：**如果此函数抛出错误，则会将原始的、未解码的 cookie 值作为 cookie 的值返回。                                                                                                                                                                                                                                                       |
| `encode`      | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent`                        | 用于编码 cookie 值的自定义函数。由于 cookie 的值具有有限的字符集（并且必须是简单字符串），此函数可用于将值编码为适合作为 cookie 值的字符串。                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `default`     | `() => T \| Ref<T>`    | `undefined`                                                    | 当 cookie 不存在时返回默认值的函数。该函数也可以返回一个 `Ref`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `watch`       | `boolean \| 'shallow'` | `true`                                                         | 是否监听变化并更新 cookie。`true` 表示深度监听，`'shallow'` 表示浅层监听，即仅监听顶层属性的数据变化，`false` 表示禁用。<br/> **注意：**当 cookie 发生变化时，请使用 [`refreshCookie`](/docs/4.x/api/utils/refresh-cookie) 手动刷新 `useCookie` 的值。                                                                                                                                                                                                                                                                                                                           |
| `refresh` :badge[v4.4]{color="info" size="xs" class="align-middle"} | `boolean`              | `false`                                                        | 如果为 `true`，则每次显式写入时都会刷新 cookie 的过期时间（例如 `cookie.value = cookie.value`），即使值本身没有发生变化。注意：过期时间不会自动刷新——必须为 `.value` 赋值才能触发刷新。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `readonly`    | `boolean`              | `false`                                                        | 如果为 `true`，则会在服务器端和客户端禁用对 cookie 的写入。组合式函数仍会返回 `default` 值，但该值永远不会持久化到浏览器中。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `maxAge`      | `number`               | `undefined`                                                    | cookie 的最大存活时间，单位为秒，即 [`Set-Cookie` 的 `Max-Age` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.2)的值。给定的数字会向下取整转换为整数。默认情况下不设置最大存活时间。                                                                                                                                                                                                                                                                                                                                                                                   |
| `expires`     | `Date \| (() => Date \| undefined)` | `undefined`                                                    | cookie 的过期日期，或返回过期日期的 getter。当提供函数时，每次写入 cookie 都会执行该函数，因此可以在重新设置值时刷新过期时间。返回 `undefined` 会创建一个会话 cookie。getter 应保持纯函数特性（无副作用）。默认情况下不设置过期时间。大多数客户端会将其视为“非持久化 cookie”，并在退出 Web 浏览器应用程序等情况下将其删除。<br/> **注意：**[cookie 存储模型规范](https://datatracker.ietf.org/doc/html/rfc6265#section-5.3)规定，如果同时设置了 `expires` 和 `maxAge`，则 `maxAge` 优先，但并非所有客户端都会遵守这一点，因此如果同时设置了两者，它们应指向相同的日期和时间！<br/>如果 `expires` 和 `maxAge` 均未设置，则 cookie 将仅在会话期间有效，并在用户关闭浏览器时被移除。 |
| `httpOnly`    | `boolean`              | `false`                                                        | 设置 HttpOnly 属性。<br/> **注意：**将其设置为 `true` 时请务必谨慎，因为符合规范的客户端将不允许客户端 JavaScript 在 `document.cookie` 中查看该 cookie。                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `secure`      | `boolean`              | `false`                                                        | 设置 [`Secure` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.5)。<br/>**注意：**将其设置为 `true` 时请务必谨慎，因为如果浏览器没有 HTTPS 连接，符合规范的客户端将不会在之后将该 cookie 发送回服务器。这可能导致 hydration 错误。                                                                                                                                                                                                                                                                                                                |
| `partitioned` | `boolean`              | `false`                                                        | 设置 [`Partitioned` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1)。<br/>**注意：**这是一个尚未完全标准化的属性，未来可能会发生变化。<br/>这也意味着，许多客户端在理解该属性之前可能会忽略它。<br/>更多信息请参阅[提案](https://github.com/privacycg/CHIPS)。                                                                                                                                                                                                            |
| `domain`      | `string`               | `undefined`                                                    | 设置 [`Domain` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.3)。默认情况下不设置域名，大多数客户端会认为该 cookie 仅适用于当前域名。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `path`        | `string`               | `'/'`                                                          | 设置 [`Path` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.4)。默认情况下，路径被视为[“默认路径”](https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4)。                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `sameSite`    | `boolean \| string`    | `undefined`                                                    | 设置 [`SameSite` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。<br/>- `true` 会将 `SameSite` 属性设置为 `Strict`，以严格执行同站策略。<br/>- `false` 不会设置 `SameSite` 属性。<br/>- `'lax'` 会将 `SameSite` 属性设置为 `Lax`，以宽松地执行同站策略。<br/>- `'none'` 会将 `SameSite` 属性设置为 `None`，用于显式的跨站 cookie。<br/>- `'strict'` 会将 `SameSite` 属性设置为 `Strict`，以严格执行同站策略。                                                                    |

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
      重置
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

```vue [app/app.vue]
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false,
  },
)

if (user.value) {
  // 实际的 `userInfo` cookie 不会被更新
  user.value.score++
}
</script>

<template>
  <div>用户分数：{{ user?.score }}</div>
</template>
```

### 可写 Cookies

```vue [app/app.vue]
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
  // list cookie 不会因这一变化而更新
}

function save () {
  // 实际的 `list` cookie 会被更新
  list.value &&= [...list.value]
}
</script>

<template>
  <div>
    <h1>列表</h1>
    <pre>{{ list }}</pre>
    <button @click="add">
      添加
    </button>
    <button @click="save">
      保存
    </button>
  </div>
</template>
```

### 刷新 Cookies

```vue [app/app.vue]
<script setup lang="ts">
const session = useCookie(
  'session', {
    maxAge: 60 * 60, // 1 小时
    refresh: true,
    default: () => 'active',
  })

// 即使值没有改变，
// 每次设置器被调用时，
// cookie 的过期时间都会被刷新
session.value = 'active'
</script>

<template>
  <div>会话：{{ session }}</div>
</template>
```

### 使用 Getter 动态设置过期时间

当你希望 cookie 每次被写入时都拥有一个新的过期日期时，请为 `expires` 使用一个函数（例如，滑动会话或令牌）：

```vue [app/app.vue]
<script setup lang="ts">
const token = useCookie('token', {
  // 每次写入时都会重新计算——请保持这个 getter 纯净
  expires: () => new Date(Date.now() + 60 * 60 * 1000), // 1 小时后
})

// 赋予新值也会刷新 cookie 的过期时间
token.value = 'new-token'
</script>
```

### API 路由中的 Cookies

你可以在服务端 API 路由中使用来自 [`h3`](https://github.com/h3js/h3) 包的 `getCookie` 和 `setCookie` 来设置 cookies。

```ts [server/api/counter.ts]
export default defineEventHandler((event) => {
  // 读取 counter cookie
  let counter = getCookie(event, 'counter') || 0

  // 将 counter cookie 增加 1
  setCookie(event, 'counter', ++counter)

  // 返回 JSON 响应
  return { counter }
})
```

:link-example{to="/docs/4.x/examples/advanced/use-cookie"}
