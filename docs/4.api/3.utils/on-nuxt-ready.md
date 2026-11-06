---
title: "onNuxtReady"
description: onNuxtReady 组合式函数允许在你的应用完成初始化后运行一个回调。
minimalVersion: "3.1"
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

即使在应用已经初始化之后运行它也是“安全”的。在这种情况下，代码会被注册为在下一个空闲回调中运行。

## 类型

```ts [Signature]
export function onNuxtReady (callback: () => any, options?: OnNuxtReadyOptions): void

interface OnNuxtReadyOptions {
  timeout?: number
  signal?: AbortSignal
}
```

### `callback`

**类型**：`() => any`

应用初始化完成且浏览器空闲后要运行的函数。

### `options`（可选）

**类型**：`OnNuxtReadyOptions`

- `timeout`（可选）

  **类型**：`number`

  应用就绪后，等待浏览器进入空闲状态的最长时间（毫秒）。该值会传递给 [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback#timeout)。如果不设置此值，而浏览器又没有安排空闲时段（无头浏览器中可能会发生这种情况），回调可能会延迟数秒。

```ts [app/plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(() => {
    // runs when the browser is idle, or about 2 seconds after your app is ready, whichever comes first
  }, { timeout: 2000 })
})
```

- `signal`（可选）

  **类型**：`AbortSignal`

  如果信号在回调运行前中止，则跳过该回调。当组件可能在应用就绪前卸载，而你又从该组件调用 `onNuxtReady` 时，这很有用。

```vue [app/components/MyComponent.vue]
<script setup lang="ts">
const controller = new AbortController()

onMounted(() => {
  onNuxtReady(() => {
    // does not run if the component unmounts first
  }, { signal: controller.signal })
})

onBeforeUnmount(() => controller.abort())
</script>
```
