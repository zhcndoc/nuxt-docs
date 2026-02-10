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
  throw createError({ status: 404, statusText: 'Page Not Found' })
}
</script>
```

## 在 API 路由中

在服务器 API 路由中使用 `createError` 来触发错误处理。

### 示例

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    status: 404,
    statusText: 'Page Not Found',
  })
})
```

在 API 路由中，建议通过传入带有简短 `statusText` 的对象来使用 `createError`，因为该字段可以在客户端访问。否则，在 API 路由中传递给 `createError` 的 `message` 不会传播到客户端。或者，你可以使用 `data` 属性将数据传回客户端。无论哪种情况，请始终考虑避免将动态用户输入放入 message 中，以防潜在的安全问题。

:read-more{to="/docs/4.x/getting-started/error-handling"}
