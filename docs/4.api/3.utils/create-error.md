---
title: 'createError'
description: 创建一个带有额外元数据的错误对象。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

你可以使用此函数创建一个带有额外元数据的错误对象。它可在应用的 Vue 和 Nitro 部分使用，通常用于抛出错误。

## 参数

- `err`: `string | { cause, data, message, name, stack, status, statusText, fatal }`

你可以向 `createError` 传入字符串或对象。如果传入字符串，则该字符串将作为错误的 `message`，并且 `status` 默认为 `500`。如果传入对象，则可以设置错误的多个属性，例如 `status`、`message` 以及其他错误属性。

## 在 Vue 应用中

如果你抛出由 `createError` 创建的错误：

- 在服务端，会触发全屏错误页面，你可以使用 `clearError` 清除它。
- 在客户端，会抛出一个非致命错误以便你处理。如果你需要触发全屏错误页面，可以通过设置 `fatal: true` 来实现。

### 示例

```vue [app/pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ status: 404, statusText: '页面未找到' })
}
</script>
```

### 错误原因

创建错误时，你可以传入 `cause`，以保留你正在包装的原始错误：

```ts
try {
  await fetchMovie(route.params.slug)
} catch (cause) {
  throw createError({
    status: 500,
    message: '无法加载电影',
    cause,
  })
}
```

在开发环境中，原因链会通过错误的 `cause` 属性暴露给你的[错误页面](/docs/4.x/getting-started/error-handling#error-page)，并序列化为 `{ name, message, stack, cause }`（原始类型的 cause 会按原样传递；其他值会被省略）。在生产环境中，错误响应和错误页面负载中都不会包含 cause。

## 在 API 路由中

在服务器 API 路由中使用 `createError` 来触发错误处理。

### 示例

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    status: 404,
    statusText: '页面未找到',
  })
})
```

在 API 路由中，建议通过传入一个带有简短 `statusText` 的对象来使用 `createError`，因为它可以在客户端访问。否则，在 API 路由中传递给 `createError` 的 `message` 不会传播到客户端。或者，你也可以使用 `data` 属性将数据传回客户端。在使用 `useFetch` 处理错误时，自定义数据可在 `error.value.data.data` 中获取。无论如何，都应尽量避免将动态用户输入放入消息中，以防止潜在的安全问题。

:read-more{to="/docs/4.x/getting-started/error-handling"}
