---
title: "useError"
description: useError 可组合函数返回正在被处理的全局 Nuxt 错误。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

## 用法

`useError` 可组合函数返回正在被处理的全局 Nuxt 错误，可在客户端和服务端使用。它在整个应用中提供了响应式、支持 SSR 的错误状态。

```ts
const error = useError()
```

你可以在组件、页面或插件中使用此可组合函数来访问或响应当前的 Nuxt 错误。

## 类型

```ts
interface NuxtError<DataT = unknown> {
  status: number
  statusText: string
  message: string
  data?: DataT
  error?: true
}

export const useError: () => Ref<NuxtError | undefined>
```

## 参数

此可组合函数不接受任何参数。

## 返回值

返回一个包含当前 Nuxt 错误的 `Ref`（如果没有错误则为 `undefined`）。错误对象是响应式的，当错误状态更改时会自动更新。

## 示例

```vue
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Nuxt error:', error.value)
}
</script>
```

:read-more{to="/docs/4.x/getting-started/error-handling"}
