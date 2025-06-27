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

`useError` 组合函数返回正在处理的全局 Nuxt 错误，既可在客户端也可在服务器端使用。它为您的应用提供了一个响应式且支持 SSR 的错误状态。

```ts
const error = useError()
```

您可以在组件、页面或插件中使用此组合函数以访问或响应当前的 Nuxt 错误。

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

## 参数

此组合函数不接受任何参数。

## 返回值

返回一个包含当前 Nuxt 错误（如果没有错误则为 `undefined`）的 `Ref`。错误对象是响应式的，会在错误状态发生变化时自动更新。

## 示例

```ts
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Nuxt 错误:', error.value)
}
</script>
```

:read-more{to="/docs/getting-started/error-handling"}