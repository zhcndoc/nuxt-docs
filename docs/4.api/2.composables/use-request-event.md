---
title: 'useRequestEvent'
description: '使用 useRequestEvent 组合式函数访问传入请求事件。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

在 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)中，你可以使用 `useRequestEvent` 访问传入请求。

```ts
// Get underlying request event
const event = useRequestEvent()

// Get the path of the incoming request
const path = event?.path

// Read a request header
const userAgent = event?.headers.get('user-agent')
```

::tip
在浏览器中，`useRequestEvent` 将返回 `undefined`。
::

## 类型

```ts
function useRequestEvent (nuxtApp?: NuxtApp): NuxtRequestEvent | undefined
```

`NuxtRequestEvent` 是你配置的[服务器构建器](/docs/guide/going-further/builders)所提供的事件类型。使用默认的 `@nuxt/nitro-server` 时，它是 h3 v1 的 `H3Event`，因此上面的示例读取的是 `event.path`，而不是 `event.url`。

如果没有服务器构建器提供事件类型，则事件会解析为 `RequestEvent`，这是所有服务器运行时都提供的 Web 标准部分：

| Property  | Type                                                          | Description                                                                 |
| --------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `req`     | `Request`                                                     | 传入请求，包括其 `headers`、`method` 和请求正文。                           |
| `url`     | `URL`                                                         | 解析后的请求 URL。                                                          |
| `res`     | `{ status?, statusText?, headers }`                           | 要发送的响应状态和标头。                                                    |
| `context` | `RequestEventContext`                                         | 每个请求的状态，包括 `context.nuxt` 下 Nuxt 自身的状态。                    |

无论配置了哪种服务器构建器，都应该正常工作的代码（例如模块的服务器处理程序）只应读取这些属性。

::read-more{to="/docs/guide/going-further/server-imports"}
进一步了解如何使用 `nuxt/server` 编写可移植的服务器代码。
::
