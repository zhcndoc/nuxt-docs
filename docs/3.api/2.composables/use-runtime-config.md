---
title: 'useRuntimeConfig'
description: '使用 useRuntimeConfig 组合函数访问运行时配置变量。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

## 使用方法

```vue [app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}

## 定义运行时配置

以下示例展示了如何设置一个公共的 API 基础 URL 和一个仅在服务器上可访问的机密 API 令牌。

我们应该总是在 `nuxt.config` 中定义 `runtimeConfig` 变量。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // 私有密钥仅在服务器上可用
    apiSecret: '123',

    // 公开密钥，可以暴露给客户端
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
```

::note
需要同时在服务器和客户端上可访问的变量应定义在 `runtimeConfig.public` 中。
::

:read-more{to="/docs/guide/going-further/runtime-config"}

## 访问运行时配置

要访问运行时配置，我们可以使用 `useRuntimeConfig()` 组合件：

```ts [server/api/test.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // 访问公共变量
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // 访问仅在服务器上可用的私有变量
      Authorization: `Bearer ${config.apiSecret}`
    }
  })
  return result
}
```

在这个例子中，由于 `apiBase` 定义在 `public` 命名空间内，它可以在服务器和客户端上普遍访问，而 `apiSecret` **仅在服务器端可用**。

## 环境变量

可以通过设置匹配的环境变量名（以 `NUXT_` 前缀）来更新运行时配置的值。

:read-more{to="/docs/guide/going-further/runtime-config"}

### 使用 `.env` 文件

我们可以在 `.env` 文件中设置环境变量，以便在 **开发** 和 **构建/生成** 时可访问。

``` [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
在任何 `.env` 文件中设置的环境变量，在 Nuxt 应用中通过 `process.env` 在 **开发** 和 **构建/生成** 时可访问。
::

::warning
在 **生产运行时** 中，你应该使用平台环境变量，而 `.env` 不使用。
::

:read-more{to="/docs/guide/directory-structure/env"}

## `app` 命名空间

Nuxt 在运行时配置中使用 `app` 命名空间，其中包含 `baseURL` 和 `cdnURL` 等键。你可以通过设置环境变量来在运行时自定义它们的值。

::note
这是一个保留的命名空间。你不应该在 `app` 中引入额外的键。
::

### `app.baseURL`

默认情况下，`baseURL` 被设置为 `'/'`。

但是，`baseURL` 可以通过设置 `NUXT_APP_BASE_URL` 作为环境变量来更新。

然后，你可以使用 `config.app.baseURL` 访问这个新的基础 URL：

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // 普遍访问 baseURL
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

这个示例展示了如何设置一个自定义的 CDN url 并使用 `useRuntimeConfig()` 访问它们。

你可以使用自定义 CDN 来提供 `.output/public` 中的静态资源，使用 `NUXT_APP_CDN_URL` 环境变量。

然后使用 `config.app.cdnURL` 访问新的 CDN url。

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // 普遍访问 cdnURL
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}
