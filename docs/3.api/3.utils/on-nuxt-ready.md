---
title: "onNuxtReady"
description: onNuxtReady 组合函数允许在您的应用初始化完成后运行回调。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::important
`onNuxtReady` 仅在客户端运行。 :br
它非常适合运行不应该阻塞您应用初始渲染的代码。
::

```ts [plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // 使用 myAnalyticsLibrary 做一些事情
  })
})
```

即使在您的应用初始化后运行也是“安全的”。在这种情况下，代码将注册在下一个空闲回调中运行。