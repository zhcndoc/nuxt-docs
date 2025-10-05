---
title: 'useRequestEvent'
description: '使用 useRequestEvent 组合式函数访问传入请求事件。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

在 [Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 中，你可以使用 `useRequestEvent` 来访问传入的请求。

```ts
// Get underlying request event
const event = useRequestEvent()

// Get the URL
const url = event?.path
```

::tip
在浏览器中，`useRequestEvent` 将返回 `undefined`。
::