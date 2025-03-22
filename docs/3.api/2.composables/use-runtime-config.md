---
title: 'useRuntimeConfig'
description: '使用 useRuntimeConfig 组合式 API 访问运行时配置变量。'
links:
  - label: 源代码
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

下面的例子展示了如何设置一个公共 API 基础 URL 和一个仅在服务器端可访问的秘密 API 令牌。

我们应该始终在 `nuxt.config` 中定义 `runtimeConfig` 变量。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // 私钥仅在服务器上可用
    apiSecret: '123',

    // 对客户端暴露的公共密钥
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
```

::note
需要在服务器上访问的变量直接添加到 `runtimeConfig` 中。需要在客户端和服务器上都可访问的变量在 `runtimeConfig.public` 中定义。
::

:read-more{to="/docs/guide/going-further/runtime-config"}

## 访问运行时配置

要访问运行时配置，我们可以使用 `useRuntimeConfig()` 组合式 API：

```ts [server/api/test.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // 访问公共变量
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // 访问私有变量（仅在服务器上可用）
      Authorization: `Bearer ${config.apiSecret}`
    }
  })
  return result
}
```

在这个例子中，由于 `apiBase` 定义在 `public` 命名空间中，它在服务器和客户端都可访问，而 `apiSecret` **仅在服务器端可访问**。

## 环境变量

可以使用带有 `NUXT_` 前缀的匹配环境变量名称更新运行时配置值。

:read-more{to="/docs/guide/going-further/runtime-config"}

### 使用 `.env` 文件

我们可以在 `.env` 文件中设置环境变量，以便在 **开发** 和 **构建/生成** 期间访问它们。

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
在 `.env` 文件中设置的任何环境变量在 **开发** 和 **构建/生成** 期间都可以通过 `process.env` 在 Nuxt 应用中访问。
::

::warning
在 **生产运行时**，您应该使用平台环境变量，`.env` 不会被使用。
::

:read-more{to="/docs/guide/directory-structure/env"}

## `app` 命名空间

Nuxt 在运行时配置中使用 `app` 命名空间，键包括 `baseURL` 和 `cdnURL`。可以通过设置环境变量在运行时自定义它们的值。

::note
这是一个保留的命名空间。您不应在 `app` 内部添加额外的键。
::

### `app.baseURL`

默认情况下，`baseURL` 被设置为 `'/'`。

然而，可以通过将 `NUXT_APP_BASE_URL` 设置为环境变量来在运行时更新 `baseURL`。

然后，您可以通过 `config.app.baseURL` 访问这个新的基础 URL：

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // 通用访问 baseURL
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

此示例展示了如何设置自定义 CDN URL 并使用 `useRuntimeConfig()` 访问它们。

您可以使用 `NUXT_APP_CDN_URL` 环境变量为 `.output/public` 内的静态资产服务自定义 CDN。

然后，可以通过 `config.app.cdnURL` 访问新的 CDN URL。

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // 通用访问 cdnURL
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}