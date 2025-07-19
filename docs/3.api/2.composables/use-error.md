---
title: "useError"
description: useError 组合函数返回正在处理的全局 Nuxt 错误。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

## 用法

`useError` 组合式函数返回正在处理的全局 Nuxt 错误，并在客户端和服务器上均可用。它在您的应用程序中提供了一个响应式、支持 SSR 的错误状态。

```ts
const error = useError()
```

您可以在您的组件、页面或插件中使用此可组合项，以访问或响应当前的 Nuxt 错误。

## 类型

```ts
interface NuxtError<DataT = unknown> {
  statusCode: number
  statusMessage: string
  message: string
  data?: DataT
  error?: true
}

export const useError: () => Ref<NuxtError | undefined>
```

## Parameters

This composable does not take any parameters.

## Return Values

Returns a `Ref` containing the current Nuxt error (or `undefined` if there is no error). The error object is reactive and will update automatically when the error state changes.

## Example

```ts
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Nuxt error:', error.value)
}
</script>
```

:read-more{to="/docs/getting-started/error-handling"}
