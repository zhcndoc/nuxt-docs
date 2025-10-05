---
title: "onNuxtReady"
description: onNuxtReady 可组合函数允许在应用完成初始化后运行回调。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::important
`onNuxtReady` 仅在客户端运行。 :br
它非常适合运行那些不应阻塞应用初始渲染的代码。
::

```ts [app/plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // 使用 myAnalyticsLibrary 做一些事情
  })
})
```

即使在应用已经初始化之后运行它也是“安全”的。在这种情况下，代码将被注册为在下一个空闲回调中运行。