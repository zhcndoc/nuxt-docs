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
`useCookie` 仅在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context) 中有效。
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

export function useCookie<T = string | null | undefined>(
  name: string,
  options?: CookieOptions<T>
): CookieRef<T>
```

## 参数

`name`：cookie 的名称。

`options`：控制 cookie 行为的选项。对象可以包含以下属性：

大多数选项将直接传递给 [cookie](https://github.com/jshttp/cookie) 包。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `decode` | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr)。 | 用来自定义解码 cookie 值的函数。由于 cookie 的值字符集有限（且必须是简单字符串），此函数可用于将先前编码的 cookie 值解码成 JavaScript 字符串或其他对象。<br/>**注意:** 如果此函数抛出错误，则会返回原始未解码的 cookie 值作为 cookie 的值。 |
| `encode` | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent` | 用来自定义编码 cookie 值的函数。由于 cookie 的值字符集有限（且必须是简单字符串），此函数可用于将值编码成适合 cookie 的字符串。 |
| `default` | `() => T \| Ref<T>` | `undefined` | 如果 cookie 不存在，返回默认值的函数。函数也可以返回一个 `Ref`。 |
| `watch` | `boolean \| 'shallow'` | `true` | 是否监听变化并更新 cookie。`true` 为深度监听，`'shallow'` 为浅监听（只监听顶层属性变化），`false` 表示禁用。<br/>**注意:** 当 cookie 变化时，请使用 [`refreshCookie`](/docs/api/utils/refresh-cookie) 手动刷新 `useCookie` 的值。 |
| `readonly` | `boolean` | `false` | 如果为 `true`，则禁止写入 cookie。 |
| `maxAge` | `number` | `undefined` | cookie 的最大存活时间（秒），即 [`Max-Age` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.2) 的值。数字会向下取整。默认不设置最大存活时间。 |
| `expires` | `Date` | `undefined` | cookie 的过期日期。默认不设置。大多数客户端会将其视为“非持久 cookie”，并在退出浏览器等条件下删除。<br/>**注意:** [cookie 存储模型规范](https://tools.ietf.org/html/rfc6265#section-5.3) 规定若同时设置了 `expires` 和 `maxAge`，则以 `maxAge` 优先，但并非所有客户端都会遵守。因此，若同时设置，应确保两者的时间一致！<br/>若未设置 `expires` 和 `maxAge`，cookie 仅为会话级，浏览器关闭时删除。 |
| `httpOnly` | `boolean` | `false` | 设置 HttpOnly 属性。<br/>**注意:** 设置为 `true` 时，符合规范的客户端将不会允许客户端 JavaScript 通过 `document.cookie` 访问此 cookie。 |
| `secure` | `boolean` | `false` | 设置 [`Secure` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.5)。<br/>**注意:** 设置为 `true` 时，符合规范的客户端若与服务器的连接非 HTTPS，将不会发送该 cookie，可能导致客户端水合错误。 |
| `partitioned` | `boolean` | `false` | 设置 [`Partitioned` `Set-Cookie` 属性](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1)。<br/>**注意:** 该属性尚未标准化，可能未来会有变动。<br/>很多客户端可能在未理解之前忽略此属性。<br/>更多信息可查阅 [提案](https://github.com/privacycg/CHIPS)。 |
| `domain` | `string` | `undefined` | 设置 [`Domain` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.3)。默认不设置，客户端通常只在当前域下应用此 cookie。 |
| `path` | `string` | `'/'` | 设置 [`Path` `Set-Cookie` 属性](https://tools.ietf.org/html/rfc6265#section-5.2.4)。默认路径为 ["默认路径"](https://tools.ietf.org/html/rfc6265#section-5.1.4)。 |
| `sameSite` | `boolean \| string` | `undefined` | 设置 [`SameSite` `Set-Cookie` 属性](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)。<br/>- `true` 设置为 `Strict`，严格同站点策略。<br/>- `false` 不设置 SameSite 属性。<br/>- `'lax'` 设置为 `Lax`，宽松同站点策略。<br/>- `'none'` 设置为 `None`，明确跨站点 cookie。<br/>- `'strict'` 设置为 `Strict`，严格同站点策略。 |

## 返回值

返回一个 Vue 的 `Ref<T>`，表示 cookie 的值。更新该 ref 会同时更新 cookie（除非设置了 `readonly`）。该 ref 支持 SSR，可在客户端和服务器端使用。

## 示例

### 基础用法

以下示例创建了一个名为 `counter` 的 cookie。如果 cookie 不存在，则初始化为一个随机值。每次更新 `counter` 变量，cookie 也会随之更新。

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

### 只读 Cookies

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
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
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // 该变化不会触发 list cookie 更新
}

function save() {
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