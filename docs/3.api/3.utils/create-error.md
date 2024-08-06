---
title: 'createError'
description: 创建一个带有额外元数据的错误对象。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

你可以使用这个函数来创建一个带有额外元数据的错误对象。它可以在你的应用中的 Vue 和 Nitro 部分使用，并且设计用来抛出错误。

## 参数

- `err`: `string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }`

你可以将一个字符串或对象传递给 `createError` 函数。如果你传递一个字符串，它将被用作错误 `message`，并且 `statusCode` 将默认为 `500`。如果你传递一个对象，你可以设置多个错误属性，比如 `statusCode`、`message` 和其他错误属性。

## 在 Vue 应用中

如果你抛出一个用 `createError` 创建的错误：

- 在服务器端，它将触发一个全屏错误页面，你可以用 `clearError` 清除它。
- 在客户端，它将抛出一个非致命错误供你处理。如果你需要触发一个全屏错误页面，那么你可以通过设置 `fatal: true` 来做到这一点。

### 示例

```vue [pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
```

## 在 API 路由中

使用 `createError` 在服务器端 API 路由中触发错误处理。

### 示例

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
})
```

在 API 路由中，推荐使用 `createError` 传递一个带有简短 `statusMessage` 的对象，因为它可以在客户端访问。否则，在 API 路由中传递给 `createError` 的 `message` 将不会传播到客户端。或者，你可以使用 `data` 属性将数据返回给客户端。在任何情况下，总是考虑避免将动态用户输入放入消息中，以避免潜在的安全问题。

:read-more{to="/docs/getting-started/error-handling"}
