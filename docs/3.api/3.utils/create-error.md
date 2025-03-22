---
title: 'createError'
description: 创建一个带有附加元数据的错误对象。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

您可以使用此函数创建一个带有附加元数据的错误对象。它可以在您的应用程序的 Vue 和 Nitro 部分使用，并且旨在被抛出。

## 参数

- `err`: `string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }`

您可以将字符串或对象传递给 `createError` 函数。如果您传递一个字符串，它将被用作错误的 `message`，并且 `statusCode` 默认为 `500`。如果您传递一个对象，您可以设置错误的多个属性，例如 `statusCode`、`message` 和其他错误属性。

## 在 Vue 应用中

如果您抛出一个使用 `createError` 创建的错误：

- 在服务器端，将触发一个全屏错误页面，您可以使用 `clearError` 来清除它。
- 在客户端，将抛出一个非致命错误供您处理。如果您需要触发全屏错误页面，则可以通过设置 `fatal: true` 来实现。

### 示例

```vue [pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: '页面未找到' })
}
</script>
```

## 在 API 路由中

使用 `createError` 在服务器 API 路由中触发错误处理。

### 示例

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: '页面未找到'
  })
})
```

在 API 路由中，建议使用 `createError` 传递一个带有简短 `statusMessage` 的对象，因为它可以在客户端访问。否则，在 API 路由中传递给 `createError` 的 `message` 将不会传播到客户端。或者，您可以使用 `data` 属性将数据返回给客户端。在任何情况下，请始终考虑避免将动态用户输入放入消息中，以避免潜在的安全问题。

:read-more{to="/docs/getting-started/error-handling"}