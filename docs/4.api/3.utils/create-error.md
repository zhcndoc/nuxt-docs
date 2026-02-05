---
title: 'createError'
description: 创建一个带有附加元数据的错误对象。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

您可以使用此函数创建带有附加元数据的错误对象。它既可用于您的应用中的 Vue 部分，也可用于 Nitro 部分，且旨在被抛出。

## 参数

- `err`: `string | { cause, data, message, name, stack, status, statusText, fatal }`

您可以向 `createError` 函数传入字符串或对象。如果传入字符串，则它将用作错误的 `message`，`status` 默认为 `500`。如果传入对象，则可以设置错误的多个属性，例如 `status`、`message` 及其他错误属性。

## 在 Vue 应用中

如果您抛出了使用 `createError` 创建的错误：

- 在服务端，它将触发全屏错误页面，您可以使用 `clearError` 清除该错误。
- 在客户端，它会抛出一个非致命错误，供您处理。如果您需要触发全屏错误页面，可以通过设置 `fatal: true` 来实现。

### 示例

```vue [pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ status: 404, statusText: '页面未找到' })
}
</script>
```

## 在 API 路由中

使用 `createError` 可触发服务器 API 路由中的错误处理。

### 示例

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    status: 404,
    statusText: '页面未找到',
  })
})
```

在 API 路由中，建议通过传入带有简短 `statusText` 的对象来使用 `createError`，因为它可以在客户端访问。否则，传给 API 路由的 `createError` 的 `message` 将不会传递到客户端。或者，您可以使用 `data` 属性将数据传回客户端。无论如何，请始终考虑避免将动态用户输入写入消息，以避免潜在的安全问题。

:read-more{to="/docs/3.x/getting-started/error-handling"}