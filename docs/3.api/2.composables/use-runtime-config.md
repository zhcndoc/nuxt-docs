---
title: 'useRuntimeConfig'
description: '使用 useRuntimeConfig 组合式函数访问运行时配置变量。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

## 使用方法

```vue [app/app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
})
```

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

## 定义运行时配置

下面的示例展示了如何设置一个公开的 API 基础 URL 和一个仅在服务器端可访问的私有 API 令牌。

我们应该始终在 `nuxt.config` 中定义 `runtimeConfig` 变量。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // 私有键仅在服务器端可用
    apiSecret: '123',

    // 暴露给客户端的公共键
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
})
```

::note
需要在服务器端访问的变量直接添加在 `runtimeConfig` 内。需要在客户端和服务器端都可访问的变量定义在 `runtimeConfig.public` 中。
::

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

## 访问运行时配置

要访问运行时配置，我们可以使用 `useRuntimeConfig()` 组合式函数：

```ts [server/api/test.ts]
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // 访问公共变量
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // 访问私有变量（仅在服务器端可用）
      Authorization: `Bearer ${config.apiSecret}`,
    },
  })
  return result
})
```

在此示例中，由于 `apiBase` 定义在 `public` 命名空间内，因此它在服务端和客户端都可访问，而 `apiSecret` **仅在服务端可用**。

## 环境变量

可以使用以 `NUXT_` 为前缀的匹配环境变量名来更新运行时配置的值。

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

### 使用 `.env` 文件

我们可以在 `.env` 文件中设置环境变量，使其在 **开发** 和 **构建/生成** 期间可用。

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
在 **开发** 和 **构建/生成** 期间，任何在 `.env` 文件中设置的环境变量都可以在 Nuxt 应用中通过 `process.env` 访问。
::

::warning
在 **生产运行时**，你应使用平台的环境变量，`.env` 文件不应被使用。
::

:read-more{to="/docs/4.x/guide/directory-structure/env"}

## `app` 命名空间

Nuxt 在运行时配置中使用 `app` 命名空间，包含 `baseURL` 和 `cdnURL` 等键。你可以通过设置环境变量在运行时自定义它们的值。

::note
这是一个保留命名空间。你不应在 `app` 中引入额外的键。
::

### `app.baseURL`

默认情况下，`baseURL` 被设置为 `'/'`。

但是，可以通过设置环境变量 `NUXT_APP_BASE_URL` 在运行时更新 `baseURL`。

然后，你可以使用 `config.app.baseURL` 访问这个新的基 URL：

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // 在服务端和客户端都可访问的 baseURL
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

下面的示例展示了如何设置自定义 CDN URL 并使用 `useRuntimeConfig()` 访问它们。

你可以使用环境变量 `NUXT_APP_CDN_URL` 为位于 `.output/public` 内的静态资源配置自定义 CDN。

然后通过 `config.app.cdnURL` 访问新的 CDN URL。

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // 在服务端和客户端都可访问的 cdnURL
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}