---
title: 'useCookie'
description: useCookie 是一个支持 SSR 的组合式函数，用于读取和写入 cookies。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

## 用法

在页面、组件和插件中，可以使用 `useCookie` 以支持 SSR 的方式读取和写入 cookies。

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` 仅在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)中有效。
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
  options?: CookieOptions<T>,
): CookieRef<T>
```

## 参数

`name`：cookie 的名称。

`options`：控制 cookie 行为的选项。对象可以包含以下属性：

大多数选项将直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

| 属性          | 类型                   | 默认值                                                         | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------------|------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `decode`      | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr). | 用于解码 cookie 值的自定义函数。由于 cookie 的值字符集有限（且必须是简单字符串），可以使用此函数将先前编码的 cookie 值解码为 JavaScript 字符串或其他对象。<br/>**注意：**如果此函数抛出错误，则会将原始的未解码 cookie 值作为 cookie 的值返回。                                                                                                                                                                                                                                                       |
| `encode`      | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent`                        | 用于编码 cookie 值的自定义函数。由于 cookie 的值字符集有限（且必须是简单字符串），可以使用此函数将值编码为适合作为 cookie 值的字符串。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `default`     | `() => T \| Ref<T>`    | `undefined`                                                    | cookie 不存在时返回默认值的函数。该函数也可以返回一个 `Ref`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `watch`       | `boolean \| 'shallow'` | `true`                                                         | 是否监听变化并更新 cookie。`true` 表示深度监听，`'shallow'` 表示浅层监听，即仅监听顶层属性的数据变化；`false` 表示禁用。<br/>**注意：**当 cookie 发生变化时，请使用 [`refreshCookie`](/docs/api/utils/refresh-cookie) 手动刷新 `useCookie` 的值。                                                                                                                                                                                                                                                                                                                           |
| `readonly`    | `boolean`              | `false`                                                        | 如果为 `true`，则禁用对 cookie 的写入。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `maxAge`      | `number`               | `undefined`                                                    | cookie 的最大有效期（秒），即 [`Max-Age` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.2)的值。给定的数字会向下取整转换为整数。默认情况下不设置最大有效期。                                                                                                                                                                                                                                                                                                                                                                                   |
| `expires`     | `Date`                 | `undefined`                                                    | cookie 的过期日期。默认情况下不设置过期时间。大多数客户端会将其视为“非持久性 cookie”，并在退出浏览器应用等情况下将其删除。<br/>**注意：**[cookie 存储模型规范](https://datatracker.ietf.org/doc/html/rfc6265#section-5.3)规定，如果同时设置了 `expires` 和 `maxAge`，则以 `maxAge` 为准，但并非所有客户端都会遵循此规定，因此如果同时设置两者，它们应指向相同的日期和时间！<br/>如果 `expires` 和 `maxAge` 均未设置，则 cookie 仅在会话期间有效，并会在用户关闭浏览器时被移除。 |
| `httpOnly`    | `boolean`              | `false`                                                        | 设置 HttpOnly 属性。<br/>**注意：**将此项设为 `true` 时请务必谨慎，因为符合规范的客户端将不允许客户端 JavaScript 通过 `document.cookie` 读取该 cookie。                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `secure`      | `boolean`              | `false`                                                        | 设置 [`Secure` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.5)。<br/>**注意：**将此项设为 `true` 时请务必谨慎，如果浏览器未使用 HTTPS 连接，符合规范的客户端将来不会向服务器发送该 cookie。这可能导致水合错误。                                                                                                                                                                                                                                                                                                                |
| `partitioned` | `boolean`              | `false`                                                        | 设置 [`Partitioned` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1)。<br/>**注意：**此属性尚未完全标准化，将来可能会发生变化。<br/>这也意味着，在了解此属性之前，许多客户端可能会忽略它。<br/>更多信息请参阅[提案](https://github.com/privacycg/CHIPS)。                                                                                                                                                                                                            |
| `domain`      | `string`               | `undefined`                                                    | 设置 [`Domain` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.3)。默认情况下不设置域名，大多数客户端会认为该 cookie 仅适用于当前域名。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `path`        | `string`               | `'/'`                                                          | 设置 [`Path` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.4)。默认情况下，路径被视为[“默认路径”](https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4)。                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `sameSite`    | `boolean \| string`    | `undefined`                                                    | 设置 [`SameSite` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。<br/>- `true` 会将 `SameSite` 属性设为 `Strict`，以严格执行同站策略。<br/>- `false` 不会设置 `SameSite` 属性。<br/>- `'lax'` 会将 `SameSite` 属性设为 `Lax`，以宽松执行同站策略。<br/>- `'none'` 会将 `SameSite` 属性设为 `None`，以显式允许跨站 cookie。<br/>- `'strict'` 会将 `SameSite` 属性设为 `Strict`，以严格执行同站策略。                                                                    |

## 返回值

返回一个 Vue 的 `Ref<T>`，表示 cookie 的值。更新该 ref 会同时更新 cookie（除非设置了 `readonly`）。该 ref 支持 SSR，可在客户端和服务器端使用。

## 示例

### 基础用法

以下示例创建了一个名为 `counter` 的 cookie。如果 cookie 不存在，则初始化为一个随机值。每次更新 `counter` 变量，cookie 也会随之更新。

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value ||= Math.round(Math.random() * 1000)
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
  // 实际的 `userInfo` cookie 不会被更新
  user.value.score++
}
</script>

<template>
  <div>用户分数: {{ user?.score }}</div>
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
  // 该变化不会触发 list cookie 更新
}

function save () {
  if (list.value) {
    // 实际的 `list` cookie 会被更新
    list.value = [...list.value]
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

### 在 API 路由中使用 Cookies

在服务端 API 路由中，可以使用 [`h3`](https://github.com/h3js/h3) 包的 `getCookie` 和 `setCookie` 来设置 cookie。

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
